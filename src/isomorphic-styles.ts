import { madLogMarkers } from './theming';

import * as isNode from 'detect-node';

const cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';

/**
 * @export
 * Collection of atomic styles that can be used in both the browser and the cli.
 */
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

function buildFileTagForBrowser(fileName: string, opts: LogOpts): string {
    return (isNode)
        ? `${opts.tagPrefix}${fileName}${opts.tagSuffix}`
        : `${((opts.style) ? '%c' : '')}${opts.tagPrefix}[${fileName}]${opts.tagSuffix} `;
}

/********************************************* STYLES *********************************************/
const aquarium =
    isNode ? (fileName: string) => node.blue(node.bgWhite(`[${fileName}]`))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.aquarium);

const rainbowLeaf =
    isNode ? (fileName: string) => node.magenta(node.bgBlue(`[${fileName}]`))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.rainbowLeaf);

const lucky =
    isNode ? (fileName: string) => node.bold(node.white(node.bgMagenta(`[${fileName}]`)))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.lucky);

const probeArcade =
    isNode ? (fileName: string) => node.bold(node.cyan(node.bgBlue(`[${fileName}]`)))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.probeArcade);

const potOfGold =
    isNode ? (fileName: string) => node.italic(node.bold(node.yellow(node.bgBlack(`[${fileName}]`))))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.potOfGold);

const cult =
    isNode ? (fileName: string) => node.bgWhite(node.black(`[${fileName}]`))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.cult);

const bracelet =
    isNode ? (fileName: string) => node.bold(node.bgMagenta(node.cyan(`[${fileName}]`)))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.bracelet);

const rockIsDead =
    isNode ? (fileName: string) => node.bold(node.bgBlack(node.magenta(`[${fileName}]`)))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.rockIsDead);

const smokeyHatesChristmas =
    isNode ? (fileName: string) => node.underline(node.bgGreen(node.white(`[${fileName}]`)))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.smokeyHatesChristmas);

const joy =
    isNode ? (fileName: string) => node.bgYellow(node.magenta(` [${fileName}] `))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.joy);

const hatBlock =
    isNode ? (fileName: string) => node.bgCyan(node.black(` [${fileName}] `))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.hatBlock);

const theHeist =
    isNode ? (fileName: string) => node.underline(node.bold(node.white(node.bgBlack(` [${fileName}] `))))
           : (fileName: string) => buildFileTagForBrowser(fileName, madLogMarkers.theHeist);


/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
export const isoStyles = {
    a: aquarium,              aquarium,
    b: rainbowLeaf,           rainbowLeaf,
    c: lucky,                 lucky,
    d: probeArcade,           probeArcade,
    e: potOfGold,             potOfGold,
    f: cult,                  cult,
    g: bracelet,              bracelet,
    h: rockIsDead,            rockIsDead,
    i: smokeyHatesChristmas,  smokeyHatesChristmas,
    j: joy,                   joy,
    k: hatBlock,              hatBlock,
    l: theHeist,              theHeist,
};

export { node as nodeStyling }
