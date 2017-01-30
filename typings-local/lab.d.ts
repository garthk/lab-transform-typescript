declare module Lab {
    type ScriptOptions = {
        schedule?: boolean;
        cli?: CommandLineSettings;
    }

    /**
     * Lab command line settings after CLI option post-processing, e.g.
     * `globals` split into an array, `id` moved to `ids`, and silence`
     * and `verbose` being flattened into `progress`.
     */
    interface CommandLineSettings {
        /** An assertion library module path to require and make available under `Lab.assertions` */
        assert?: string;

        /** Enable color output (defaults to terminal capabilities) */
        colors?: boolean;

        /** Timeout for `before`, `after`, `beforeEach`, and `afterEach` (milliseconds) */
        ['context-timeout']?: number;

        /** Enable code coverage analysis */
        coverage?: boolean;

        /** Code coverage exclusions */
        ['coverage-exclude']?: string[];

        /** Code coverage path */
        ['coverage-path']?: string;

        /** Print the stack on domain errors (default: `true`) */
        debug?: boolean;

        /** Skip all tests (dry run) */
        dry?: boolean;

        /** Value for `NODE_ENV` environment variable during tests */
        environment?: string;

        /** Prevent recursive colleciton of tests */
        flat?: boolean;

        /** Globals to ignore during leak detection */
        globals?: string[];

        /** Only run tests matching the given pattern; compiled to a `RegExp` */
        grep?: string;

        /** Only run tests with these identifiers */
        ids?: string[];

        /** Enable global variable leak detection (default: `true`) */
        leaks?: boolean;

        /** Enable linting */
        lint?: boolean;

        /** Linter path to use */
        linter?: string;

        /** Linter errors threshold (count) */
        ['lint-errors-threshold']?: number;

        /** Apply any fixes from the linter */
        ['lint-fix']?: boolean;

        /** Linter options, encoded in JSON */
        ['lint-options']?: string;

        /** Linter warnings threshold (count) */
        ['lint-warnings-threshold']?: number;

        /** File path for test results */
        output?: string[];

        /** Enable parallel test execution within experiments */
        parallel?: boolean;

        /** Paths of tests and directories containing tests */
        paths?: string[];

        /** Progress reporting level */
        progress?: ProgressReporting;

        /** Reporter types (`console`, `html`, `json`, `tap`, `lcov`, `clover`, `junit`) */
        reporter?: ReporterType[];

        /** Shuffle script execution order */
        shuffle?: boolean;

        /** Ignored; see `progress` */
        silence?: boolean;

        /** Don't output skipped tests */
        ['silent-skips']?: boolean;

        /** Enable sourcemaps */
        sourcemaps?: boolean;

        /** Code coverage threshold (percentage) */
        threshold?: number;

        /** Timeout for each test (milliseconds) */
        timeout?: number;

        /** Path to JavaScript module for code transformation */
        transform?: string;

        /** Ignored; see `progress` */
        verbose?: boolean;
    }

    type ReporterType = 'clover' | 'console' | 'html' | 'json' | 'junit' | 'lcov' | 'tap';

    /**
     * Progress reporting level
     */
    const enum ProgressReporting {
        /** No dots or test names */
        Silence = 0,

        /** Dots (default) */
        Dots = 1,

        /** Test names */
        Verbose = 2,
    }

    type Callback = {
        (err?: Error): void
    }

    type TakesCallback = {
        // Warning: TypeScript will let ANY function with no arguments pass
        // this type signature. In turn, that means we can't have the type
        // system ensure we either take done or return a Promise. Aah, well.
        // https://git.io/vrjTp
        (done: Callback): void;
    }

    type ReturnsPromise = {
        (): Promise<void>
    }

    interface Experiment {
        (): void
    }

    /**
     * A test.
     */
    type Test = TakesCallback | ReturnsPromise;

    /**
     * A test hook (e.g. `before`, `afterEach`).
     *
     * Has the same signature as a `Test`, but isn't one.
     */
    type Hook = TakesCallback | ReturnsPromise;

    type Script = {
        experiment: (description: string, experiment: Experiment) => any;
        test: (description: string, test: Test) => any;
        before: (fn: Hook) => void;
        beforeEach: (fn: Hook) => void;
        after: (fn: Hook) => void;
        afterEach: (fn: Hook) => void;
    }
}

declare module 'lab' {
    export function script(options?: Lab.ScriptOptions): Lab.Script;
}
