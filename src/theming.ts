import isNode from 'detect-node';
import { isomorphicStyles as isoStyles } from './isomorphic-styles';

/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
export const colours = {
    violet:           '#551A8B',
    orange:           '#EE7600',
    brown:            '#593001',
    maroon:           '#5d0000',
    blue:             '#0000FF',
    lightBlue:        '#add8e6',
    darkMidnightBlue: '#003366',
    deepRed:          '#800000',
    yellow:           'yellow',
    orangeBasic:      'orange',
    yellowishGold:    '#E5C100',
    gold:             '#FFD700',
    darkGray:         '#818181',
    hotPink:          '#FF69B4',
    tan:              '#C4AEAD',
    white:            '#FFFFFF',
    indigo:           '#4B0082',
    green:            '#00FF00',
    darkGreen:        '#004000',
    gray:             '#777777',
    cyan:             '#00FFFF',
    black:            '#000000',
    ultraPaleGreen:   '#f0fff0',
};

export const style = {
    bold:      'font-weight: bold;',
    underline: 'text-decoration: underline;',
};


/************************************************************************************************
 *
 *   Collection of predefined styles for differentiating logs between separate files. Values are
 *   intended for by the logFactory, to apply a theme to a specific logger object.
 *
 *   -   tagPrefix:     string to show to left of module name in log output
 *   -   tagSuffix:     string to show to right of module name, but before the message
 *   -   style:         string of CSS style directives separated by ;s. Used to style the
 *                      tag (i.e. ${tagPrefix}${filename}${tagSuffix}) beside each log.
 *
 * @example logFactory()('my-cool-file', madLogMarkers.cartoonSwearing)
 * @example logFactory()('my-cool-file', madLogMarkers.vendetta)
 *
 */
