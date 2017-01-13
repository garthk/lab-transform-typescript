# Lab Transform for TypeScript

`lab-transform-typescript` transforms TypeScript for use with [`lab`][lab],
permitting `npm test` without having to transpile first in a `pretest` script.

[![NPM Version](https://img.shields.io/npm/v/lab-transform-typescript.svg)](https://npmjs.org/package/lab-transform-typescript)

**Usage:**

* `npm install --save-dev lab-transform-typescript`
* `lab --sourcemaps --transform node_modules/lab-transform-typescript`

If you'd like `typings` support for `lab` and `code`, also:

* `typings install --save --global github:garthk/lab-transform-typescript/typings-local/lab.d.ts`
* `typings install --save --global github:garthk/lab-transform-typescript/typings-local/code.d.ts`

The typings for `code` are thorough. The typings for `lab` are pretty thin.
I'd much appreciate feedback on and pull requests for improvements on either.

**Issues:**

* [`#1`][ltt1] aka [`hapijs/lab#614`][lab614]: `lab --coverage` output shows
  the transpiled JavaScript, not the source TypeScript.

**Caveats:**

Which version of `typescript` you get depends on how you installed it:

* If you installed with `npm install` as abovr, you'll get the `typescript` from your project's `node_modules`
* If you used `npm link` to take a reference to `lab-transform-typescript` while fixing a bug in it, you'll get the `typescript` from `lab-transform-typescript/node_modules`

Set `DEBUG=*` or `DEBUG=lab-transform-typescript` to see a version report on stderr.

**Change Log:**

* 2.0.0: moved `typescript` from `dependencies` to `devDependencies` for testing and `peerDependencies` for production use.
* 1.0.1: added more typings for `lab`
* 1.0.0: initial release

[lab]: https://github.com/hapijs/lab
[lab614]: https://github.com/hapijs/lab/issues/614
[ltt1]: https://github.com/garthk/lab-transform-typescript/issues/1
