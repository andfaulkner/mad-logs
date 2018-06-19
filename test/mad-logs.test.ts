/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

// Ensure environment knows testing is occurring
(process.env as any).mocha = true;

// Fix process.argv to work with colors.
process.argv = Array.from(process.argv) || [];
global.process.argv = Array.from(global.process.argv) || process.argv || [];

/************************************** THIRD-PARTY IMPORTS ***************************************/
import {expect} from 'chai';
import {stdout} from 'test-console';
import * as colors from 'colors';
import {isVerbose} from 'env-var-helpers';

/*********************************** IMPORT FILES TO BE TESTED ************************************/
import * as madLogs from '../index';
import {buildFileTag, logFactory, logMarkers, MadLog} from '../index';

import * as sharedMadLogs from '../shared';

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

    return {errorLogs, warnLogs, result};
}

function testIsoStyle(styleName: keyof typeof sharedMadLogs.Styles) {
    it(styleName, function() {
        const log = sharedMadLogs.logFactory('MadLogs.test', sharedMadLogs.Styles[styleName]);
        log.info(`Test log :: ${styleName} style`);
    });
}

function styleTester(
    styleName: string,
    whatItAddsMsg: string,
    expectedContents: string[] = [],
    expectedMatches: RegExp[] = []
) {
    it(`has style ${styleName}, which adds ${whatItAddsMsg} to output if used in log constructor`, function() {
        const eblLogger = logFactory()('mad-logs.test.ts', logMarkers[styleName]);

        // Stub console.log and most of console's internals
        const output = stdout.inspectSync(function() {
            eblLogger('Should be logged');
        });

        // Display the actual log output if verbose mode is on
        if (isVerbose) {
            console.log(`Output of ${styleName} log (below):`);
            console.log(output[0]);
        }

        const stringsExpectedInOutput = ['mad-logs.test.ts'].concat(expectedContents);

        stringsExpectedInOutput.forEach(str => expect(output[0]).to.contain(str));
        expectedMatches.forEach(match => expect(output[0]).to.match(match));
    });
}

