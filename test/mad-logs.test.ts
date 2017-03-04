/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

// ensure environment knows testing is occurring
process.env.mocha === true;

// Store original process.argv
const oldProcArgs = Object.assign({}, process.argv);

// Fix process.argv to work with colors
process.argv = Array.from(process.argv) || [];
global.process.argv = Array.from(global.process.argv) || process.argv || [];

/************************************** THIRD-PARTY IMPORTS ***************************************/
import { expect } from 'chai';
import * as sinon from 'sinon';

import * as fs from 'fs';
import * as path from 'path';
import * as partial from 'lodash.partial';
import { stderr, stdout } from 'test-console';
import * as colors from 'colors';

/*********************************** IMPORT FILES TO BE TESTED ************************************/
import * as madLogs from '../lib/index';
const { buildFileTag, logFactory, logMarkers } = madLogs;

/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result
 */
function blockErrorOutput(fn) {
    const errorLogs = [];
    const warnLogs = [];

    const errorOrig = console.error;
    console.error = (...msgs) => errorLogs.push(msgs);
    const warnOrig = console.warn;
    console.warn = (...msgs) => warnLogs.push(msgs);

    const result = fn();

    console.error = errorOrig;
    console.warn = warnOrig;

    return { errorLogs, warnLogs, result };
}

/********************************************* TESTS **********************************************/
describe('logFactory', function() {
    it('exists', function() {
        expect(logFactory).to.exist;
    });

    it('returns a function when given a config object with a valid log level', function() {
        ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach((lvl) => {
            expect(logFactory({ logLevel: lvl })).to.be.a('function');
        });

        expect(logFactory({ logLevel: 'info' })).to.be.a('function');
    });

    it('returns function if given no config object (this triggers default log level)', function() {
        expect(logFactory).to.not.throw(TypeError);
        expect(logFactory()).to.be.a('function');
    });

    it('throws TypeError if given an invalid log level or config object', function () {
        expect(partial(logFactory, ['asdf'])).to.throw(TypeError);
        expect(partial(logFactory, { poo: "poooooo" })).to.throw(TypeError);
        expect(partial(logFactory, { logLevel: {} })).to.throw(TypeError);
        expect(partial(logFactory, { logLevel: "notARealLevel" })).to.throw(TypeError);
        expect(partial(logFactory, { logLevel: "" })).to.throw(TypeError);
    });

    it('does not throw TypeError if given no or a falsy value as a config object', function () {
        expect(partial(logFactory)).to.not.throw(TypeError);
        expect(partial(logFactory, null)).to.not.throw(TypeError);
        expect(partial(logFactory, {})).to.not.throw(TypeError);
        expect(partial(logFactory, '')).to.not.throw(TypeError);
    });

    it('returns default if given no or a falsy value as a config object', function () {

    });

    describe('log function constructed by logFactory', function() {
        let logger;
        before(() => {
            const config = { logLevel: 'silly' };
            logger = logFactory(config)('mad-logs.test');
        });

        it('returns log function w/ props for each logLvl when given config & filename', function () {
            expect(logger).to.exist;
            expect(logger).to.be.a('function');
            ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach((methodName) => {
                expect(logger).to.have.property(methodName);
            });
        });

        it('writes to terminal, including a tag w/ filename received by constructor', function () {
            const storeWarnErrorLogs = [];

            // stub console.log and most of console's internals
            const output = stdout.inspectSync(function() {

                // override console warn and console error
                const warnOrig = console.warn;
                console.warn = (...msgs) => storeWarnErrorLogs.push(msgs);
                const errorOrig = console.error;
                console.error = (...msgs) => storeWarnErrorLogs.push(msgs);

                // log using the library, with the console fully stubbed
                logger('testOutputBaseLog');
                logger.silly('testOutputSilly');
                logger.verbose('testOutputVerbose');
                logger.debug('testOutputDebug');
                logger.info('testOutputInfo');
                logger.warn('testOutputWarn');
                logger.error('testOutputError');
                logger.wtf('testOutputWtf');

                // restore the remaining console methods
                console.warn = warnOrig;
                console.error = errorOrig;
            });

            // test against the text intended for the terminal (but captured by the stub)
            expect(output).to.have.members([
                'mad-logs.test  testOutputBaseLog\n',
                'mad-logs.test  testOutputSilly\n',
                'mad-logs.test  testOutputVerbose\n',
                'mad-logs.test  testOutputDebug\n',
                'mad-logs.test  testOutputInfo\n'
            ]);

            // ensure the console outputs reached the console.warn & .error using log methods
            expect(storeWarnErrorLogs.some((curLog) =>
                curLog.some((lBit) => lBit === 'testOutputWarn'))).to.be.true;
            expect(storeWarnErrorLogs.some((curLog) =>
                curLog.some((lBit) => lBit === 'testOutputError'))).to.be.true;
            expect(storeWarnErrorLogs.some((curLog) =>
                curLog.some((lBit) => lBit === 'testOutputWtf'))).to.be.true;
            });
    });
});

