const ts = require('typescript');
const { version, name } = require('./package.json');
const { join, dirname } = require('path');
const { access, constants, readFileSync } = require('fs');

const debug = require('debug')(name);

debug('versions', {
    [name]: version,
    typescript: ts.version,
});

const cache = {};

function tsify(content, fileName) {
    const searchPath = ts.normalizePath(ts.sys.getCurrentDirectory());
    const configFileName = process.env.TSCONFIG || ts.findConfigFile(searchPath, ts.sys.fileExists);
    const compilerOptions = getCompilerOptionsViaCache(configFileName);

    debug('transpileModule', { fileName });
    const { outputText } = ts.transpileModule(content, { fileName, compilerOptions });
    return outputText;
}

function getCompilerOptionsViaCache(configFileName) {
    let options;

    if (!(options = cache[configFileName])) {
        options = cache[configFileName] = getCompilerOptions(configFileName);
    }

    return options;
}

function getCompilerOptions(configFileName) {
    const { config, error } = ts.readConfigFile(configFileName, ts.sys.readFile);
    if (error) {
        throw new Error(`TS config error in ${configFileName}: ${error.messageText}`);
    }

    const { options } = ts.parseJsonConfigFileContent(
        config,
        ts.sys,
        ts.getDirectoryPath(configFileName),
        {},
        configFileName);
    debug('getCompilerOptions', { configFileName, options });
    return options;
}

module.exports = [{
    ext: '.ts',
    transform: tsify,
}, {
    ext: '.tsx',
    transform: tsify,
}];
