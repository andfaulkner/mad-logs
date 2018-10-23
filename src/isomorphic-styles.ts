import {madLogMarkers} from './theming';

import * as isNode from 'detect-node';

const cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';
const rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];

/**
 * Collection of atomic styles that can be used in both the browser and the cli
 */
// prettier-ignore
export const isomorphicStyles = {
    default: {
        cli:     '\u001b[49m\u001b[0m',
        browser: 'color: black; background-color: white;'
    },

    // Colors
    black:         {cli: '\u001b[30m', browser: 'color: #333'                 },
    blue:          {cli: '\u001b[34m', browser: 'color: #3498db'              },
    cyan:          {cli: '\u001b[36m', browser: 'color: #00FFFF'              },
    gray:          {cli: '\u001b[90m', browser: 'color: #7f8c8d'              },
    grey:          {cli: '\u001b[90m', browser: 'color: #7f8c8d'              },
    green:         {cli: '\u001b[32m', browser: 'color: #2ecc71'              },
    magenta:       {cli: '\u001b[35m', browser: 'color: #8e44ad'              },
    red:           {cli: '\u001b[31m', browser: 'color: #e74c3c'              },
    white:         {cli: '\u001b[37m', browser: 'color: #fff'                 },
    yellow:        {cli: '\u001b[33m', browser: 'color: #f1c40f'              },

    // Background colors
    bgBlack:       {cli: '\u001b[40m', browser: 'background-color: #333'      },
    bgBlue:        {cli: '\u001b[44m', browser: 'background-color: #3498db'   },
    bgCyan:        {cli: '\u001b[46m', browser: 'background-color: #00ffff'   },
    bgGray:        {cli: '\u001b[47m', browser: 'background-color: #7f8c8d'   },
    bgGrey:        {cli: '\u001b[47m', browser: 'background-color: #7f8c8d'   },
    bgGreen:       {cli: '\u001b[42m', browser: 'background-color: #2ecc71'   },
    bgMagenta:     {cli: '\u001b[45m', browser: 'background-color: #8e44ad'   },
    bgRed:         {cli: '\u001b[41m', browser: 'background-color: #e74c3c'   },
    bgWhite:       {cli: '\u001b[47m', browser: 'background-color: #fff'      },
    bgYellow:      {cli: '\u001b[43m', browser: 'background-color: #f1c40f'   },

    // Misc style settings
    blink:         {cli: '\u001b[5m', browser: 'text-decoration: blink'       },
    bold:          {cli: '\u001b[1m', browser: 'font-weight: bold'            },
    dim:           {cli: '\u001b[2m', browser: 'opacity: .8'                  },
    hidden:        {cli: '\u001b[8m', browser: 'visibility: hidden'           },
    inverse:       {cli: '\u001b[7m', browser: cssInverse                     },
    italic:        {cli: '\u001b[3m', browser: 'font-style: italic'           },
    strikethrough: {cli: '\u001b[9m', browser: 'text-decoration: line-through'},
    underline:     {cli: '\u001b[4m', browser: 'text-decoration: underline'   },
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
    underline : (str: string): string => `\u001b[4m${str}\u001b[0m`,
    italic    : (str: string): string => `\u001b[3m${str}\u001b[0m`,
    rainbow   : (str: string) =>
        str
            .split('')
            .map(
                (char, idx) =>
                    char === ' '
                        ? char
                        : node.bold(
                            node.bgBlack(node[rainbowColors[idx++ % rainbowColors.length]](char))
                        )
            )
            .join(''),
};

export interface LogOpts {
    tagPrefix: string;
    tagSuffix: string;
    style: string;
}

/**
 * Build the file tag, including styling and %c prefix
 * Example: `%c🔨⏰[load-message.tsx]⏰🔨`
 */
function buildFileTag(fName: string, opts: LogOpts): string {
    return isNode
        ? `${opts.tagPrefix}${fName}${opts.tagSuffix}`
        : `${opts.style ? '%c' : ''}${opts.tagPrefix}[${fName}]${opts.tagSuffix}`;
}

// Extract colours
const {bgBlack, bgBlue, bgCyan, bgGreen, bgMagenta, bgRed, bgWhite, bgYellow} = node;
const {black, blue, cyan, green, magenta, red, white, yellow, gray} = node;
const {underline, bold, italic, rainbow} = node;

/********************************************* STYLES *********************************************/
const none = isNode
    ? (fName: string) => `[${fName}] `
    : (fName: string) => [
          buildFileTag(fName, {tagPrefix: '[', tagSuffix: ']  ', style: ``}),
          madLogMarkers.aquarium.style,
      ];

const angryBird = isNode
    ? (fName: string) => bgYellow(black(`🐥 [${fName}]🐥 `)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.angryBird),
          madLogMarkers.angryBird.style,
      ];

