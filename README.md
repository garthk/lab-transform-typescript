# Lab Transform for TypeScript

`lab-transform-typescript` transforms TypeScript for use with [`lab`][lab],
permitting `npm test` without having to transpile first in a `pretest` script.

[![NPM Version](https://img.shields.io/npm/v/lab-transform-typescript.svg)](https://npmjs.org/package/lab-transform-typescript)

Usage:

* `npm install --save-dev lab-transform-typescript`
* `lab --sourcemaps --transform node_modules/lab-transform-typescript`

If you'd like `typings` support for `lab` and `code`, also:

* `typings install --save --global github:garthk/lab-transform-typescript/typings-local/code.d.ts`
* `typings install --save --global github:garthk/lab-transform-typescript/typings-local/lab.d.ts`

The typings for `code` are thorough. The typings for `lab` are pretty thin.
I'd much appreciate feedback on and pull requests for improvements on either.

Issues:

* hapijs/lab#614: `lab --coverage` output shows the transpiled JavaScript, not the
  source TypeScript.

[lab]: https://github.com/hapijs/lab
