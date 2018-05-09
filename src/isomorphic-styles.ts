import {madLogMarkers} from './theming';

import * as isNode from 'detect-node';

const cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';

/**
 * @export
 * Collection of atomic styles that can be used in both the browser and the cli.
 */
// prettier-ignore
export const isomorphicStyles = {
    default: {
        cli:     '\u001b[49m\u001b[0m',
        browser: 'color: black; background-color: white;'
    },

    // Colors
    black:         { cli: '\u001b[30m', browser: 'color: #333'                  },
    blue:          { cli: '\u001b[34m', browser: 'color: #3498db'               },
    cyan:          { cli: '\u001b[36m', browser: 'color: #00FFFF'               },
    gray:          { cli: '\u001b[90m', browser: 'color: #7f8c8d'               },
    grey:          { cli: '\u001b[90m', browser: 'color: #7f8c8d'               },
    green:         { cli: '\u001b[32m', browser: 'color: #2ecc71'               },
    magenta:       { cli: '\u001b[35m', browser: 'color: #8e44ad'               },
    red:           { cli: '\u001b[31m', browser: 'color: #e74c3c'               },
    white:         { cli: '\u001b[37m', browser: 'color: #fff'                  },
    yellow:        { cli: '\u001b[33m', browser: 'color: #f1c40f'               },

    // Background colors
    bgBlack:       { cli: '\u001b[40m', browser: 'background-color: #333'       },
    bgBlue:        { cli: '\u001b[44m', browser: 'background-color: #3498db'    },
    bgCyan:        { cli: '\u001b[46m', browser: 'background-color: #00ffff'    },
    bgGray:        { cli: '\u001b[47m', browser: 'background-color: #7f8c8d'    },
    bgGrey:        { cli: '\u001b[47m', browser: 'background-color: #7f8c8d'    },
    bgGreen:       { cli: '\u001b[42m', browser: 'background-color: #2ecc71'    },
    bgMagenta:     { cli: '\u001b[45m', browser: 'background-color: #8e44ad'    },
    bgRed:         { cli: '\u001b[41m', browser: 'background-color: #e74c3c'    },
    bgWhite:       { cli: '\u001b[47m', browser: 'background-color: #fff'       },
    bgYellow:      { cli: '\u001b[43m', browser: 'background-color: #f1c40f'    },

    // Misc style settings
    blink:         { cli: '\u001b[5m', browser: 'text-decoration: blink'        },
    bold:          { cli: '\u001b[1m', browser: 'font-weight: bold'             },
    dim:           { cli: '\u001b[2m', browser: 'opacity: .8'                   },
    hidden:        { cli: '\u001b[8m', browser: 'visibility: hidden'            },
    inverse:       { cli: '\u001b[7m', browser: cssInverse                      },
    italic:        { cli: '\u001b[3m', browser: 'font-style: italic'            },
    strikethrough: { cli: '\u001b[9m', browser: 'text-decoration: line-through' },
    underline:     { cli: '\u001b[4m', browser: 'text-decoration: underline'    },
};

/****************************************** NODE STYLES *******************************************/
// prettier-ignore
const node = {
    black     : (str: string): string => `\u001b[30m${str}\u001b[0m`,
    red       : (str: string): string => `\u001b[31m${str}\u001b[0m`,
    green     : (str: string): string => `\u001b[32m${str}\u001b[0m`,
    yellow    : (str: string): string => `\u001b[33m${str}\u001b[0m`,
    blue      : (str: string): string => `\u001b[34m${str}\u001b[0m`,
    magenta   : (str: string): string => `\u001b[35m${str}\u001b[0m`,
    cyan      : (str: string): string => `\u001b[36m${str}\u001b[0m`,
    white     : (str: string): string => `\u001b[37m${str}\u001b[0m`,
    gray      : (str: string): string => `\u001b[90m${str}\u001b[0m`,

    bgBlack   : (str: string): string => `\u001b[40m${str}\u001b[0m`,
    bgRed     : (str: string): string => `\u001b[41m${str}\u001b[0m`,
    bgGreen   : (str: string): string => `\u001b[42m${str}\u001b[0m`,
    bgYellow  : (str: string): string => `\u001b[43m${str}\u001b[0m`,
    bgBlue    : (str: string): string => `\u001b[44m${str}\u001b[0m`,
    bgMagenta : (str: string): string => `\u001b[45m${str}\u001b[0m`,
    bgCyan    : (str: string): string => `\u001b[46m${str}\u001b[0m`,
    bgWhite   : (str: string): string => `\u001b[47m${str}\u001b[0m`,

    bold      : (str: string): string => `\u001b[1m${str}\u001b[0m`,
    underline : (str: string): string => `\u001b[2m${str}\u001b[0m`,
    italic    : (str: string): string => `\u001b[3m${str}\u001b[0m`,
};

