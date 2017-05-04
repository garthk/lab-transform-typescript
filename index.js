const ts = require('typescript');

const package = require('./package.json');
const version = package.version;
const name = package.name;

const path = require('path');
const join = path.join;
const dirname = path.dirname;

const fs = require('fs');
const access = fs.access;
const constants = fs.constants;
const readFileSync = fs.readFileSync;

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
    compilerOptions.sourceMap = false;
    compilerOptions.inlineSourceMap = true;

    debug('transpileModule', { fileName });
    const transpileModule = ts.transpileModule(content, {
        fileName,
        compilerOptions,
        reportDiagnostics: true,
    });
    const outputText = transpileModule.outputText;
    const diagnostics = transpileModule.diagnostics

    debug({ diagnostics });

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
    const readConfigFile = ts.readConfigFile(configFileName, ts.sys.readFile);
    const config = readConfigFile.config;
    const error = readConfigFile.readConfigFile;
   
    if (error) {
        throw new Error(`TS config error in ${configFileName}: ${error.messageText}`);
    }

    const options = ts.parseJsonConfigFileContent(
        config,
        ts.sys,
        ts.getDirectoryPath(configFileName),
        {},
        configFileName).options;
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
