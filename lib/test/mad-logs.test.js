/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />
"use strict";
// Ensure environment knows testing is occurring
process.env.mocha = true;
// Store original process.argv.
var oldProcArgs = Object.assign({}, process.argv);
// Fix process.argv to work with colors.
process.argv = Array.from(process.argv) || [];
global.process.argv = Array.from(global.process.argv) || process.argv || [];
/************************************** THIRD-PARTY IMPORTS ***************************************/
var chai_1 = require("chai");
var test_console_1 = require("test-console");
var env_var_helpers_1 = require("env-var-helpers");
var index_1 = require("../index");
/******************************************** HELPERS *********************************************/
/**
 * Prevents console.error messages emitted by code from reaching the console for given function
 * @param  {Function} fn - function to run without showing errors
 * @return {Object<{errorLogs: string[], warnLogs: string[], result: any}>} array containing
 *              warnings & errors outputted running the function, and the function result
 */
function blockErrorOutput(fn) {
    var errorLogs = [];
    var warnLogs = [];
    var errorOrig = console.error;
    console.error = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        return errorLogs.push(msgs);
    };
    var warnOrig = console.warn;
    console.warn = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        return warnLogs.push(msgs);
    };
    var result = fn();
    console.error = errorOrig;
    console.warn = warnOrig;
    return { errorLogs: errorLogs, warnLogs: warnLogs, result: result };
}
/********************************************* TESTS **********************************************/
describe('logFactory', function () {
    it('exists', function () {
        chai_1.expect(index_1.logFactory).to.exist;
    });
    it('returns a function when given a config object with a valid log level', function () {
        ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach(function (lvl) {
            chai_1.expect(index_1.logFactory({ logLevel: lvl })).to.be.a('function');
        });
        chai_1.expect(index_1.logFactory({ logLevel: 'info' })).to.be.a('function');
    });
    it('returns function if given no config object (this triggers default log level)', function () {
        chai_1.expect(index_1.logFactory).to.not.throw(TypeError);
        chai_1.expect(index_1.logFactory()).to.be.a('function');
    });
    it('throws TypeError if given an invalid log level or config object', function () {
        chai_1.expect(function () { return index_1.logFactory(['asdf']); }).to.throw(TypeError);
        chai_1.expect(function () { return index_1.logFactory({ gr: "arg" }); }).to.throw(TypeError);
        chai_1.expect(function () { return index_1.logFactory({ logLevel: {} }); }).to.throw(TypeError);
        chai_1.expect(function () { return index_1.logFactory({ logLevel: "notARealLevel" }); }).to.throw(TypeError);
        chai_1.expect(function () { return index_1.logFactory({ logLevel: "" }); }).to.throw(TypeError);
    });
    it('does not throw TypeError if given no args, null, or an empty config object', function () {
        chai_1.expect(function () { return index_1.logFactory(); }).to.not.throw(TypeError);
        chai_1.expect(function () { return index_1.logFactory(null); }).to.not.throw(TypeError);
        chai_1.expect(function () { return index_1.logFactory({}); }).to.not.throw(TypeError);
    });
    describe('log function constructed by logFactory (with no styling)', function () {
        var logger;
        before(function () {
            var config = { logLevel: 'silly' };
            logger = index_1.logFactory(config)('mad-logs.test');
        });
        it('returns log function w/ props for each logLvl when given config & filename', function () {
            chai_1.expect(logger).to.exist;
            chai_1.expect(logger).to.be.a('function');
            ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach(function (methodName) {
                chai_1.expect(logger).to.have.property(methodName);
            });
        });
        it('writes to terminal, including a tag w/ filename received by constructor', function () {
            var storeWarnErrorLogs = [];
            // stub console.log and most of console's internals
            var output = test_console_1.stdout.inspectSync(function () {
                // override console warn and console error
                var warnOrig = console.warn;
                console.warn = function () {
                    var msgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        msgs[_i] = arguments[_i];
                    }
                    return storeWarnErrorLogs.push(msgs);
                };
                var errorOrig = console.error;
                console.error = function () {
                    var msgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        msgs[_i] = arguments[_i];
                    }
                    return storeWarnErrorLogs.push(msgs);
                };
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
            chai_1.expect(output).to.have.members([
                'mad-logs.test  testOutputBaseLog\n',
                'mad-logs.test  testOutputSilly\n',
                'mad-logs.test  testOutputVerbose\n',
                'mad-logs.test  testOutputDebug\n',
                'mad-logs.test  testOutputInfo\n'
            ]);
            // ensure the console outputs reached the console.warn & .error using log methods
            chai_1.expect(storeWarnErrorLogs.some(function (curLog) {
                return curLog.some(function (lBit) { return lBit === 'testOutputWarn'; });
            })).to.be.true;
            chai_1.expect(storeWarnErrorLogs.some(function (curLog) {
                return curLog.some(function (lBit) { return lBit === 'testOutputError'; });
            })).to.be.true;
            chai_1.expect(storeWarnErrorLogs.some(function (curLog) {
                return curLog.some(function (lBit) { return lBit === 'testOutputWtf'; });
            })).to.be.true;
        });
        it('All log instance methods return last arg given, when 1 args provided', function () {
            chai_1.expect(logger.silly('omnomnom')).to.eql('omnomnom');
            chai_1.expect(logger.verbose('omnomnom')).to.eql('omnomnom');
            chai_1.expect(logger.info('omnomnom')).to.eql('omnomnom');
            chai_1.expect(logger.warn('omnomnom')).to.eql('omnomnom');
            chai_1.expect(logger.error('omnomnom')).to.eql('omnomnom');
            chai_1.expect(logger.wtf('omnomnom')).to.eql('omnomnom');
        });
        it('All log instance methods return last arg given, when 2 args provided', function () {
            chai_1.expect(logger.silly('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            chai_1.expect(logger.verbose('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            chai_1.expect(logger.info('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            chai_1.expect(logger.warn('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            chai_1.expect(logger.error('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            chai_1.expect(logger.wtf('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
        });
        it('All log instance methods return last arg given, when 4 args provided', function () {
            chai_1.expect(logger.silly('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            chai_1.expect(logger.verbose('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            chai_1.expect(logger.info('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            chai_1.expect(logger.warn('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            chai_1.expect(logger.error('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            chai_1.expect(logger.wtf('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
        });
    });
});
describe('logMarkers', function () {
    var styles = ['lakeLouise', 'farmerBrown', 'escherBarbieLego', 'smokeyHatesChristmas',
        'barbells', 'angryBird', 'zebra', 'vendetta', 'moProblems', 'theHeist',
        'vendetta', 'rockIsDead', 'mechanicalAtFists', 'nightmare', 'tangerines',
        'maceWindu', 'grasslands', 'default', 'cartoonSwearing', 'backAndForth'];
    // tslint:disable
    var stylesWMatch = [
        {
            name: 'arrow',
            outMatch: />>--mad-logs.test.ts---\|>   Should be logged\n/
        }, {
            name: 'brainwave',
            outMatch: /~\^~\^~\^-mad-logs.test.ts-~\^~\^~\^ color: #003366; Should be logged\n/
        }, {
            name: 'checkmate',
            outMatch: /♜♞♝♚♛♝♞♜_ \[mad-logs.test\.ts\] _♟♟♟♟♟♟♟♟ color: #593001; Should be logged/
        }, {
            name: 'hotPursuit',
            outMatch: /🎄🎄 !🍯🐻\-\-\-🎄!🐝🐝\-\-\- \[mad-logs.test\.ts\] !🐝🐝🐝🐝\-\-\- 🎄🎄 color: #000000; background-color: orange; Should be logged/
        }, {
            name: 'pipeDream',
            outMatch: /┣╋━╋~🛀~╋━╋┫ mad-logs.test\.ts ┣┫ color: #777777; background-color: #FFFFFF; font-weight: bold; Should be logged/
        },
    ];
    // tslint:enable
    it('exists', function () {
        chai_1.expect(index_1.logMarkers).to.exist;
    });
    it('has over 20 defined styles', function () {
        chai_1.expect(Object.keys(index_1.logMarkers)).to.have.length.above(20);
    });
    it('only contains objects with keys tagPrefix, tagSuffix, and style', function () {
        Object.keys(index_1.logMarkers).forEach(function (markerKey) {
            var curLogMarker = index_1.logMarkers[markerKey];
            chai_1.expect(curLogMarker.tagPrefix).to.be.a('string');
            chai_1.expect(curLogMarker.tagSuffix).to.be.a('string');
            chai_1.expect(curLogMarker.style).to.be.a('string');
        });
    });
    // Ensure expected styles included (not-exhaustive)
    styles.forEach(function (style) {
        it("includes style " + style, function () {
            chai_1.expect(Object.keys(index_1.logMarkers)).to.contain(style);
        });
    });
    // Just an example
    it("includes style 'arrow', which includes prefix >>-- and suffix ---|>", function () {
        chai_1.expect(index_1.logMarkers.arrow).to.exist;
        chai_1.expect(index_1.logMarkers.arrow.tagPrefix).to.match(/>>--/);
        chai_1.expect(index_1.logMarkers.arrow.tagSuffix).to.match(/--|>/);
    });
    // Another example, to include one with emojis
    it("includes style 'rockIsDead', which includes \uD83D\uDC80\u2620\uD83C\uDFB8\uD83D\uDC80\uD83D\uDC8E\uD83D\uDC80, \uD83D\uDC83\uD83D\uDC83\uD83D\uDC83\uD83C\uDFA7\uD83D\uDE03, etc.", function () {
        chai_1.expect(index_1.logMarkers.rockIsDead).to.exist;
        chai_1.expect(index_1.logMarkers.rockIsDead.tagPrefix).to.match(/💀☠🎸💀💎💀🎸💀 \|/);
        chai_1.expect(index_1.logMarkers.rockIsDead.tagSuffix).to.match(/\| 😃🔊♪♪💃💃💃💃💃🎧😃/);
    });
    // Ensure expected styles included, & giving expected output when used in a log (not-exhaustive)
    stylesWMatch.forEach(function (style) {
        var logger = index_1.logFactory()('mad-logs.test.ts', index_1.logMarkers[style.name]);
        it("has style " + style.name + ", w/ output that matches " + style.outMatch.toString(), function () {
            // Stub console.log and most of console's internals
            var output = test_console_1.stdout.inspectSync(function () {
                logger('Should be logged');
            });
            if (env_var_helpers_1.isVerbose) {
                console.log("\n------------------------------------");
                console.log("Output of " + style.name + " log (below):");
                console.log(output[0]);
                console.log("Regexp for " + style.name + ":", style.outMatch);
                console.log("------------------------------------\n");
            }
            chai_1.expect(output[0]).to.match(style.outMatch);
        });
    });
    // Manual repeat example of previous test group, as comparison for writing more tests
    it("has style arrow, which adds >>-- & ---|> to output if used in log constructor", function () {
        var arrowLogger = index_1.logFactory()('mad-logs.test.ts', index_1.logMarkers.arrow);
        // Stub console.log and most of console's internals
        var output = test_console_1.stdout.inspectSync(function () {
            arrowLogger('Should be logged');
        });
        if (env_var_helpers_1.isVerbose) {
            console.log('Output of arrow log (below):');
            console.log(output[0]);
        }
        // test against the text intended for the terminal (but captured by the stub)
        chai_1.expect(output[0]).to.match(/>>--mad-logs.test.ts---\|>   Should be logged/);
    });
    // New example of  preceding section's method, as 2nd comparison for writing more tests
    it("has style escherBarbieLego, which adds ||\u2517\u251B\u250F\u2513 & \u250F\u2513\u2517\u251B|| to output if used in log constructor", function () {
        var eblLogger = index_1.logFactory()('mad-logs.test.ts', index_1.logMarkers.escherBarbieLego);
        // Stub console.log and most of console's internals
        var output = test_console_1.stdout.inspectSync(function () {
            eblLogger('Should be logged');
        });
        if (env_var_helpers_1.isVerbose) {
            console.log('Output of escherBarbieLego log (below):');
            console.log(output[0]);
        }
        // test against the text intended for the terminal (but captured by the stub)
        chai_1.expect(output[0]).to.match(/\|\|┗┛┏┓mad-logs.test.ts┏┓┗┛\|\| color: #FFFFFF; background-color: #FF69B4; Should be logged/); // tslint:disable-line
    });
});
// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
//# sourceMappingURL=mad-logs.test.js.map