export interface LogOpts {
    tagPrefix: string;
    tagSuffix: string;
    style: string;
}

function buildFileTagForBrowser(fName: string, opts: LogOpts): string {
    return isNode
        ? `${opts.tagPrefix}${fName}${opts.tagSuffix}`
        : `${opts.style ? '%c' : ''}${opts.tagPrefix}[${fName}]${opts.tagSuffix} ;`;
}

// Extract colours
const {bgBlack, bgBlue, bgCyan, bgGreen, bgMagenta, bgRed, bgWhite, bgYellow} = node;
const {black, blue, cyan, green, magenta, red, white, yellow, gray} = node;
const {underline, bold, italic} = node;

// node.blue(node.bgWhite(`[${fName}]`)
// bold(white(bgMagenta

/********************************************* STYLES *********************************************/
const none = isNode
    ? (fName: string) => `[${fName}]`
    : (fName: string) => [
          buildFileTagForBrowser(fName, {tagPrefix: '[', tagSuffix: ']  ', style: ``}),
          madLogMarkers.aquarium.style,
      ];

const aquarium = isNode
    ? (fName: string) => bgBlue(white(bold(`[${fName}]`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.aquarium),
          madLogMarkers.aquarium.style,
      ];

const angryBird = isNode
    ? (fName: string) => bgYellow(black(`[${fName}]`))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.angryBird),
          madLogMarkers.angryBird.style,
      ];

const arrow = isNode
    ? (fName: string) => gray(bold(bgWhite(`--[${fName}]-->`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.arrow),
          madLogMarkers.arrow.style,
      ];

const backAndForth = isNode
    ? (fName: string) => black(bold(bgWhite(`))><(( [${fName}] ))><((`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.backAndForth),
          madLogMarkers.backAndForth.style,
      ];

const bracelet = isNode
    ? (fName: string) => bold(bgMagenta(cyan(`[${fName}]`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.bracelet),
          madLogMarkers.bracelet.style,
      ];

const cult = isNode
    ? (fName: string) => bgWhite(black(`[${fName}]`))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.cult),
          madLogMarkers.cult.style,
      ];

const escherBarbieLego = isNode
    ? (fName: string) => bgMagenta(black(`||┗┛┏┓ [${fName}] ┏┓┗┛||`))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.escherBarbieLego),
          madLogMarkers.escherBarbieLego.style,
      ];

const hatBlock = isNode
    ? (fName: string) => bgCyan(black(` [${fName}] `))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.hatBlock),
          madLogMarkers.hatBlock.style,
      ];

const joy = isNode
    ? (fName: string) => bgYellow(magenta(` [${fName}] `))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.joy),
          madLogMarkers.joy.style,
      ];

const lucky = isNode
    ? (fName: string) => bold(white(bgGreen(`[${fName}]`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.lucky),
          madLogMarkers.lucky.style,
      ];

const maceWindu = isNode
    ? (fName: string) => bold(white(bgMagenta(`o==[${fName}]::::::::::::::::>`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.maceWindu),
          madLogMarkers.maceWindu.style,
      ];

const probeArcade = isNode
    ? (fName: string) => bold(cyan(bgBlue(`[${fName}]`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.probeArcade),
          madLogMarkers.probeArcade.style,
      ];

const potOfGold = isNode
    ? (fName: string) => italic(bold(yellow(bgBlack(`[${fName}]`))))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.potOfGold),
          madLogMarkers.potOfGold.style,
      ];

const rainbowLeaf = isNode
    ? (fName: string) => magenta(bgBlue(`[${fName}]`))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.rainbowLeaf),
          madLogMarkers.rainbowLeaf.style,
      ];

const rockIsDead = isNode
    ? (fName: string) => bold(bgBlack(magenta(`[${fName}]`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.rockIsDead),
          madLogMarkers.rockIsDead.style,
      ];

const smokeyHatesChristmas = isNode
    ? (fName: string) => underline(bgGreen(white(`[${fName}]`)))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.smokeyHatesChristmas),
          madLogMarkers.smokeyHatesChristmas.style,
      ];

const theHeist = isNode
    ? (fName: string) => underline(bold(white(bgBlack(` [${fName}] `))))
    : (fName: string) => [
          buildFileTagForBrowser(fName, madLogMarkers.theHeist),
          madLogMarkers.theHeist.style,
      ];

/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
// prettier-ignore
export const isoStyles = {
    none,
    aquarium,
    angryBird,
    arrow,
    backAndForth,
    bracelet,
    cult,
    escherBarbieLego,
    hatBlock,
    joy,
    lucky,
    maceWindu,
    probeArcade,
    potOfGold,
    rainbowLeaf,
    rockIsDead,
    smokeyHatesChristmas,
    theHeist,
};

export {node as nodeStyling};