const aquarium = isNode
    ? (fName: string) => bgBlue(white(bold(`🐠 🐙 [${fName}]🐙 🐠 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.aquarium),
          madLogMarkers.aquarium.style,
      ];

const arrow = isNode
    ? (fName: string) => gray(bold(bgWhite(`>>--[${fName}]-->`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.arrow),
          madLogMarkers.arrow.style,
      ];

const backAndForth = isNode
    ? (fName: string) => black(bold(bgWhite(`))><(( [${fName}] ))><((`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.backAndForth),
          madLogMarkers.backAndForth.style,
      ];

const barbells = isNode
    ? (fName: string) => underline(bold(bgBlack(white(`|-()-()-[ ${fName} ]-()-()-|`)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.barbells),
          madLogMarkers.barbells.style,
      ];

const bracelet = isNode
    ? (fName: string) => bold(bgMagenta(cyan(`⌚ [${fName}]⌚ `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.bracelet),
          madLogMarkers.bracelet.style,
      ];

const brainwave = isNode
    ? (fName: string) => bold(bgBlue(cyan(`~^~^~[${fName}]~^~^~`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.brainwave),
          madLogMarkers.brainwave.style,
      ];

const cantTouch = isNode
    ? (fName: string) => bold(bgCyan(white(`✋ 🔨 ⏰ [${fName}]✋ 🔨 ⏰ `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.cantTouch),
          madLogMarkers.cantTouch.style,
      ];

const cartoonSwearing = isNode
    ? (fName: string) => underline(bgCyan(red(`@%@%! [${fName}] !@%@%`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.cartoonSwearing),
          madLogMarkers.cartoonSwearing.style,
      ];

const checkmate = isNode
    ? (fName: string) => bgYellow(black(`♜ ♞ ♝ ♚ ♛ [${fName}]♛ ♚ ♝ ♞ ♜ `)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.checkmate),
          madLogMarkers.checkmate.style,
      ];

const cult = isNode
    ? (fName: string) => bold(bgRed(cyan(`👨‍👨‍👧‍👦 👪  [${fName}] 👪 👨‍👨‍👧‍👦 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.cult),
          madLogMarkers.cult.style,
      ];

const dirtRoad = isNode
    ? (fName: string) => bold(bgCyan(white(`= = [${fName}] = =`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.dirtRoad),
          madLogMarkers.dirtRoad.style,
      ];

const escherBarbieLego = isNode
    ? (fName: string) => bgMagenta(black(`||┗┛┏┓ [${fName}] ┏┓┗┛||`)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.escherBarbieLego),
          madLogMarkers.escherBarbieLego.style,
      ];

const farmerBrown = isNode
    ? (fName: string) => bold(white(bgGreen(`🐑 🐂 [${fName}]🐂 🐑 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.farmerBrown),
          madLogMarkers.farmerBrown.style,
      ];

const fresh = isNode
    ? (fName: string) => white(bgMagenta(`📖 👶 >👵 🔄  ${fName} ⌛ 💺 ⬅️ 👑 🔔 💨 `)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.fresh),
          madLogMarkers.fresh.style,
      ];

const grasslands = isNode
    ? (fName: string) => black(bgGreen(`^^^[${fName}]^^^`)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.grasslands),
          madLogMarkers.grasslands.style,
      ];

const hatBlock = isNode
    ? (fName: string) => bgCyan(black(`🎩  [${fName}] 🎩 `)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.hatBlock),
          madLogMarkers.hatBlock.style,
      ];

const hotPursuit = isNode
    ? (fName: string) => bgRed(white(bold(`🍯 🐻 [${fName}]🐝 🐝 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.hotPursuit),
          madLogMarkers.hotPursuit.style,
      ];

const joy = isNode
    ? (fName: string) => bgYellow(black(`😀 😀 [${fName}]😀 😀 `)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.joy),
          madLogMarkers.joy.style,
      ];

const kingRageBlock = isNode
    ? (fName: string) => bgRed(white(bold(`👁‍🗨 🗣 🗯 [${fName}]👁‍🗨 🗣 🗯 `))) + '  '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.kingRageBlock),
          madLogMarkers.kingRageBlock.style,
      ];

const lakeLouise = isNode
    ? (fName: string) => bgCyan(white(bold(`🏞️  [${fName}] 🏞️ `))) + '  '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.lakeLouise),
          madLogMarkers.lakeLouise.style,
      ];

