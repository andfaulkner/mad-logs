/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />
"use strict";
// ensure environment knows testing is occurring
process.env.mocha = true;
// Store original process.argv
var oldProcArgs = Object.assign({}, process.argv);
/************************************** THIRD-PARTY IMPORTS ***************************************/
// Testing modules
require("mocha");
var chai_1 = require("chai");
var test_console_1 = require("test-console");
var _ = require("lodash");
var spawnSyncOpts = { detached: true, env: process.env, stdio: 'inherit' };
/******************************************** LOGGING *********************************************/
/************************************ IMPORT FILE TO BE TESTED ************************************/
var node_1 = require("../node");
var colors = require("colors");
var TAG = node_1.buildFileTag('mad-logs-node.test.ts', colors.bgMagenta.white);
/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result
 */
function blockLogOutput(fn) {
    var stores = {
        log: { logged: [], orig: global.console.log },
        warn: { logged: [], orig: global.console.warn },
        error: { logged: [], orig: global.console.error },
    };
    // Stub all the console methods
    Object.keys(stores).forEach(function (logFn) {
        stores[logFn].orig = global.console[logFn];
        global.console[logFn] = function () {
            var msgs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msgs[_i] = arguments[_i];
            }
            var message = msgs.join('');
            stores[logFn].logged.push(message);
        };
    });
    // Run the function with everything stubbed.
    var result = fn();
    // Restore all the console methods after function done running.
    Object.keys(stores).forEach(function (fn) { return global.console[fn] = stores[fn].orig; });
    return { stores: stores, result: result };
}
/********************************************* TESTS **********************************************/
describe('inspect', function () {
    it('exists', function () {
        chai_1.expect(node_1.inspect).to.exist;
    });
});
describe('nodeLogFactory', function () {
    it('exists', function () {
        chai_1.expect(node_1.nodeLogFactory).to.exist;
    });
    it('returns an object with a set of log functions, that is itself a function', function () {
        var log = node_1.nodeLogFactory(TAG);
        log('things!');
        chai_1.expect(log).to.be.a('function');
        chai_1.expect(log.blankWrap).to.be.a('function');
        chai_1.expect(log.blankWrap2).to.be.a('function');
        chai_1.expect(log.blankWrap3).to.be.a('function');
        chai_1.expect(log.silly).to.be.a('function');
        chai_1.expect(log.verbose).to.be.a('function');
        chai_1.expect(log.debug).to.be.a('function');
        chai_1.expect(log.info).to.be.a('function');
        chai_1.expect(log.error).to.be.a('function');
        chai_1.expect(log.warn).to.be.a('function');
        chai_1.expect(log.wtf).to.be.a('function');
        chai_1.expect(log.inspect).to.be.a('function');
        chai_1.expect(log.always).to.be.a('function');
        chai_1.expect(log.sillyError).to.be.a('function');
        chai_1.expect(log.verboseError).to.be.a('function');
        chai_1.expect(log.debugError).to.be.a('function');
        chai_1.expect(log.infoError).to.be.a('function');
        chai_1.expect(log.sillyError).to.be.a('function');
        chai_1.expect(log.verboseError).to.be.a('function');
        chai_1.expect(log.debugError).to.be.a('function');
        chai_1.expect(log.infoError).to.be.a('function');
    });
    it('returns object with a working inspect method that logs (in info mode) & returns deep object details', function () {
        var log = node_1.nodeLogFactory(TAG);
        var obj = { a: 'asdf', b: 'asdfasdf' };
        var namedObject = { a: 'asdf', b: 'asdfasdf', name: 'hello' };
        var nestedObject = { a: 'oooaoaooo', b: { z: 'eek', '1': 2 } };
        // Regular expression matches used in test.
        var retItem1Match = /\{ a:.+'.*asdf.*'.+,.*b:.+'.*asdfasdf.*'.+\}/;
        var logItem1Match = /mad\-logs\-node\.test\.ts.+\{ a:.+'.*asdf.*'.+,.*b:.+'.*asdfasdf.*'.+\}/; // tslint:disable-line
        var logItem2Match = /mad\-logs\-node\.test\.ts.+hello.+\{ a:.+'.*asdf.*'.+,.*b:.+'.*asdfasdf.*'.*,.*name:.*'hello'.+\}/; // tslint:disable-line
        // Returns an object as a terminal-friendly string if the object is the 1st arg.
        // Also ensures it gets logged.
        var _a = blockLogOutput(function () {
            log.inspect(obj);
            log.info.inspect(namedObject);
        }), stores = _a.stores, result = _a.result;
        chai_1.expect(stores.log.logged[0]).to.match(logItem1Match);
        chai_1.expect(stores.log.logged[1]).to.match(logItem2Match);
        chai_1.expect(log.inspect(obj)).to.match(retItem1Match);
        // If inspect is passed a single argument, and it's a string, return the string as-is.
        // (but still log it. WIP: test the logging aspect)
        chai_1.expect(log.inspect('asdf')).to.eql('asdf');
        // Returns an object as a terminal-friendly string if the object is the 2nd arg.
        // (but still logs it. WIP: test the logging aspect)
        chai_1.expect(log.inspect('my object:', obj)).to.match(retItem1Match);
        // WIP test all of the following 'logging' behaviours from inspect.
        log.inspect(obj);
        log.inspect('my string');
        log.inspect('my object', obj);
        log.inspect(namedObject);
        log.info.inspect('log.info.inspect made me:', nestedObject);
        log.silly.inspect('log.silly.inspect made me:', nestedObject);
    });
    it("does not throw when null or undefined is passed to inspect", function () {
        var log = node_1.nodeLogFactory(TAG);
        chai_1.expect(function () { return log.inspect(null); }).to.not.throw();
        chai_1.expect(function () { return log.inspect(undefined); }).to.not.throw();
    });
    it('returns void from all functions on instance, except inspect', function () {
        var log2 = node_1.nodeLogFactory(TAG);
        chai_1.expect(log2.blankWrap('Logged from blankWrap')).to.be.undefined;
        chai_1.expect(log2.blankWrap2('Logged from blankWrap2')).to.be.undefined;
        chai_1.expect(log2.blankWrap3('Logged from blankWrap3')).to.be.undefined;
        chai_1.expect(log2.silly('Logged from silly')).to.be.undefined;
        chai_1.expect(log2.verbose('Logged from verbose')).to.be.undefined;
        chai_1.expect(log2.debug('Logged from debug')).to.be.undefined;
        chai_1.expect(log2.info('Logged from info')).to.be.undefined;
        chai_1.expect(log2.error('Logged from error')).to.be.undefined;
        chai_1.expect(log2.warn('Logged from warn')).to.be.undefined;
        chai_1.expect(log2.wtf('Logged from wtf')).to.be.undefined;
        chai_1.expect(log2.always('Logged from always')).to.be.undefined;
        chai_1.expect(log2.sillyWarn('Logged from silly')).to.be.undefined;
        chai_1.expect(log2.verboseWarn('Logged from verbose')).to.be.undefined;
        chai_1.expect(log2.debugWarn('Logged from debug')).to.be.undefined;
        chai_1.expect(log2.infoWarn('Logged from info')).to.be.undefined;
        chai_1.expect(log2.sillyError('Logged from silly')).to.be.undefined;
        chai_1.expect(log2.verboseError('Logged from verbose')).to.be.undefined;
        chai_1.expect(log2.debugError('Logged from debug')).to.be.undefined;
        chai_1.expect(log2.infoError('Logged from info')).to.be.undefined;
    });
    it('has thru function attached to all log functions', function () {
        var log3 = node_1.nodeLogFactory(TAG);
        chai_1.expect(log3.blankWrap.thru).to.be.a('function');
        chai_1.expect(log3.blankWrap2.thru).to.be.a('function');
        chai_1.expect(log3.blankWrap3.thru).to.be.a('function');
        chai_1.expect(log3.silly.thru).to.be.a('function');
        chai_1.expect(log3.verbose.thru).to.be.a('function');
        chai_1.expect(log3.debug.thru).to.be.a('function');
        chai_1.expect(log3.info.thru).to.be.a('function');
        chai_1.expect(log3.error.thru).to.be.a('function');
        chai_1.expect(log3.warn.thru).to.be.a('function');
        chai_1.expect(log3.wtf.thru).to.be.a('function');
        chai_1.expect(log3.always.thru).to.be.a('function');
        chai_1.expect(log3.sillyWarn.thru).to.be.a('function');
        chai_1.expect(log3.verboseWarn.thru).to.be.a('function');
        chai_1.expect(log3.debugWarn.thru).to.be.a('function');
        chai_1.expect(log3.infoWarn.thru).to.be.a('function');
        chai_1.expect(log3.sillyError.thru).to.be.a('function');
        chai_1.expect(log3.verboseError.thru).to.be.a('function');
        chai_1.expect(log3.debugError.thru).to.be.a('function');
        chai_1.expect(log3.infoError.thru).to.be.a('function');
    });
    it('thru function on all log functions passes returned value thru if 1 arg given', function () {
        var log4 = node_1.nodeLogFactory(TAG);
        chai_1.expect(log4.blankWrap.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.blankWrap2.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.blankWrap3.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.silly.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.verbose.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.debug.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.info.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.error.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.warn.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.wtf.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.always.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.sillyWarn.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.verboseWarn.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.debugWarn.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.infoWarn.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.sillyError.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.verboseError.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.debugError.thru('grrrr')).to.eql('grrrr');
        chai_1.expect(log4.infoError.thru('grrrr')).to.eql('grrrr');
    });
    // tslint:disable-next-line
    it('thru function on all log functions returns output containing arg 2, if 2 args given', function () {
        var log5 = node_1.nodeLogFactory(TAG);
        chai_1.expect(log5.blankWrap.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.blankWrap2.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.blankWrap3.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.silly.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.verbose.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.debug.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.info.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.error.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.warn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.wtf.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.sillyWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.verboseWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.debugWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.infoWarn.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.sillyError.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.verboseError.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.debugError.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.infoError.thru('my_tag', 'expected_return')).to.eql('expected_return');
    });
    it('thru function on all log functions returns output containing arg 3, if 3 args given', function () {
        var log5 = node_1.nodeLogFactory(TAG);
        chai_1.expect(log5.blankWrap.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.blankWrap2.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.blankWrap3.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.silly.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.verbose.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.debug.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.info.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.error.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.warn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.wtf.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.sillyWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.verboseWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.debugWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.infoWarn.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.sillyError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.verboseError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.debugError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log5.infoError.thru('my_tag', 'v2', 'expected_return')).to.eql('expected_return');
    });
    it("thru function on all log functions is generic & accepts a return type", function () {
        var log6 = node_1.nodeLogFactory(TAG);
        chai_1.expect(log6.silly.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log6.info.thru('my_tag', 'expected_return')).to.eql('expected_return');
        chai_1.expect(log6.infoError.thru('my_tag', 5)).to.eql(5);
        log6.info.thru('my_tag', 'val2', 12);
        chai_1.expect(log6.infoError.thru('my_tag', 'val2', 12)).to.eql(12);
    });
    it("has fn method that returns method-scoped log instance that includes fn name in outputs, but has no fn function itself", function () {
        var log6 = node_1.nodeLogFactory(TAG);
        var fnLog = log6.fn('someMethod');
        // Store the log output of everything run inside, globally.
        var _a = blockLogOutput(function () {
            fnLog.info('fnLog_info');
            fnLog.silly('fnLog_silly');
        }), stores = _a.stores, result = _a.result;
        chai_1.expect(stores.log.logged[0]).to.match(/func: someMethod/);
        chai_1.expect(stores.log.logged[0]).to.match(/fnLog_info/);
        chai_1.expect(stores.log.logged[0]).to.match(/mad-logs-node\.test\.ts/);
        chai_1.expect(stores.log.logged[1]).to.match(/func: someMethod/);
        chai_1.expect(stores.log.logged[1]).to.match(/fnLog_silly/);
        chai_1.expect(stores.log.logged[1]).to.match(/mad-logs-node\.test\.ts/);
        chai_1.expect(fnLog.fn).to.be.undefined;
        chai_1.expect(log6.fn).to.be.a('function');
    });
    it("noTag function on all log functions blocks tag from being displayed", function () {
        var log7 = node_1.nodeLogFactory(TAG);
        var _a = blockLogOutput(function () {
            log7.info.noTag('ok');
            log7.info('ok');
        }), stores = _a.stores, result = _a.result;
        chai_1.expect(stores.log.logged[0]).to.match(/^ok/);
        chai_1.expect(stores.log.logged[0]).to.not.match(/mad-logs-node\.test/);
        chai_1.expect(stores.log.logged[1]).to.not.match(/^ok/);
        chai_1.expect(stores.log.logged[1]).to.match(/mad-logs-node\.test/);
    });
});
describe('buildFileTag', function () {
    it('exists', function () {
        chai_1.expect(node_1.buildFileTag).to.exist;
    });
    it('outputs a string', function () {
        chai_1.expect(node_1.buildFileTag('test-name')).to.be.a('string');
    });
    it('includes the filename in the output', function () {
        chai_1.expect(node_1.buildFileTag('test-name')).to.contain('test-name');
    });
    it('surrounds output w colour codes if given function chain from colours module', function () {
        var testOutput = node_1.buildFileTag('test-name', colors.blue);
        chai_1.expect(testOutput).to.contain('\u001b[34m');
        chai_1.expect(testOutput).to.contain('\u001b[39m');
        chai_1.expect(testOutput).to.contain('\u001b[34mtest-name\u001b[39m');
    });
    it('does not leave the terminal output colourized after running', function () {
        var testOutput = node_1.buildFileTag('test-name', colors.blue);
        var output = test_console_1.stdout.inspectSync(function (out) {
            console.log(testOutput + " hey");
            console.log("this should not contain a colour code");
        });
        chai_1.expect(output[0]).to.contain('\u001b');
        chai_1.expect(output[1]).to.not.contain('\u001b[39m');
    });
    it('pads the output to 20 characters if a pad length is not provided', function () {
        var testOutput = node_1.buildFileTag('test-name', colors.blue);
        chai_1.expect(testOutput).to.contain('           '); // 11 char space
        chai_1.expect(testOutput).to.not.contain('            '); // 12 char space
        var testOutput2 = node_1.buildFileTag('eighteen-char-str!', colors.blue);
        chai_1.expect(testOutput2).to.contain('  ');
    });
    it('if a pad length is provided, pads output to given # of chars', function () {
        var testOutput = node_1.buildFileTag('test-name', colors.blue, 25);
        chai_1.expect(testOutput).to.contain('                '); // 16 char space
        chai_1.expect(testOutput).to.not.contain('                 '); // 17 char space
        var testOutput2 = node_1.buildFileTag('eighteen-char-str!', colors.blue, 25);
        chai_1.expect(testOutput2).to.contain('       ');
        chai_1.expect(_.partial(node_1.buildFileTag, 'test-name', colors.blue, 25)).to.not.throw(TypeError);
    });
    it('throws if colourizer arg is non-function or function without _styles prop', function () {
        blockLogOutput(function () {
            var output = test_console_1.stdout.inspectSync(function (out) {
                chai_1.expect(function () { return node_1.buildFileTag('test-name', 'ccawa', 25); }).to.throw(TypeError);
                chai_1.expect(function () { return node_1.buildFileTag('test-name', (function () { return 'out'; }), 25); }).to.throw(TypeError);
            });
        });
    });
    it('does not accept non-strings as tag argument', function () {
        blockLogOutput(function () {
            var output = test_console_1.stdout.inspectSync(function (out) {
                chai_1.expect(function () { return node_1.buildFileTag((function () { return ''; }), colors.blue, 25); }).to.throw(TypeError);
            });
        });
    });
    it('allows null as an arg for colourizer, & still pads if arg 3 is then a #', function () {
        var testOutput = node_1.buildFileTag('test-name', null, 25);
        chai_1.expect(testOutput).to.contain('                '); // 16 char space
        chai_1.expect(testOutput).to.not.contain('                 '); // 17 char space
    });
    it('allows a number as 2nd arg, & pads by that amount', function () {
        var testOutput = node_1.buildFileTag('test-name', 25);
        chai_1.expect(testOutput).to.contain('                '); // 16 char space
        chai_1.expect(testOutput).to.not.contain('                 '); // 17 char space
    });
});
// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
//# sourceMappingURL=mad-logs-node.test.js.map