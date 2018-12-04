/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />

/************************************** THIRD-PARTY IMPORTS ***************************************/
import {expect} from 'chai';
import {stdout} from 'test-console';
import {isVerbose} from 'env-var-helpers';

/*********************************** IMPORT FILES TO BE TESTED ************************************/
import * as madLogs from '../index';
import {logFactory, Styles, Log} from '../index';
import {madLogMarkers} from '../src/theming';

/******************************************** HELPERS *********************************************/
/**
 * Visually test an isomorphic style
 * Ensure it looks good when outputted, by visual inspection
 * These will automatically pass if they don't throw
 */
function visualTestIsoStyle(styleName: keyof typeof Styles) {
    it(styleName.toString(), function() {
        const log = logFactory(`MadLogs.test`, Styles[styleName]);
        log.info(`Test log :: ${styleName.toString()} style`);
    });
}

/**
 * Fully test style [styleName]
 *
 * Explain what it adds to a log message with [whatItAddsMsg] arg
 *
 * Ensure it logs, and has output where all [expectedContents] strings and
 * [expectedMatches] RegExps are partial matches (i.e. they return a match, but
 * don't need to match the whole string)
 */
function styleTester(
    styleName: keyof typeof Styles,
    whatItAddsMsg: string,
    expectedContents: string[] = [],
    expectedMatches: RegExp[] = []
) {
    it(`has style ${styleName.toString()}, which adds ${whatItAddsMsg} to output if used in log constructor`, function() {
        const eblLogger = logFactory(`mad-logs.test.ts`, Styles[styleName]);

        // Stub console.log and most of console's internals
        const output = stdout.inspectSync(function() {
            eblLogger(`Should be logged`);
        });

        // Display the actual log output if verbose mode is on
        if (isVerbose) {
            console.log(`Output of ${styleName.toString()} log (below):`);
            console.log(output[0]);
        }

        const stringsExpectedInOutput = [`mad-logs.test.ts`].concat(expectedContents);

        stringsExpectedInOutput.forEach(str => expect(output[0]).to.contain(str));
        expectedMatches.forEach(match => expect(output[0]).to.match(match));
    });
}

/********************************************* TESTS **********************************************/
describe(`logFactory`, function() {
    it(`exists`, function() {
        expect(logFactory).to.exist;
    });

    it(`returns function if given filename & style)`, function() {
        expect(() => logFactory(`mad-logs.test.ts`, Styles.dirtRoad)).to.not.throw(TypeError);
        expect(logFactory(`mad-logs.test.ts`, Styles.dirtRoad)).to.be.a(`function`);
    });

    describe(`log function constructed by logFactory (with no styling)`, function() {
        let logger: Log;
        before(() => {
            logger = logFactory(`mad-logs.test.ts`, Styles.cult);
        });

        it(`returns log function w/ props for each logLvl when given config & filename`, function() {
            expect(logger).to.exist;
            expect(logger).to.be.a(`function`);
            [`silly`, `verbose`, `debug`, `info`, `warn`, `error`, `wtf`].forEach(methodName => {
                expect(logger).to.have.property(methodName);
            });
        });

        it(`writes to terminal, including a tag w/ filename received by constructor`, function() {
            const storeWarnErrorLogs = [];

            // Stub console.log and most of console's internals
            const output = stdout.inspectSync(function() {
                // Override console warn and console error
                const warnOrig = console.warn;
                const errorOrig = console.error;
                console.warn = (...msgs) => storeWarnErrorLogs.push(msgs);
                console.error = (...msgs) => storeWarnErrorLogs.push(msgs);

                // Log using the library, with the console fully stubbed
                logger.silly(`testOutputSilly`);
                logger.verbose(`testOutputVerbose`);
                logger.debug(`testOutputDebug`);
                logger.info(`testOutputInfo`);
                logger.warn(`testOutputWarn`);
                logger.error(`testOutputError`);
                logger.wtf(`testOutputWtf`);

                // Restore the remaining console methods
                console.warn = warnOrig;
                console.error = errorOrig;
            });

            // Test against the text intended for the terminal (but captured by the stub)
            output.forEach(out => {
                if (isVerbose) console.log(`HERE :: out:`, out);
                expect(out).to.match(/mad\-logs\.test/);
            });

            expect(!!output[0].match(/testOutputSilly/)).to.be.true;
            expect(!!output[1].match(/testOutputVerbose/)).to.be.true;
            expect(!!output[2].match(/testOutputDebug/)).to.be.true;
            expect(!!output[3].match(/testOutputInfo/)).to.be.true;

            if (isVerbose) console.log(`[0] storeWarnErrorLogs:`, storeWarnErrorLogs);

            // Ensure the console outputs reached console.warn & .error using log methods
            expect(
                storeWarnErrorLogs.some(curLog =>
                    curLog.some(lBit => {
                        if (isVerbose) console.log(`[1] storeWarnErrorLogs --> lBit:`, lBit);
                        return lBit === `testOutputWarn`;
                    })
                )
            ).to.be.true;
            expect(
                storeWarnErrorLogs.some(curLog =>
                    curLog.some(lBit => {
                        if (isVerbose) console.log(`[2] storeWarnErrorLogs --> lBit:`, lBit);
                        return lBit === `testOutputError`;
                    })
                )
            ).to.be.true;
            expect(
                storeWarnErrorLogs.some(curLog =>
                    curLog.some(lBit => {
                        if (isVerbose) console.log(`[3] storeWarnErrorLogs --> lBit:`, lBit);
                        return lBit === `testOutputWtf`;
                    })
                )
            ).to.be.true;
        });

        it(`All log instance methods return last arg given, when 1 args provided`, function() {
            expect(logger.silly(`omnomnom`)).to.eql(`omnomnom`);
            expect(logger.verbose(`omnomnom`)).to.eql(`omnomnom`);
            expect(logger.info(`omnomnom`)).to.eql(`omnomnom`);
            expect(logger.warn(`omnomnom`)).to.eql(`omnomnom`);
            expect(logger.error(`omnomnom`)).to.eql(`omnomnom`);
            expect(logger.wtf(`omnomnom`)).to.eql(`omnomnom`);
        });
        it(`All log instance methods return last arg given, when 2 args provided`, function() {
            expect(logger.silly(`tickaTickaBoomTicka`, `BoomTickaBoom`)).to.eql(`BoomTickaBoom`);
            expect(logger.verbose(`tickaTickaBoomTicka`, `BoomTickaBoom`)).to.eql(`BoomTickaBoom`);
            expect(logger.info(`tickaTickaBoomTicka`, `BoomTickaBoom`)).to.eql(`BoomTickaBoom`);
            expect(logger.warn(`tickaTickaBoomTicka`, `BoomTickaBoom`)).to.eql(`BoomTickaBoom`);
            expect(logger.error(`tickaTickaBoomTicka`, `BoomTickaBoom`)).to.eql(`BoomTickaBoom`);
            expect(logger.wtf(`tickaTickaBoomTicka`, `BoomTickaBoom`)).to.eql(`BoomTickaBoom`);
        });
        it(`All log instance methods return last arg given, when 4 args provided`, function() {
            expect(logger.silly(`tingtang`, `wallawalla`, `bing`, `bang`)).to.eql(`bang`);
            expect(logger.verbose(`tingtang`, `wallawalla`, `bing`, `bang`)).to.eql(`bang`);
            expect(logger.info(`tingtang`, `wallawalla`, `bing`, `bang`)).to.eql(`bang`);
            expect(logger.warn(`tingtang`, `wallawalla`, `bing`, `bang`)).to.eql(`bang`);
            expect(logger.error(`tingtang`, `wallawalla`, `bing`, `bang`)).to.eql(`bang`);
            expect(logger.wtf(`tingtang`, `wallawalla`, `bing`, `bang`)).to.eql(`bang`);
        });
    });
});

