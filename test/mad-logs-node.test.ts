/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

// Ensure environment knows testing is occurring
(process.env as any).mocha = true;

/************************************** THIRD-PARTY IMPORTS ***************************************/
// Testing modules
import 'mocha';
import * as sinon from 'sinon';
import {expect} from 'chai';
import {stderr, stdout} from 'test-console';

// Utility modules
import * as fs from 'fs';
import * as path from 'path';
import {inspect as nodeInspect} from 'util';
import * as _ from 'lodash';

// Spawn other apps
import {spawn, spawnSync, fork} from 'child_process';
const spawnSyncOpts = {detached: true, env: process.env, stdio: 'inherit'};

/************************************ IMPORT FILE TO BE TESTED ************************************/
import {inspect, nodeLogFactory, buildFileTag} from '../node';

/******************************************** LOGGING *********************************************/
import * as colors from 'colors';
const TAG = buildFileTag('mad-logs-node.test.ts', colors.bgMagenta.white);

/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result
 */
function blockLogOutput(fn: () => any) {
    const stores = {
        log: {logged: [], orig: global.console.log},
        warn: {logged: [], orig: global.console.warn},
        error: {logged: [], orig: global.console.error},
    };

    // Stub all the console methods
    Object.keys(stores).forEach(logFn => {
        stores[logFn].orig = global.console[logFn];
        global.console[logFn] = (...msgs) => {
            const message = msgs.join('');
            stores[logFn].logged.push(message);
        };
    });

    // Run the function with everything stubbed.
    const result = fn();

    // Restore all the console methods after function done running.
    Object.keys(stores).forEach(fn => (global.console[fn] = stores[fn].orig));

    return {stores, result};
}

/********************************************* TESTS **********************************************/
describe('inspect', function() {
    it('exists', function() {
        expect(inspect).to.exist;
    });
});

