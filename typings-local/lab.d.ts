// PARTIAL typings for `lab`. Lacks `beforeEach`, `afterEach`, and the
// `Promise` handling variants of each method.

declare module 'lab' {
    type Callback = {
        (err?: Error): void
    }
    type Thenable = {
        then: (onFulfilled?: (value: any) => any, onRejected?: (error: any) => any) => Thenable
    }
    type TakesCallback = {
        // Warning: TypeScript will let ANY function with no arguments pass
        // this type signature. In turn, that means we can't have the type
        // system ensure we either take done or return a Thenable. Aah, well.
        // https://git.io/vrjTp
        (done: Callback): void;
    }
    type ReturnsPromise = {
        (): Thenable
    }
    interface Experiment {
        (): void
    }
    type Test = TakesCallback | ReturnsPromise;
    export type Laboratory = {
        experiment: (description: string, experiment: Experiment) => any
        test: (description: string, test: Test) => any
        before: (TakesCallback) => void
        beforeEach: (TakesCallback) => void
        after: (TakesCallback) => void
        afterEach: (TakesCallback) => void
    }
    export function script(options?: any): Laboratory;
}