describe('logMarkers', function() {
    it('exists', function() {
        expect(logMarkers).to.exist;
    });
    it('has over 20 defined styles', function () {
        expect(Object.keys(logMarkers)).to.have.length.above(20);
    });
    it('only contains objects with keys tagPrefix, tagSuffix, and style', function () {
        Object.keys(logMarkers).forEach((markerKey) => {
            const curLogMarker = logMarkers[markerKey];
            expect(curLogMarker.tagPrefix).to.be.a('string');
            expect(curLogMarker.tagSuffix).to.be.a('string');
            expect(curLogMarker.style).to.be.a('string');
        })
    });
});

describe('buildFileTag', function() {
    it('exists', function () {
        expect(buildFileTag).to.exist;
    });
    it('outputs a string', function() {
        expect(buildFileTag('test-name')).to.be.a('string');
    });
    it('includes the filename in the output', function () {
        expect(buildFileTag('test-name')).to.contain('test-name');
    });
    it('surrounds output w colour codes if given function chain from colours module', function () {
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
    it('pads the output to 20 characters if a pad length is not provided', function () {
        const testOutput = buildFileTag('test-name', colors.blue);
        expect(testOutput).to.contain('           '); // 11 char space
        expect(testOutput).to.not.contain('            '); // 12 char space
        const testOutput2 = buildFileTag('eighteen-char-str!', colors.blue);
        expect(testOutput2).to.contain('  ');
    });
    it('if a pad length is provided, pads output to given # of chars', function () {
        const testOutput = buildFileTag('test-name', colors.blue, 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
        const testOutput2 = buildFileTag('eighteen-char-str!', colors.blue, 25);
        expect(testOutput2).to.contain('       ');
        expect(partial(buildFileTag, 'test-name', colors.blue, 25)).to.not.throw(TypeError);
    });
    it('throws if colourizer arg is non-function or function without _styles prop', function () {
        blockErrorOutput(() => {
            const output = stdout.inspectSync(function(out) {
                expect(
                    () => buildFileTag('test-name', 'ccawa' as any, 25)
                ).to.throw(TypeError);
                expect(
                    () => buildFileTag('test-name', (() => 'out'), 25)
                ).to.throw(TypeError);
            });
        })
    });
    it('does not accept non-strings as tag argument', function () {
        blockErrorOutput(() => {
            const output = stdout.inspectSync(function(out) {
                expect(
                    () => buildFileTag((() => '') as any, colors.blue, 25)
                ).to.throw(TypeError);
            });
        });
    });
    it('allows null as an arg for colourizer, & still pads if arg 3 is then a #', function () {
        const testOutput = buildFileTag('test-name', null, 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
    });
    it('allows a number as 2nd arg, & pads by that amount', function () {
        const testOutput = buildFileTag('test-name', 25);
        expect(testOutput).to.contain('                '); // 16 char space
        expect(testOutput).to.not.contain('                 '); // 17 char space
    });
});

describe('simple-by-log-level functions', function() {
    it('has function builder isolog, which can be instantiated', function() {
        expect(madLogs.isolog).to.exist;
    })
    it('has function logSilly that logs if LOG_LEVEL >= silly', function() {
        process.env.LOG_LEVEL = 'silly';
        global.process.env.LOG_LEVEL= 'silly';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
    });

    it('has func logVerbose that logs if LOG_LEVEL >= verbose', function() {
        process.env.LOG_LEVEL = 'verbose';
        global.process.env.LOG_LEVEL= 'verbose';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
        expect(storeLogs[1]).to.eql(['TestTag', 'verbose:logged']);
    });
    it('has func logDebug that logs if LOG_LEVEL >= debug', function() {
        process.env.LOG_LEVEL = 'debug';
        global.process.env.LOG_LEVEL= 'debug';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
        expect(storeLogs[1]).to.eql(['TestTag', 'verbose:logged']);
        expect(storeLogs[2]).to.eql(['TestTag', 'debug:logged']);
    });
    it('has func logInfo that logs if LOG_LEVEL >= info', function() {
        process.env.LOG_LEVEL = 'info';
        global.process.env.LOG_LEVEL= 'info';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
        expect(storeLogs[1]).to.eql(['TestTag', 'verbose:logged']);
        expect(storeLogs[2]).to.eql(['TestTag', 'debug:logged']);
        expect(storeLogs[3]).to.eql(['TestTag', 'info:logged']);
    });
    it('has func logWarn that logs if LOG_LEVEL >= warn', function() {
        process.env.LOG_LEVEL = 'warn';
        global.process.env.LOG_LEVEL= 'warn';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
        expect(storeLogs[1]).to.eql(['TestTag', 'verbose:logged']);
        expect(storeLogs[2]).to.eql(['TestTag', 'debug:logged']);
        expect(storeLogs[3]).to.eql(['TestTag', 'info:logged']);
        expect(storeLogs[4]).to.eql(['TestTag', 'warn:logged']);
    });
    it('has func logError that logs if LOG_LEVEL >= error', function() {
        process.env.LOG_LEVEL = 'error';
        global.process.env.LOG_LEVEL= 'error';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
        expect(storeLogs[1]).to.eql(['TestTag', 'verbose:logged']);
        expect(storeLogs[2]).to.eql(['TestTag', 'debug:logged']);
        expect(storeLogs[3]).to.eql(['TestTag', 'info:logged']);
        expect(storeLogs[4]).to.eql(['TestTag', 'warn:logged']);
        expect(storeLogs[5]).to.eql(['TestTag', 'error:logged']);
    });
    it('has func logWtf that logs if LOG_LEVEL is wtf', function() {
        process.env.LOG_LEVEL = 'wtf';
        global.process.env.LOG_LEVEL= 'wtf';

        const storeLogs = [];
        let origConsoleLog = console.log;
        console.log = (...msg) => storeLogs.push(msg);

        const log = madLogs.isolog('TestTag');
        log.silly('silly:logged');
        log.verbose('verbose:logged');
        log.debug('debug:logged');
        log.info('info:logged');
        log.warn('warn:logged');
        log.error('error:logged');
        log.wtf('wtf:logged');

        console.log = origConsoleLog;
        expect(storeLogs[0]).to.eql(['TestTag', 'silly:logged']);
        expect(storeLogs[1]).to.eql(['TestTag', 'verbose:logged']);
        expect(storeLogs[2]).to.eql(['TestTag', 'debug:logged']);
        expect(storeLogs[3]).to.eql(['TestTag', 'info:logged']);
        expect(storeLogs[4]).to.eql(['TestTag', 'warn:logged']);
        expect(storeLogs[5]).to.eql(['TestTag', 'error:logged']);
        expect(storeLogs[6]).to.eql(['TestTag', 'wtf:logged']);
    });
});


// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
