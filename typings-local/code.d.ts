// code 3.0.0
// https://github.com/hapijs/code/blob/v3.0.0/API.md

declare module 'code' {
    export interface ComparisonOptions {
        prototype?: boolean
    }
    export interface ChainableAssertion<T> {
        (): Expectation<T>
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
    type typeString = 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'

    interface Newable<R> {
        new(... args: any[]): R
    }

    export interface Expectation<T> {
        // connecting words to make assertions more readable:
        a: Expectation<T>
        an: Expectation<T>
        and: Expectation<T>
        at: Expectation<T>
        be: Expectation<T>
        have: Expectation<T>
        in: Expectation<T>
        to: Expectation<T>

        // toggle a status flag for the current assertion:
        not: Expectation<T> // inverses the expected result of any assertion
        once: Expectation<T> // requires that inclusion matches appear only once in the provided value
        only: Expectation<T> // requires that only the provided elements appear in the provided value
        part: Expectation<T> // allows a partial match when asserting inclusion
        shallow: Expectation<T> // performs a comparison using strict equality

        // types
        arguments: ChainableAssertion<T>
        array: ChainableAssertion<T>
        boolean: ChainableAssertion<T>
        buffer: ChainableAssertion<T>
        date: ChainableAssertion<T>
        error: (type?: string, message?: string | RegExp) => Expectation<T>
        function: ChainableAssertion<T>
        number: ChainableAssertion<T>
        regexp: ChainableAssertion<T>
        string: ChainableAssertion<T>
        object: ChainableAssertion<T>

        // values
        true: ChainableAssertion<T>
        false: ChainableAssertion<T>
        null: ChainableAssertion<T>
        undefined: ChainableAssertion<T>
        include: (valueOrValues: T | T[] | {}) => Expectation<T>
        includes: (valueOrValues: T | T[] | {}) => Expectation<T>
        contain: (valueOrValues: T | T[] | {}) => Expectation<T>
        contains: (valueOrValues: T | T[] | {}) => Expectation<T>
        startWith: (value: string) => Expectation<T>
        startsWith: (value: string) => Expectation<T>
        endWith: (value: string) => Expectation<T>
        endsWith: (value: string) => Expectation<T>
        exist: ChainableAssertion<T>
        empty: ChainableAssertion<T>
        length: (value: number) => Expectation<T>
        equal: (value: T, options?: ComparisonOptions) => Expectation<T>
        above: (value: number) => Expectation<T>
        least: (value: number) => Expectation<T>
        below: (value: number) => Expectation<T>
        most: (value: number) => Expectation<T>
        within: (lower: number, upper: number) => Expectation<T>
        between: (lower: number, upper: number) => Expectation<T>
        about: (value: number, delta: number) => Expectation<T>
        // semicolon to force vscode syntax highlighting to behave
        instanceof<R>(type: Newable<R>): Expectation<T>;
        match: (regex: RegExp) => Expectation<T>
        matches: (regex: RegExp) => Expectation<T>
        satisfy: (validator: (value: T) => boolean) => Expectation<T>
        satisfies: (validator: (value: T) => boolean) => Expectation<T>
        throw: (type?: typeString, message?: string | RegExp) => Expectation<T>
        throws: (type?: typeString, message?: string | RegExp) => Expectation<T>
    }

    export function fail(message: string): void

    export function count(): number
    export function incomplete(): string[]
    export function thrownAt(error: Error): {
        filename: string,
        line: string,   // No, really.
        column: string, // I can't even.
    }
    export function expect<T>(value: T, prefix?: string): Expectation<T>;
    export var settings: {
        truncateMessages?: boolean
        comparePrototypes?: boolean
    }
}