export const madLogMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: (isNode) ? `${isoStyles.black}${isoStyles.bgYellow}${isoStyles.bold}`
                        : `color: ${colours.yellowishGold};`,
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: (isNode) ? `${isoStyles.black}${isoStyles.bold}${isoStyles.underline}`
                        : `color: ${colours.brown}; ${style.bold} ${style.underline}`,
    },
    barbells: {
        tagSuffix: '--()-()',
        tagPrefix: '()-()--',
        style: (isNode) ? `${isoStyles.gray}${isoStyles.bgWhite}${isoStyles.bold}`
                        : `color: ${colours.darkGray}; ${style.bold}`,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: (isNode) ? `${isoStyles.blue}${isoStyles.bgWhite}`
                        : `color: ${colours.darkMidnightBlue};`,
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: (isNode) ? `${isoStyles.magenta}${isoStyles.bold}`
                        : `color: ${colours.indigo};`,
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_ [',
        tagSuffix: '] _♟♟♟♟♟♟♟♟',
        style: (isNode) ? `${isoStyles.black}${isoStyles.bgWhite}`
                        : `color: ${colours.brown};`,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: (isNode) ? `${isoStyles.black}${isoStyles.bgWhite}`
                        : `color: ${colours.darkGreen};`,
    },
    dirtRoad: {
        tagSuffix: '= = = =',
        tagPrefix: '= = = =',
        style: (isNode) ? `${isoStyles.bgGray}${isoStyles.yellow}${isoStyles.bold}`
                        : `color:          ${colours.tan};
                           ${style.bold}
                           border-top:     1px inset ${colours.tan};
                           border-bottom:  1px inset ${colours.tan};
                           border-color:   ${colours.tan};
                           padding-top:    2px;
                           padding-bottom: 2px;
                           margin-top:     2px;
                           margin-bottom:  2px;`,
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        style: (isNode) ? `${isoStyles.bgWhite}${isoStyles.magenta}`
                        : `color: ${colours.white}; background-color: ${colours.hotPink};`,
    },
    farmerBrown: {
        tagPrefix: '[🐑🐂🐑]-',
        tagSuffix: '-[🐑🐂🐑] ',
        style: '',
    },
    grasslands: {
        tagSuffix: '^^^^',
        tagPrefix: '^^^^',
        style: `color: ${colours.green}; ${style.bold};`,
    },
    hotPursuit: {
        tagPrefix: '🎄🎄 !🍯🐻---🎄!🐝🐝--- [',
        tagSuffix: '] !🐝🐝🐝🐝--- 🎄🎄',
        style: (isNode) ? `${isoStyles.black}${isoStyles.bgYellow}`
                        : `color: ${colours.black}; background-color: ${colours.orangeBasic};`,
    },
    lakeLouise: {
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        style: `color: ${colours.cyan};`,
    },
    lispyKatana: {
        tagSuffix: ';;;;;;;;;;;;;;()()',
        tagPrefix: '',
        style: `color: ${colours.gray}; ${style.bold};`,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        style: `color: ${colours.violet}; ${style.bold};`,
    },
    mechanicalAtFists: {
        tagPrefix: '--#@!@#--',
        tagSuffix: ' || ',
        style: `color: ${colours.indigo};`,
    },
    moProblems: {
        tagPrefix: '$$$$$$$ |💰| ',
        tagSuffix: ' |💰| $$$$$$$',
        style: `color: ${colours.gold}; ${style.bold};`,
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        style: `color: ${colours.white}; background-color: ${colours.black};`,
    },
    rockIsDead: {
        tagPrefix: '💀☠🎸💀💎💀🎸💀 |',
        tagSuffix: '| 😃🔊♪♪💃💃💃💃💃🎧😃',
        style: (isNode) ? `${isoStyles.yellow}${isoStyles.bold}${isoStyles.bgBlack}`
                        : `color: ${colours.yellow}; background-color: ${colours.black};`,
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        style: `color: ${colours.blue}; ${style.bold};`,
    },
    smokeyHatesChristmas: {
        tagPrefix: '🔥🎄🔥🎄🔥🎄🔥|',
        tagSuffix: '|🔥🎄🔥🎄🔥🎄🔥',
        style: (isNode) ? `${isoStyles.green}${isoStyles.bold}${isoStyles.bgWhite}`
                        : `color: ${colours.orange}; ${style.underline}; ${style.bold};`,
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        style: (isNode) ? `${isoStyles.blue}${isoStyles.bgWhite}`
                        : `color: ${colours.blue}; background-color: ${colours.white};`,
    },
    tangerines: {
        tagPrefix: 'o(o)(){o}()@(o)OO@(){O}() _ ',
        tagSuffix: ' _ ()()()*()',
        style: `color: ${colours.orange};`,
    },
    theHeist: {
        tagPrefix: "🚚==|💰😰🔫😎|_",
        tagSuffix: "_|😎🔧🔒|📦",
        style: (isNode) ? `${isoStyles.black}${isoStyles.bold}${isoStyles.bgWhite}`
                        : `color: ${colours.white}; ${style.underline}; ` +
                          `background-color: ${colours.black}; ${style.bold};`
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        style: `color: ${colours.deepRed}; ` +
               `${style.bold} background-color: ${colours.ultraPaleGreen}`,
    },
    xmlHell: {
        tagPrefix: '<<<<<>>>>>',
        tagSuffix: ' >> ',
        style: '',
    },
    zebra: {
        tagPrefix: '| | | | |',
        tagSuffix: '| | | | |',
        style: (isNode) ? `${isoStyles.white}${isoStyles.bgBlack}`
                        : `color: ${colours.white}; background-color: ${colours.black};`
    }
};

// TODO - WIP
export const saneLogMarkers = {
    tagPrefix: `${isoStyles.blue.cli}${isoStyles.bgWhite.cli}`,
    tagSuffix: `${isoStyles.default}${isoStyles.default}`,
    blueOnWhite: (isoStyles.blue.cli + isoStyles.bgWhite.cli),
};

export const logMarkers = Object.assign({}, madLogMarkers/*, saneLogMarkers*/);

// '🌪⚡🌬 🔥🌤🌩🌟☔🌈☂🌦🌨⛄✨🎋🎍🌋💣💣💣🗡⚔🔫💧❄☃☄🌊
// 🚚 🔒|🔐  🔒 🔓 🗝 🏦 💣 💳 📦 💼 🔦 🔧 🔨 🔩 🔪 🔫

