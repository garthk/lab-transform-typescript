const ts = require('typescript');
const { version, name } = require('./package.json');

require('debug')(name)('versions', {
    [name]: version,
    typescript: ts.version,
});

// Note the compilerOptions need to have all enums resolved from strings to
// enum members. Refer to the CompilerOptions interface for more details:
// https://github.com/Microsoft/TypeScript/blob/master/lib/typescript.d.ts
//
// The TypeScript team have committed to cleaning this up in a future release:
// https://github.com/Microsoft/TypeScript/issues/7980

const compilerOptions = {
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    sourceMap: true,
    inlineSourceMap: true,
    target: ts.ScriptTarget.ES5,
};

function tsify(content, fileName) {
    const { outputText } = ts.transpileModule(content, { fileName, compilerOptions });
    return outputText;
}

module.exports = [{
    ext: '.ts',
    transform: tsify,
}, {
    ext: '.tsx',
    transform: tsify,
}];