describe('nodeLogFactory', function() {
    it('exists', function() {
        expect(nodeLogFactory).to.exist;
    });

    it('returns an object with a set of log functions, that is itself a function', function() {
        const log = nodeLogFactory(TAG);
        log('things!');
        expect(log).to.be.a('function');
        expect(log.blankWrap).to.be.a('function');
        expect(log.blankWrap2).to.be.a('function');
        expect(log.blankWrap3).to.be.a('function');
        expect(log.silly).to.be.a('function');
        expect(log.verbose).to.be.a('function');
        expect(log.debug).to.be.a('function');
        expect(log.info).to.be.a('function');
        expect(log.error).to.be.a('function');
        expect(log.warn).to.be.a('function');
        expect(log.wtf).to.be.a('function');

        expect(log.inspect).to.be.a('function');
        expect(log.always).to.be.a('function');

        expect(log.sillyError).to.be.a('function');
        expect(log.verboseError).to.be.a('function');
        expect(log.debugError).to.be.a('function');
        expect(log.infoError).to.be.a('function');

        expect(log.sillyError).to.be.a('function');
        expect(log.verboseError).to.be.a('function');
        expect(log.debugError).to.be.a('function');
        expect(log.infoError).to.be.a('function');
    });

    it('returns object with a working inspect method that logs (in info mode) & returns deep object details', function() {
        const log = nodeLogFactory(TAG);

        const obj = {a: 'asdf', b: 'asdfasdf'};
        const namedObject = {a: 'asdf', b: 'asdfasdf', name: 'hello'};
        const nestedObject = {a: 'oooaoaooo', b: {z: 'eek', '1': 2}};

        // Regular expression matches used in test.
        const retItem1Match = /\{ a:.+'.*asdf.*'.+,.*b:.+'.*asdfasdf.*'.+\}/;
        const logItem1Match = /mad\-logs\-node\.test\.ts.+\{ a:.+'.*asdf.*'.+,.*b:.+'.*asdfasdf.*'.+\}/; // tslint:disable-line
        const logItem2Match = /mad\-logs\-node\.test\.ts.+hello.+\{ a:.+'.*asdf.*'.+,.*b:.+'.*asdfasdf.*'.*,.*name:.*'hello'.+\}/; // tslint:disable-line

        // Returns an object as a terminal-friendly string if the object is the 1st arg.
        // Also ensures it gets logged.
        const {stores, result} = blockLogOutput(() => {
            log.inspect(obj);
            log.info.inspect(namedObject);
        });
        expect(stores.log.logged[0]).to.match(logItem1Match);
        expect(stores.log.logged[1]).to.match(logItem2Match);

        expect(log.inspect(obj)).to.match(retItem1Match);

        // If inspect is passed a single argument, and it's a string, return the string as-is.
        // (but still log it. WIP: test the logging aspect)
        expect(log.inspect('asdf')).to.eql('asdf');

        // Returns an object as a terminal-friendly string if the object is the 2nd arg.
        // (but still logs it. WIP: test the logging aspect)
        expect(log.inspect('my object:', obj)).to.match(retItem1Match);

        // WIP test all of the following 'logging' behaviours from inspect.
        log.inspect(obj);
        log.inspect('my string');
        log.inspect('my object', obj);
        log.inspect(namedObject);
        log.info.inspect('log.info.inspect made me:', nestedObject);
        log.silly.inspect('log.silly.inspect made me:', nestedObject);
    });

    it(`does not throw when null or undefined is passed to inspect`, function() {
        const log = nodeLogFactory(TAG);
        expect(() => log.inspect(null)).to.not.throw();
        expect(() => log.inspect(undefined as any)).to.not.throw();
    });

    it('returns void from all functions on instance, except inspect', function() {
        const log2 = nodeLogFactory(TAG);
        expect(log2.blankWrap('Logged from blankWrap')).to.be.undefined;
        expect(log2.blankWrap2('Logged from blankWrap2')).to.be.undefined;
        expect(log2.blankWrap3('Logged from blankWrap3')).to.be.undefined;
        expect(log2.silly('Logged from silly')).to.be.undefined;
        expect(log2.verbose('Logged from verbose')).to.be.undefined;
        expect(log2.debug('Logged from debug')).to.be.undefined;
        expect(log2.info('Logged from info')).to.be.undefined;
        expect(log2.error('Logged from error')).to.be.undefined;
        expect(log2.warn('Logged from warn')).to.be.undefined;
        expect(log2.wtf('Logged from wtf')).to.be.undefined;
        expect(log2.always('Logged from always')).to.be.undefined;

        expect(log2.sillyWarn('Logged from silly')).to.be.undefined;
        expect(log2.verboseWarn('Logged from verbose')).to.be.undefined;
        expect(log2.debugWarn('Logged from debug')).to.be.undefined;
        expect(log2.infoWarn('Logged from info')).to.be.undefined;

        expect(log2.sillyError('Logged from silly')).to.be.undefined;
        expect(log2.verboseError('Logged from verbose')).to.be.undefined;
        expect(log2.debugError('Logged from debug')).to.be.undefined;
        expect(log2.infoError('Logged from info')).to.be.undefined;
    });

    it('has thru function attached to all log functions', function() {
        const log3 = nodeLogFactory(TAG);
        expect(log3.blankWrap.thru).to.be.a('function');
        expect(log3.blankWrap2.thru).to.be.a('function');
        expect(log3.blankWrap3.thru).to.be.a('function');
        expect(log3.silly.thru).to.be.a('function');
        expect(log3.verbose.thru).to.be.a('function');
        expect(log3.debug.thru).to.be.a('function');
        expect(log3.info.thru).to.be.a('function');
        expect(log3.error.thru).to.be.a('function');
        expect(log3.warn.thru).to.be.a('function');
        expect(log3.wtf.thru).to.be.a('function');
        expect(log3.always.thru).to.be.a('function');

        expect(log3.sillyWarn.thru).to.be.a('function');
        expect(log3.verboseWarn.thru).to.be.a('function');
        expect(log3.debugWarn.thru).to.be.a('function');
        expect(log3.infoWarn.thru).to.be.a('function');

        expect(log3.sillyError.thru).to.be.a('function');
        expect(log3.verboseError.thru).to.be.a('function');
        expect(log3.debugError.thru).to.be.a('function');
        expect(log3.infoError.thru).to.be.a('function');
    });

    it('thru function on all log functions passes returned value thru if 1 arg given', function() {
        const log4 = nodeLogFactory(TAG);
        expect(log4.blankWrap.thru('grrrr')).to.eql('grrrr');
        expect(log4.blankWrap2.thru('grrrr')).to.eql('grrrr');
        expect(log4.blankWrap3.thru('grrrr')).to.eql('grrrr');
        expect(log4.silly.thru('grrrr')).to.eql('grrrr');
        expect(log4.verbose.thru('grrrr')).to.eql('grrrr');
        expect(log4.debug.thru('grrrr')).to.eql('grrrr');
        expect(log4.info.thru('grrrr')).to.eql('grrrr');
        expect(log4.error.thru('grrrr')).to.eql('grrrr');
        expect(log4.warn.thru('grrrr')).to.eql('grrrr');
        expect(log4.wtf.thru('grrrr')).to.eql('grrrr');
        expect(log4.always.thru('grrrr')).to.eql('grrrr');

        expect(log4.sillyWarn.thru('grrrr')).to.eql('grrrr');
        expect(log4.verboseWarn.thru('grrrr')).to.eql('grrrr');
        expect(log4.debugWarn.thru('grrrr')).to.eql('grrrr');
        expect(log4.infoWarn.thru('grrrr')).to.eql('grrrr');

        expect(log4.sillyError.thru('grrrr')).to.eql('grrrr');
        expect(log4.verboseError.thru('grrrr')).to.eql('grrrr');
        expect(log4.debugError.thru('grrrr')).to.eql('grrrr');
        expect(log4.infoError.thru('grrrr')).to.eql('grrrr');
    });

    // tslint:disable-next-line
    it('thru function on all log functions returns output containing arg 2, if 2 args given', function() {
        const log5 = nodeLogFactory(TAG);
        expect(log5.blankWrap.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.blankWrap2.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.blankWrap3.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.silly.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.verbose.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.debug.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.info.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.error.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.warn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.wtf.thru('my_tag', 'expected_return')).to.eql('expected_return');

        expect(log5.sillyWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.verboseWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.debugWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.infoWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');

        expect(log5.sillyError.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.verboseError.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.debugError.thru('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log5.infoError.thru('my_tag', 'expected_return')).to.eql('expected_return');
    });

    it('thru function on all log functions returns output containing arg 3, if 3 args given', function() {
        const log5 = nodeLogFactory(TAG);
        expect(log5.blankWrap.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.blankWrap2.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.blankWrap3.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.silly.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.verbose.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.debug.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.info.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.error.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.warn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.wtf.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');

        expect(log5.sillyWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.verboseWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.debugWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.infoWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');

        expect(log5.sillyError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.verboseError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.debugError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        expect(log5.infoError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
    });

    it(`thru function on all log functions is generic & accepts a return type`, function() {
        const log6 = nodeLogFactory(TAG);
        expect(log6.silly.thru<string>('my_tag', 'expected_return')).to.eql('expected_return');
        expect(log6.info.thru<string>('my_tag', 'expected_return')).to.eql('expected_return');

        expect(log6.infoError.thru<number>('my_tag', 5)).to.eql(5);
        log6.info.thru<number>('my_tag', 'val2', 12);
        expect(log6.infoError.thru<number>('my_tag', 'val2', 12)).to.eql(12);
    });

    it(`has fn method that returns method-scoped log instance that includes fn name in outputs, but has no fn function itself`, function() {
        const log6 = nodeLogFactory(TAG);
        const fnLog = log6.fn('someMethod');

        // Store the log output of everything run inside, globally.
        const {stores, result} = blockLogOutput(() => {
            fnLog.info('fnLog_info');
            fnLog.silly('fnLog_silly');
        });

        expect(stores.log.logged[0]).to.match(/func: someMethod/);
        expect(stores.log.logged[0]).to.match(/fnLog_info/);
        expect(stores.log.logged[0]).to.match(/mad-logs-node\.test\.ts/);

        expect(stores.log.logged[1]).to.match(/func: someMethod/);
        expect(stores.log.logged[1]).to.match(/fnLog_silly/);
        expect(stores.log.logged[1]).to.match(/mad-logs-node\.test\.ts/);

        expect((fnLog as any).fn).to.be.undefined;
        expect(log6.fn).to.be.a('function');
    });

    it(`noTag function on all log functions blocks tag from being displayed`, function() {
        const log7 = nodeLogFactory(TAG);
        const {stores, result} = blockLogOutput(() => {
            log7.info.noTag('ok');
            log7.info('ok');
        });
        expect(stores.log.logged[0]).to.match(/^ok/);
        expect(stores.log.logged[0]).to.not.match(/mad-logs-node\.test/);
        expect(stores.log.logged[1]).to.not.match(/^ok/);
        expect(stores.log.logged[1]).to.match(/mad-logs-node\.test/);
    });
});

describe('buildFileTag', function() {
    it('exists', function() {
        expect(buildFileTag).to.exist;
    });
    it('outputs a string', function() {
        expect(buildFileTag('test-name')).to.be.a('string');
    });
    it('includes the filename in the output', function() {
        expect(buildFileTag('test-name')).to.contain('test-name');
    });
    it('surrounds output w colour codes if given function chain from colours module', function() {
        const testOutput = buildFileTag('test-name', colors.blue);
        expect(testOutput).to.contain('\u001b[34m');
        expect(testOutput).to.contain('\u001b[39m');
        expect(testOutput).to.contain('\u001b[34mtest-name\u001b[39m');
    });
    it('does not leave the terminal output colourized after running', function() {
        const testOutput = buildFileTag('test-name', colors.blue);
        const output = stdout.inspectSync(function(out) {
            console.log(`${testOutput} hey`);
            console.log(`this should not contain a colour code`);
        });
        expect(output[0]).to.contain('\u001b');
        expect(output[1]).to.not.contain('\u001b[39m');
    });
    it('pads the output to 20 characters if a pad length is not provided', function() {
        const testOutput = buildFileTag('test-name', colors.blue);
        expect(testOutput).to.contain('           '); // 11 char space
        expect(testOutput).to.not.contain('            '); // 12 char space
        const testOutput2 = buildFileTag('eighteen-char-str!', colors.blue);
        expect(testOutput2).to.contain('  ');
    });
    it('if a pad length is provided, pads output to given # of chars', function() {
        const testOutput = buildFileTag('test-name', colors.blue, 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
        const testOutput2 = buildFileTag('eighteen-char-str!', colors.blue, 25);
        expect(testOutput2).to.contain('       ');
        expect(_.partial(buildFileTag, 'test-name', colors.blue, 25)).to.not.throw(TypeError);
    });
    it('throws if colourizer arg is non-function or function without _styles prop', function() {
        blockLogOutput(() => {
            const output = stdout.inspectSync(function(out) {
                expect(() => buildFileTag('test-name', 'ccawa' as any, 25)).to.throw(TypeError);
                expect(() => buildFileTag('test-name', () => 'out', 25)).to.throw(TypeError);
            });
        });
    });
    it('does not accept non-strings as tag argument', function() {
        blockLogOutput(() => {
            const output = stdout.inspectSync(function(out) {
                expect(() => buildFileTag((() => '') as any, colors.blue, 25)).to.throw(TypeError);
            });
        });
    });
    it('allows null as an arg for colourizer, & still pads if arg 3 is then a #', function() {
        const testOutput = buildFileTag('test-name', null, 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
    });
    it('allows a number as 2nd arg, & pads by that amount', function() {
        const testOutput = buildFileTag('test-name', 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
    });
});