const lucky = isNode
    ? (fName: string) => bold(white(bgGreen(`🍀 [${fName}]🍀 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.lucky),
          madLogMarkers.lucky.style,
      ];

const maceWindu = isNode
    ? (fName: string) => bold(white(bgMagenta(`o==[${fName}]::::::::::::::::>`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.maceWindu),
          madLogMarkers.maceWindu.style,
      ];

const mechanicalAtFists = isNode
    ? (fName: string) => bold(black(bgWhite(`--#@[${fName}]@#--`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.mechanicalAtFists),
          madLogMarkers.mechanicalAtFists.style,
      ];

const moProblems = isNode
    ? (fName: string) => bold(black(bgWhite(`💰 [${fName}] 💰 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.moProblems),
          madLogMarkers.moProblems.style,
      ];

const mrsPotatoVHS = isNode
    ? (fName: string) => underline(black(bgYellow(`👃 👁 👂 ${fName} 👂 👁 👅 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.mrsPotatoVHS),
          madLogMarkers.mrsPotatoVHS.style,
      ];

const neverEnough = isNode
    ? (fName: string) => bold(blue(bgWhite(`🔔 🐮 🔔 [${fName}]🔔 🐮 🔔 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.neverEnough),
          madLogMarkers.neverEnough.style,
      ];

const nightmare = isNode
    ? (fName: string) => bold(white(bgBlack(`>:~ [${fName}] ~:<`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.nightmare),
          madLogMarkers.nightmare.style,
      ];

const ohMy = isNode
    ? (fName: string) => black(bgGreen(`🦁 🐯 🐻  ${fName} 🐻 🐯 🦁 `)) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.ohMy),
          madLogMarkers.ohMy.style,
      ];

const pipeDream = isNode
    ? (fName: string) => bold(bgBlue(white(`┣╋━╋~🛀  ${fName} 🛀~╋━╋┫`))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.pipeDream),
          madLogMarkers.pipeDream.style,
      ];

const potOfGold = isNode
    ? (fName: string) => italic(bold(yellow(bgBlack(`💰  [${fName}] 💰  `)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.potOfGold),
          madLogMarkers.potOfGold.style,
      ];

const probeArcade = isNode
    ? (fName: string) => bold(cyan(bgBlue(`👽  [${fName}] 👽 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.probeArcade),
          madLogMarkers.probeArcade.style,
      ];

const rainbowLeaf = isNode
    ? (fName: string) => '🌈  ' + rainbow(`[${fName}]`) + ' 🌈  '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.rainbowLeaf),
          madLogMarkers.rainbowLeaf.style,
      ];

const rockIsDead = isNode
    ? (fName: string) => bold(bgBlack(magenta(`🎸  [${fName}] 🎸  `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.rockIsDead),
          madLogMarkers.rockIsDead.style,
      ];

const seafoamSalad = isNode
    ? (fName: string) => bold(white(bgGreen(`🍓  ${fName} 🍅 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.seafoamSalad),
          madLogMarkers.seafoamSalad.style,
      ];

const smokeyHatesChristmas = isNode
    ? (fName: string) => white(bold(bgGreen(`🎄 🔥 [${fName}]🔥 🎄 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.smokeyHatesChristmas),
          madLogMarkers.smokeyHatesChristmas.style,
      ];

const springy = isNode
    ? (fName: string) => underline(bold(white(`⚙️  [${fName}] ⚙️ `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.springy),
          madLogMarkers.springy.style,
      ];

const swimmers = isNode
    ? (fName: string) => underline(bold(bgWhite(blue(`~~[${fName}]~~@`)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.swimmers),
          madLogMarkers.swimmers.style,
      ];

const tangerines = isNode
    ? (fName: string) => '🍊  ' + rainbow(`[${fName}]`) + ' 🍊  '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.tangerines),
          madLogMarkers.tangerines.style,
      ];

const theBird = isNode
    ? (fName: string) => white(bold(bgMagenta(`🖕🏼 [${fName}]🖕🏼 `))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.theBird),
          madLogMarkers.theBird.style,
      ];

const theHeist = isNode
    ? (fName: string) => underline(bold(white(bgBlack(`[${fName}]`)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.theHeist),
          madLogMarkers.theHeist.style,
      ];

const vendetta = isNode
    ? (fName: string) => underline(bold(white(bgRed(`[${fName}]`)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.vendetta),
          madLogMarkers.vendetta.style,
      ];

const xmlHell = isNode
    ? (fName: string) => underline(bold(white(bgBlack(`<<< ${fName} >>>`)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.xmlHell),
          madLogMarkers.xmlHell.style,
      ];

const zebra = isNode
    ? (fName: string) => underline(bold(white(bgBlack(`| | | ${fName} | | |`)))) + ' '
    : (fName: string) => [
          buildFileTag(fName, madLogMarkers.zebra),
          madLogMarkers.zebra.style,
      ];

/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
export const isoStyles = {
    none,
    angryBird,
    aquarium,
    arrow,
    backAndForth,
    barbells,
    bracelet,
    brainwave,
    cantTouch,
    cartoonSwearing,
    checkmate,
    cult,
    default: none,
    dirtRoad,
    escherBarbieLego,
    farmerBrown,
    fresh,
    grasslands,
    hatBlock,
    hotPursuit,
    joy,
    kingRageBlock,
    lakeLouise,
    lucky,
    maceWindu,
    mechanicalAtFists,
    moProblems,
    mrsPotatoVHS,
    neverEnough,
    nightmare,
    pipeDream,
    ohMy,
    potOfGold,
    probeArcade,
    rainbowLeaf,
    rockIsDead,
    seafoamSalad,
    smokeyHatesChristmas,
    springy,
    swimmers,
    tangerines,
    theBird,
    theHeist,
    vendetta,
    xmlHell,
    zebra,
};

export {node as nodeStyling};
