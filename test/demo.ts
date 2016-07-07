import { expect, fail } from 'code';
import { script } from 'lab';
export const lab = script();

lab.experiment('experiment', () => {
    lab.test('test', done => {
        // We got here? That'll do, pig. That'll do.
        done();
    });
});
