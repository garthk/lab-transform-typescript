'use strict';

var _debug;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

debug('versions', (_debug = {}, _defineProperty(_debug, name, version), _defineProperty(_debug, 'typescript', ts.version), _debug));

var cache = {};

function tsify(content, fileName) {
    var searchPath = ts.normalizePath(ts.sys.getCurrentDirectory());
    var configFileName = process.env.TSCONFIG || ts.findConfigFile(searchPath, ts.sys.fileExists);

    var compilerOptions = getCompilerOptionsViaCache(configFileName);
    compilerOptions.sourceMap = false;
    compilerOptions.inlineSourceMap = true;

    debug('transpileModule', { fileName: fileName });

    var _ts$transpileModule = ts.transpileModule(content, {
        fileName: fileName,
        compilerOptions: compilerOptions,
        reportDiagnostics: true
    }),
        outputText = _ts$transpileModule.outputText,
        diagnostics = _ts$transpileModule.diagnostics;

    debug({ diagnostics: diagnostics });

    return outputText;
}

function getCompilerOptionsViaCache(configFileName) {
    var options = void 0;

    if (!(options = cache[configFileName])) {
        options = cache[configFileName] = getCompilerOptions(configFileName);
    }

    return options;
}

function getCompilerOptions(configFileName) {
    var _ts$readConfigFile = ts.readConfigFile(configFileName, ts.sys.readFile),
        config = _ts$readConfigFile.config,
        error = _ts$readConfigFile.error;

    if (error) {
        throw new Error('TS config error in ' + configFileName + ': ' + error.messageText);
    }

    var _ts$parseJsonConfigFi = ts.parseJsonConfigFileContent(config, ts.sys, ts.getDirectoryPath(configFileName), {}, configFileName),
        options = _ts$parseJsonConfigFi.options;

    debug('getCompilerOptions', { configFileName: configFileName, options: options });
    return options;
}

module.exports = [{
    ext: '.ts',
    transform: tsify
}, {
    ext: '.tsx',
    transform: tsify
}];
