import { expect, fail } from 'code';
import { script } from 'lab';
export const lab = script({
    cli: {
        // Overriding the command line options is more useful to force
        // necessary functionality, e.g. globals skipping or source maps.
        globals: ['leakedButOK'],

        // The transpiler won't follow reference paths or look up
        // the typings in `typings-local`, despite `typeRoots`, so we
        // have to resolve this `const enum` ourselves:
        progress: 2, // ProgressReporting.Verbose,

        // If you don't specify sourcemaps on the `lab` command line or in
        // your `lab.script`, the line numbers on your errors will be wrong.
        // `lab-transform-typescript` will enable inline source maps for
        // the transpiler.
        sourcemaps: true,
    }
});

(global as any)['leakedButOK'] = true;

const debug = require('debug')('lab-transform-typescript:test');

lab.experiment('experiment', () => {
    lab.before(done => {
        debug('callback before all');
        done();
    });

    lab.before(() => debugp('promise before all'));

    lab.beforeEach(done => {
        debug('callback before each');
        done();
    });

    lab.beforeEach(() => debugp('promise before each'));

    lab.after(done => {
        // throw new Error('fvkjhd');
        debug('callback after all');
        done();
    });

    lab.after(() => debugp('promise after all'));

    lab.afterEach(done => {
        debug('callback after each');
        done();
    });

    lab.afterEach(() => debugp('promise after each'));

    lab.test('callback', done => {
        // We got here? That'll do, pig. That'll do.
        debug('callback test');
        done();
    });

    lab.test('promise', () => debugp('promise test'));
});

function debugp(message: string): Promise<void> {
    return new Promise<void>(resolve => {
        setImmediate(() => {
            debug(message);
            resolve();
        });
    });
}