describe(`Styles`, function() {
    const styles = [
        `lakeLouise`,
        `farmerBrown`,
        `escherBarbieLego`,
        `smokeyHatesChristmas`,
        `barbells`,
        `angryBird`,
        `zebra`,
        `vendetta`,
        `moProblems`,
        `theHeist`,
        `vendetta`,
        `rockIsDead`,
        `mechanicalAtFists`,
        `nightmare`,
        `tangerines`,
        `maceWindu`,
        `grasslands`,
        `default`,
        `cartoonSwearing`,
        `backAndForth`,
    ];

    // tslint:disable
    const stylesWMatch = [
        {
            name: `arrow`,
            outMatch: />>--\[mad\-logs\.test\.ts\]-->.* Should be logged/,
        },
        {
            name: `brainwave`,
            outMatch: /~\^~\^~\[mad\-logs\.test\.ts\]~\^~\^~.* Should be logged\n/,
        },
        {
            name: `checkmate`,
            outMatch: /♜ ♞ ♝ ♚ ♛ mad\-logs\.test\.ts ♛ ♚ ♝ ♞ ♜.* Should be logged/,
        },
        {
            name: `hotPursuit`,
            outMatch: /🍯 🐻  mad\-logs\.test\.ts 🐝 🐝.* Should be logged/,
        },
        {
            name: `pipeDream`,
            outMatch: /┣╋━╋~🛀  mad\-logs\.test\.ts 🛀~╋━╋┫.* Should be logged/,
        },
    ];
    // tslint:enable

    it(`exists`, function() {
        expect(Styles).to.exist;
    });

    it(`has over 20 defined styles`, function() {
        expect(Object.keys(Styles)).to.have.length.above(20);
    });

    it(`only contains objects with keys tagPrefix, tagSuffix, and style`, function() {
        Object.keys(madLogMarkers).forEach(markerKey => {
            const curLogMarker = madLogMarkers[markerKey];
            expect(curLogMarker.tagPrefix).to.be.a(`string`);
            expect(curLogMarker.tagSuffix).to.be.a(`string`);
            expect(curLogMarker.style).to.be.a(`string`);
        });
    });

    // Ensure expected styles included [non-exhaustive]
    styles.forEach(style => {
        it(`includes style ${style}`, function() {
            expect(Object.keys(madLogMarkers)).to.contain(style);
        });
    });

    // Example style test (ensures styles work)
    it(`includes style 'arrow', which includes prefix >>-- and suffix ---|>`, function() {
        expect(madLogMarkers.arrow).to.exist;
        expect(madLogMarkers.arrow.tagPrefix).to.match(/>>--/);
        expect(madLogMarkers.arrow.tagSuffix).to.match(/--|>/);
    });

    // Another example to include style with emojis
    it(`includes style 'rockIsDead', which includes 💀☠🎸💀💎💀, 💃💃💃🎧😃, etc.`, function() {
        expect(madLogMarkers.rockIsDead).to.exist;
        expect(madLogMarkers.rockIsDead.tagPrefix).to.match(/💀☠🎸💀💎💀🎸💀 \|/);
        expect(madLogMarkers.rockIsDead.tagSuffix).to.match(/\| 😃🔊♪♪💃💃💃💃💃🎧😃/);
    });

    // Ensure expected styles included & give expected output when used in a log [non-exhaustive]
    stylesWMatch.forEach(style => {
        const logger = logFactory(`mad-logs.test.ts`, Styles[style.name]);

        it(`has style ${style.name}, w/ output matching ${style.outMatch.toString()}`, function() {
            // Stub console.log and most of console's internals
            const output = stdout.inspectSync(function() {
                logger(`Should be logged`);
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

    styleTester(`arrow`, `>>--[ & ]-->`, [], [/>>--\[mad\-logs\.test\.ts\]-->.* Should be logged/]);

    styleTester(
        `escherBarbieLego`,
        `||┗┛┏┓ & ┏┓┗┛|| (and various styles)`,
        [],
        [/\|\|┗┛┏┓  mad\-logs\.test\.ts  ┏┓┗┛\|\|.* Should be logged/] // tslint:disable-line
    );

    styleTester(`kingRageBlock`, `👁‍🗨🗣🗯 - and various styles in browser`, [
        `👁‍🗨 🗣 🗯 `,
        `👁‍🗨 🗣 🗯`,
    ]);

    styleTester(
        `mrsPotatoVHS`,
        `👃 👁 👂, 👂 👁 👅 - & various styles in browser (including ultra-thick black border)`,
        [`👃 👁 👂`, `👂 👁 👅`]
    );
});

/****************************************** VISUAL TESTS ******************************************/
describe(`Isomorphic styles (visual tests of output in Node)`, function() {
    visualTestIsoStyle(`none`);
    visualTestIsoStyle(`angryBird`);
    visualTestIsoStyle(`aquarium`);
    visualTestIsoStyle(`arrow`);
    visualTestIsoStyle(`backAndForth`);
    visualTestIsoStyle(`barbells`);
    visualTestIsoStyle(`bracelet`);
    visualTestIsoStyle(`brainwave`);
    visualTestIsoStyle(`checkmate`);
    visualTestIsoStyle(`cartoonSwearing`);
    visualTestIsoStyle(`cult`);
    visualTestIsoStyle(`cantTouch`);
    visualTestIsoStyle(`default`);
    visualTestIsoStyle(`dirtRoad`);
    visualTestIsoStyle(`escherBarbieLego`);
    visualTestIsoStyle(`farmerBrown`);
    visualTestIsoStyle(`fountain`);
    visualTestIsoStyle(`fresh`);
    visualTestIsoStyle(`grasslands`);
    visualTestIsoStyle(`hatBlock`);
    visualTestIsoStyle(`hotPursuit`);
    visualTestIsoStyle(`joy`);
    visualTestIsoStyle(`kingRageBlock`);
    visualTestIsoStyle(`lakeLouise`);
    visualTestIsoStyle(`lucky`);
    visualTestIsoStyle(`maceWindu`);
    visualTestIsoStyle(`mechanicalAtFists`);
    visualTestIsoStyle(`moProblems`);
    visualTestIsoStyle(`mrsPotatoVHS`);
    visualTestIsoStyle(`neverEnough`);
    visualTestIsoStyle(`ohMy`);
    visualTestIsoStyle(`nightmare`);
    visualTestIsoStyle(`pipeDream`);
    visualTestIsoStyle(`potOfGold`);
    visualTestIsoStyle(`probeArcade`);
    visualTestIsoStyle(`rainbowLeaf`);
    visualTestIsoStyle(`rockIsDead`);
    visualTestIsoStyle(`seafoamSalad`);
    visualTestIsoStyle(`smokeyHatesChristmas`);
    visualTestIsoStyle(`springy`);
    visualTestIsoStyle(`swimmers`);
    visualTestIsoStyle(`tangerines`);
    visualTestIsoStyle(`theBird`);
    visualTestIsoStyle(`theHeist`);
    visualTestIsoStyle(`vendetta`);
    visualTestIsoStyle(`xmlHell`);
    visualTestIsoStyle(`zebra`);
});