/********************************************* TESTS **********************************************/
describe('logFactory', function() {
    it('exists', function() {
        expect(logFactory).to.exist;
    });

    it('returns a function when given a config object with a valid log level', function() {
        ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach(lvl => {
            expect(logFactory({logLevel: lvl})).to.be.a('function');
        });

        expect(logFactory({logLevel: 'info'})).to.be.a('function');
    });

    it('returns function if given no config object (this triggers default log level)', function() {
        expect(logFactory).to.not.throw(TypeError);
        expect(logFactory()).to.be.a('function');
    });

    it('throws TypeError if given an invalid log level or config object', function() {
        expect(() => logFactory(['asdf'])).to.throw(TypeError);
        expect(() => (logFactory as any)({gr: 'arg'})).to.throw(TypeError);
        expect(() => (logFactory as any)({logLevel: {}})).to.throw(TypeError);
        expect(() => logFactory({logLevel: 'notARealLevel'})).to.throw(TypeError);
        expect(() => logFactory({logLevel: ''})).to.throw(TypeError);
    });

    it('does not throw TypeError if given no args, null, or an empty config object', function() {
        expect(() => logFactory()).to.not.throw(TypeError);
        expect(() => logFactory(null)).to.not.throw(TypeError);
        expect(() => logFactory({})).to.not.throw(TypeError);
    });

    describe('log function constructed by logFactory (with no styling)', function() {
        let logger: MadLog;
        before(() => {
            const config = {logLevel: 'silly'};
            logger = logFactory(config)('mad-logs.test');
        });

        it('returns log function w/ props for each logLvl when given config & filename', function() {
            expect(logger).to.exist;
            expect(logger).to.be.a('function');
            ['silly', 'verbose', 'debug', 'info', 'warn', 'error', 'wtf'].forEach(methodName => {
                expect(logger).to.have.property(methodName);
            });
        });

        it('writes to terminal, including a tag w/ filename received by constructor', function() {
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
                'mad-logs.test  testOutputInfo\n',
            ]);

            // ensure the console outputs reached the console.warn & .error using log methods
            expect(
                storeWarnErrorLogs.some(curLog => curLog.some(lBit => lBit === 'testOutputWarn'))
            ).to.be.true;
            expect(
                storeWarnErrorLogs.some(curLog => curLog.some(lBit => lBit === 'testOutputError'))
            ).to.be.true;
            expect(storeWarnErrorLogs.some(curLog => curLog.some(lBit => lBit === 'testOutputWtf')))
                .to.be.true;
        });

        it('All log instance methods return last arg given, when 1 args provided', function() {
            expect(logger.silly('omnomnom')).to.eql('omnomnom');
            expect(logger.verbose('omnomnom')).to.eql('omnomnom');
            expect(logger.info('omnomnom')).to.eql('omnomnom');
            expect(logger.warn('omnomnom')).to.eql('omnomnom');
            expect(logger.error('omnomnom')).to.eql('omnomnom');
            expect(logger.wtf('omnomnom')).to.eql('omnomnom');
        });
        it('All log instance methods return last arg given, when 2 args provided', function() {
            expect(logger.silly('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            expect(logger.verbose('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            expect(logger.info('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            expect(logger.warn('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            expect(logger.error('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
            expect(logger.wtf('tickaTickaBoomTicka', 'BoomTickaBoom')).to.eql('BoomTickaBoom');
        });
        it('All log instance methods return last arg given, when 4 args provided', function() {
            expect(logger.silly('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            expect(logger.verbose('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            expect(logger.info('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            expect(logger.warn('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            expect(logger.error('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
            expect(logger.wtf('tingtang', 'wallawalla', 'bing', 'bang')).to.eql('bang');
        });
    });
});

describe('logMarkers', function() {
    const styles = [
        'lakeLouise',
        'farmerBrown',
        'escherBarbieLego',
        'smokeyHatesChristmas',
        'barbells',
        'angryBird',
        'zebra',
        'vendetta',
        'moProblems',
        'theHeist',
        'vendetta',
        'rockIsDead',
        'mechanicalAtFists',
        'nightmare',
        'tangerines',
        'maceWindu',
        'grasslands',
        'default',
        'cartoonSwearing',
        'backAndForth',
    ];

    // tslint:disable
    const stylesWMatch = [
        {
            name: 'arrow',
            outMatch: />>--mad-logs.test.ts---\|>   Should be logged\n/,
        },
        {
            name: 'brainwave',
            outMatch: /~\^~\^~\^-mad-logs.test.ts-~\^~\^~\^ color: #003366; Should be logged\n/,
        },
        {
            name: 'checkmate',
            outMatch: /♜♞♝♚♛♝♞♜_ \[mad-logs.test\.ts\] _♟♟♟♟♟♟♟♟ color: #593001; Should be logged/,
        },
        {
            name: 'hotPursuit',
            outMatch: /🎄🎄 !🍯🐻\-\-\-🎄!🐝🐝\-\-\- \[mad-logs.test\.ts\] !🐝🐝🐝🐝\-\-\- 🎄🎄 color: #000000; background-color: orange; Should be logged/,
        },
        {
            name: 'pipeDream',
            outMatch: /┣╋━╋~🛀~╋━╋┫ mad-logs.test\.ts ┣┫ color: #777777; background-color: #FFFFFF; font-weight: bold; Should be logged/,
        },
    ];
    // tslint:enable

    it('exists', function() {
        expect(logMarkers).to.exist;
    });

    it('has over 20 defined styles', function() {
        expect(Object.keys(logMarkers)).to.have.length.above(20);
    });

    it('only contains objects with keys tagPrefix, tagSuffix, and style', function() {
        Object.keys(logMarkers).forEach(markerKey => {
            const curLogMarker = logMarkers[markerKey];
            expect(curLogMarker.tagPrefix).to.be.a('string');
            expect(curLogMarker.tagSuffix).to.be.a('string');
            expect(curLogMarker.style).to.be.a('string');
        });
    });

    // Ensure expected styles included (not-exhaustive)
    styles.forEach(style => {
        it(`includes style ${style}`, function() {
            expect(Object.keys(logMarkers)).to.contain(style);
        });
    });

    // Just an example
    it(`includes style 'arrow', which includes prefix >>-- and suffix ---|>`, function() {
        expect(logMarkers.arrow).to.exist;
        expect(logMarkers.arrow.tagPrefix).to.match(/>>--/);
        expect(logMarkers.arrow.tagSuffix).to.match(/--|>/);
    });

    // Another example, to include one with emojis
    it(`includes style 'rockIsDead', which includes 💀☠🎸💀💎💀, 💃💃💃🎧😃, etc.`, function() {
        expect(logMarkers.rockIsDead).to.exist;
        expect(logMarkers.rockIsDead.tagPrefix).to.match(/💀☠🎸💀💎💀🎸💀 \|/);
        expect(logMarkers.rockIsDead.tagSuffix).to.match(/\| 😃🔊♪♪💃💃💃💃💃🎧😃/);
    });

    // Ensure expected styles included, & giving expected output when used in a log (not-exhaustive)
    stylesWMatch.forEach(style => {
        const logger = logFactory()('mad-logs.test.ts', logMarkers[style.name]);

        it(`has style ${
            style.name
        }, w/ output that matches ${style.outMatch.toString()}`, function() {
            // Stub console.log and most of console's internals
            const output = stdout.inspectSync(function() {
                logger('Should be logged');
            });

            if (isVerbose) {
                console.log(`\n------------------------------------`);
                console.log(`Output of ${style.name} log (below):`);
                console.log(output[0]);
                console.log(`Regexp for ${style.name}:`, style.outMatch);
                console.log(`------------------------------------\n`);
            }

            expect(output[0]).to.match(style.outMatch);
        });
    });

    styleTester('arrow', '>>-- & ---|>', [], [/>>--mad-logs.test.ts---\|>   Should be logged/]);

    styleTester(
        'escherBarbieLego',
        '||┗┛┏┓ & ┏┓┗┛|| (and various styles)',
        [],
        [
            /\|\|┗┛┏┓mad-logs.test.ts┏┓┗┛\|\| color: #FFFFFF; background-color: #FF69B4; Should be logged/,
        ] // tslint:disable-line
    );

    styleTester('kingRageBlock', '"(👁‍🗨🗣🗯)" (and various styles)', [
        '(👁‍🗨🗣🗯)',
        'background-color: purple;',
        'color: pink;',
    ]);

    styleTester(
        'mrsPotatoVHS',
        '(👃👁👂), (👂👁👅), and various styles (including an ultra-thick black border)',
        ['(👃👁👂)', '(👂👁👅)', `color: black;`, `border-style: solid;`, `border-width: 5px;`]
    );
});

describe('shared module', function() {
    describe('styles', function() {
        testIsoStyle('none');
        testIsoStyle('angryBird');
        testIsoStyle(`aquarium`);
        testIsoStyle(`arrow`);
        testIsoStyle(`backAndForth`);
        testIsoStyle(`barbells`);
        testIsoStyle(`bracelet`);
        testIsoStyle(`brainwave`);
        testIsoStyle(`checkmate`);
        testIsoStyle(`cult`);
        testIsoStyle(`dirtRoad`);
        testIsoStyle(`escherBarbieLego`);
        testIsoStyle(`farmerBrown`);
        testIsoStyle(`grasslands`);
        testIsoStyle(`hatBlock`);
        testIsoStyle(`hotPursuit`);
        testIsoStyle(`joy`);
        testIsoStyle(`kingRageBlock`);
        testIsoStyle(`lakeLouise`);
        testIsoStyle(`lucky`);
        testIsoStyle(`maceWindu`);
        testIsoStyle(`mechanicalAtFists`);
        testIsoStyle(`moProblems`);
        testIsoStyle(`mrsPotatoVHS`);
        testIsoStyle(`nightmare`);
        testIsoStyle(`pipeDream`);
        testIsoStyle(`potOfGold`);
        testIsoStyle(`probeArcade`);
        testIsoStyle(`rainbowLeaf`);
        testIsoStyle(`rockIsDead`);
        testIsoStyle(`smokeyHatesChristmas`);
        testIsoStyle(`springy`);
        testIsoStyle(`swimmers`);
        testIsoStyle(`tangerines`);
        testIsoStyle(`theBird`);
        testIsoStyle(`theHeist`);
        testIsoStyle(`vendetta`);
        testIsoStyle(`zebra`);
    });
});
