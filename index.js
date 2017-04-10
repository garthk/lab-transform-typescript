var ts = require('typescript');

var _require = require('./package.json'),
    version = _require.version,
    name = _require.name;

var _require2 = require('path'),
    join = _require2.join,
    dirname = _require2.dirname;

var _require3 = require('fs'),
    access = _require3.access,
    constants = _require3.constants,
    readFileSync = _require3.readFileSync;

var debug = require('debug')(name);

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
    const { outputText, diagnostics } = ts.transpileModule(content, {
        fileName,
        compilerOptions,
        reportDiagnostics: true,
    });
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
