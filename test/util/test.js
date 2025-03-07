/* @flow */

import tap from 'tap';
/*eslint-disable import/no-named-as-default-member */
import sinon from 'sinon';

type CreateTest = (typeof sinon) & {
    (name: string, body: (test: CreateTest) => void): void,

    test: CreateTest,

    ok(value: mixed, msg?: string): void,
    assert(value: mixed, msg?: string): void,
    true(value: mixed, msg?: string): void,
    notOk(value: mixed, msg?: string): void,
    false(value: mixed, msg?: string): void,
    equal(actual: mixed, expected: mixed, msg?: string): void,
    notEqual(actual: mixed, expected: mixed, msg?: string): void,
    deepEqual(actual: mixed, expected: mixed, msg?: string): void,
    fail(msg?: string): void,
    ifError(err: mixed, msg?: string): void,
    throws(fn: Function, expected?: RegExp | Function, msg?: string): void,
    doesNotThrow(fn: Function, expected?: RegExp | Function, msg?: string): void,
    plan(n: number): void,
    end(): void,
    tearDown(() => void): void,
};

export const test = (tap.test: CreateTest);
export const only = (tap.only: CreateTest);

const consoleError = console.error;
const consoleWarn = console.warn;

// $FlowFixMe[missing-this-annot]
tap.beforeEach(function () {
    this.sandbox = sinon.createSandbox({
        injectInto: this,
        properties: ['spy', 'stub', 'mock']
    });

    // $FlowFixMe the assignment is intentional
    console.error = (msg) => this.fail(`console.error called -- please adjust your test (maybe stub console.error?)\n${msg}`);
    // $FlowFixMe the assignment is intentional
    console.warn = () => this.fail(`console.warn called -- please adjust your test (maybe stub console.warn?)`);
});

// $FlowFixMe[missing-this-annot]
tap.afterEach(function () {
    // $FlowFixMe the assignment is intentional
    console.error = consoleError;
    // $FlowFixMe the assignment is intentional
    console.warn = consoleWarn;

    this.sandbox.restore();
});
