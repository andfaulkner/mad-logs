import isNode from 'detect-node';
import {isoStyling} from './isomorphic-styling';

/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
// prettier-ignore
export const colours = {
    violet:           '#551A8B',
    orange:           '#EE7600',
    brown:            '#593001',
    maroon:           '#5d0000',
    blue:             '#0000FF',
    lightBlue:        '#add8e6',
    darkMidnightBlue: '#003366',
    midDarkGreen:     'darkgreen',
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
    bold: 'font-weight: bold;',
    underline: 'text-decoration: underline;',
};

/************************************************************************************************
 *
 *   Collection of predefined styles for differentiating logs between separate files
 *   Values are intended for use by logFactory, to apply a theme to a specific logger object
 *
 *   -   tagPrefix: string to show to left of module name in log output
 *   -   tagSuffix: string to show to right of module name, but before the message
 *   -   style:     string of CSS style directives separated by ;s. Used to style the
 *                  tag (i.e. ${tagPrefix}${filename}${tagSuffix}) beside each log
 *
 * @example logFactory()('my-cool-file', madLogMarkers.cartoonSwearing)
 * @example logFactory()('my-cool-file', madLogMarkers.vendetta)
 *
 */
// prettier-ignore
export const madLogMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: isNode ? `${isoStyling.black}${isoStyling.bgYellow}${isoStyling.bold}`
                      : `color: ${colours.yellowishGold}`,
    },
    aquarium: {
        tagPrefix: ' 🐠 🐌 🐌 ',
        tagSuffix: ' 🐠🐠🐠 🐙',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.underline}`
                      : `color: darkblue; background-color: lightblue;
                         font-size: 15px; font-weight:bold;
                         padding: 3px;
                         border-bottom: solid 2px black;
                         border-left: solid 2px black; border-right: solid 2px black;
                         border-radius: 4px;
                         border-top-left-radius: 1px; border-top-right-radius: 1px`,
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.underline}`
                      : `color: ${colours.brown}; ${style.bold} ${style.underline}`,
    },
    barbells: {
        tagPrefix: '()-()--',
        tagSuffix: '--()-()',
        style: isNode ? `${isoStyling.gray}${isoStyling.bgWhite}${isoStyling.bold}`
                      : `color: ${colours.darkGray}; ${style.bold}`,
    },
    bracelet: {
        tagPrefix: '🔮🔮🔮',
        tagSuffix: '🔮🔮🔮',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.underline}`
                      : `color: white; background-color: violet; ${style.bold}`,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: isNode ? `${isoStyling.blue}${isoStyling.bgWhite}`
                      : `color: ${colours.darkMidnightBlue}`,
    },
    cantTouch: {
        tagPrefix: '🔨⏰',
        tagSuffix: '⏰🔨',
        style: isNode ? `${isoStyling.white}${isoStyling.bgCyan}${isoStyling.bold}`
                      : `color: ${colours.yellow}; background-color: ${colours.brown}; ` +
                        `font-size: 17px; padding: 2px; border-radius: 6px`,
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: isNode ? `${isoStyling.magenta}${isoStyling.bold}`
                      : `color: ${colours.indigo}`,
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_ [',
        tagSuffix: '] _♟♟♟♟♟♟♟♟',
        style: isNode ? `${isoStyling.black}${isoStyling.bgWhite}`
                      : `color: ${colours.brown}`,
    },
    cult: {
        tagPrefix: '👪,👩‍👩‍👧‍👧👨‍👨‍👦‍👦👨‍👨‍👧‍👦',
        tagSuffix: '👨‍👨‍👧‍👦👨‍👨‍👦‍👦👩‍👩‍👧‍👧.👪',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: purple; background-color: lightblue; ${style.bold}`,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: isNode ? `${isoStyling.black}${isoStyling.bgWhite}`
                      : `color: ${colours.darkGreen}`,
    },
    dirtRoad: {
        tagPrefix: '= = = =',
        tagSuffix: '= = = =',
        style: isNode ? `${isoStyling.bgGray}${isoStyling.yellow}${isoStyling.bold}`
                      : `color:          ${colours.tan};
                           ${style.bold}
                           border-top:     1px inset ${colours.tan};
                           border-bottom:  1px inset ${colours.tan};
                           border-color:   ${colours.tan};
                           padding-top:    2px;
                           padding-bottom: 2px;
                           margin-top:     2px;
                           margin-bottom:  2px`,
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        style: isNode ? `${isoStyling.bgWhite}${isoStyling.magenta}`
                      : `color: ${colours.white}; background-color: ${colours.hotPink}`,
    },
    farmerBrown: {
        tagPrefix: '[🐑🐂🐑]-',
        tagSuffix: '-[🐑🐂🐑] ',
        style: '',
    },
    fountain: {
        tagPrefix: '🙏 ',
        tagSuffix: ' 🙏 ',
        // Colour is an ultra-dark blue
        style: `font-size: 18px; background-color: steelblue; color: #02025d;` +
               `border-top-left-radius: 25px; border-top-right-radius: 2px;` +
               `border-bottom-right-radius: 2px`,
    },
    fresh: {
        tagPrefix: '📖 👶>👵 🔄',
        tagSuffix: '⌛💺⬅️👑🔔💨',
        style: isNode ? `${isoStyling.bgMagenta}${isoStyling.white}`
                      : `color: palegreen; background-color: magenta; ` +
                        `font-size: 15px; padding: 2px; ` +
                        `border-bottom-right-radius: 20px; border-top-left-radius: 20px; ` +
                        `border: 1.5px black solid`,
    },
    grasslands: {
        tagPrefix: '^^^^',
        tagSuffix: '^^^^',
        style: isNode ? `${isoStyling.bgWhite}${isoStyling.magenta}`
                      : `color: ${colours.green}; ${style.bold}`,
    },
    hatBlock: {
        tagPrefix: '😀⛑👒🎩🎓👑',
        tagSuffix: '👑🎓🎩👒⛑',
        style: isNode ? `${isoStyling.black}${isoStyling.bgYellow}`
                      : `color: lightgreen; background-color: blue; ${style.bold}`,
    },
    hotPursuit: {
        tagPrefix: '🎄🎄 !🍯🐻---🎄!🐝🐝--- [',
        tagSuffix: '] !🐝🐝🐝🐝--- 🎄🎄',
        style: isNode ? `${isoStyling.black}${isoStyling.bgYellow}`
                      : `color: ${colours.black}; background-color: ${colours.orangeBasic}`,
    },
    joy: {
        tagPrefix: '😀😀😀😀😀[',
        tagSuffix: ']😀😀😀😀😀',
        style: isNode ? `${isoStyling.black}${isoStyling.bgYellow}`
                      : `color: yellow; background-color: black; ${style.bold}`,
    },
    kingRageBlock: {
        tagPrefix: '(👁‍🗨🗣🗯)',
        tagSuffix: '(👁‍🗨🗣🗯)',
        style: isNode ? `${isoStyling.bgWhite}${isoStyling.magenta}`
                      : `color: pink; background-color: purple; font-size: 16px; padding: 3px; ` +
                        `border-style: solid; border-radius: 10; border-color: black`
    },
    lakeLouise: {
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        style: isNode ? `${isoStyling.blue}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: ${colours.cyan}`,
    },
    lispyKatana: {
        tagPrefix: '',
        tagSuffix: ';;;;;;;;;;;;;;()()',
        style: isNode ? `${isoStyling.blue}${isoStyling.bold}${isoStyling.bgWhite}`
                      :  `color: ${colours.gray}; ${style.bold}`,
    },
    lucky: {
        tagPrefix: '🍀🍀🍀',
        tagSuffix: '🍀🍀🍀',
        style: isNode ? `${isoStyling.blue}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: darkblue; background-color: darksalmon; ${style.bold}`,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        style: isNode ? `${isoStyling.white}${isoStyling.bgBlack}`
                      : `color: ${colours.violet}; ${style.bold}`,
    },
    mechanicalAtFists: {
        tagPrefix: '--#@!@#--',
        tagSuffix: ' || ',
        style: isNode ? `${isoStyling.blue}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: ${colours.indigo}`,
    },
    moProblems: {
        tagPrefix: '$$$$$$$ |💰| ',
        tagSuffix: ' |💰| $$$$$$$',
        style: isNode ? `${isoStyling.white}${isoStyling.bgBlack}`
                      : `color: ${colours.gold}; ${style.bold}`,
    },
    mrsPotatoVHS: {
        tagPrefix: '(👃👁👂)',
        tagSuffix: '(👂👁👅)',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: black; background-color: white; font-weight: 900; ` +
                        `font-size: 17px; padding: 1.5px; ` +
                        `border-style: solid; border-color: black; border-width: 5px`,
    },
    neverEnough: {
        tagPrefix: '🔔🐮🔔',
        tagSuffix: '🔔🐮🔔',
        style: isNode ? `${isoStyling.blue}${isoStyling.bold}${isoStyling.bgWhite}`
                      :  `color: white; background-color: black;` +
                         `font-size: 17px;` +
                         `padding: 3px;` +
                         `border-radius: 2px;` +
                         `border-top-right-radius:15px; border-top-left-radius: 15px`,
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        style: isNode ? `${isoStyling.white}${isoStyling.bgBlack}`
                      : `color: ${colours.white}; background-color: ${colours.black}`,
    },
    ohMy: {
        tagPrefix: ' 🦁🐯🐻 ',
        tagSuffix: ' 🐻🐯🦁 ',
        style: isNode ? `${isoStyling.bgGreen}${isoStyling.black}`
                      : `color: orange; background-color: darkgreen;` +
                        `font-size: 17px; padding: 3px;` +
                        `border-top-right-radius: 20px; border-top-left-radius: 20px`
    },
    pipeDream: {
        tagPrefix: '┣╋━╋~🛀~╋━╋┫ ',
        tagSuffix: ' ┣┫',
        style: isNode ? `${isoStyling.white}${isoStyling.bgBlack}`
                      : `color: ${colours.gray}; background-color: ${colours.white}; ${style.bold}`,
    },
    potOfGold: {
        tagPrefix: ' 💰 ',
        tagSuffix: ' 💰 ',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.underline}`
                      : `color: #946C08; font-size: 15px; font-weight: bold;
                         background-color: palegoldenrod;
                         padding: 3px;
                         border-top: solid 1px green;
                         border-bottom: solid 2.5px darkgreen;
                         border-left: solid 2.5px darkgreen; border-right: solid 2.5px darkgreen;
                         border-radius: 10px;
                         border-top-left-radius: 1px; border-top-right-radius: 1px`
    },
    probeArcade: {
        tagPrefix: '🚀.👽👽👽👽_👾',
        tagSuffix: '👾_👽👽👽👽.🚀',
        style: isNode ? `${isoStyling.white}${isoStyling.bgMagenta}`
                      : 'color: darkblue; background-color:darksalmon; border-radius: 4px; ' +
                        'border-style: solid; border-color: black; font-weight:bold',
    },
    rainbowLeaf: {
        tagPrefix: ' 🌈  🌈  ',
        tagSuffix: '  🌈  🌈 ',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.underline}`
                      : `color: black; background-color: lightgreen;
                         font-size: 15px; font-weight:bold;
                         padding: 3px;
                         border-top: solid 2px black;
                         border-bottom: solid 2px black;
                         border-left: solid 2px black; border-right: solid 2px black;
                         border-radius: 8px;
                         text-shadow: 1.5px 1.5px 1px cyan;
                         border-bottom-left-radius: 1px; border-top-right-radius: 1px`,
    },
    rockIsDead: {
        tagPrefix: '💀☠🎸💀💎💀🎸💀 |',
        tagSuffix: '| 😃🔊♪♪💃💃💃💃💃🎧😃',
        style: isNode ? `${isoStyling.yellow}${isoStyling.bold}${isoStyling.bgGreen}`
                      : `color: ${colours.yellow}; background-color: ${colours.midDarkGreen}`,
    },
    seafoamSalad: {
        tagPrefix: '🍓',
        tagSuffix: '🍅',
        style: isNode ? `${isoStyling.bgGreen}${isoStyling.white}`
                      : `color: darkgreen; background-color: lightgreen;` +
                        `font-size: 15px; font-weight: bold; padding: 0px; ` +
                        `border-top-left-radius: 20px; border-top-right-radius: 20px; ` +
                        `border-bottom: 3.5px green solid`,
    },
    smokeyHatesChristmas: {
        tagPrefix: '🔥🎄🔥🎄🔥🎄🔥|',
        tagSuffix: '|🔥🎄🔥🎄🔥🎄🔥',
        style: isNode ? `${isoStyling.green}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: ${colours.orange}; ${style.underline}; ${style.bold}`,
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        style: isNode ? `${isoStyling.blue}${isoStyling.bgWhite}`
                      : `color: ${colours.blue}; background-color: ${colours.white}`,
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        style: isNode ? `${isoStyling.blue};${isoStyling.bgWhite}`
                      : `color: ${colours.blue}; ${style.bold};`,
    },
    tangerines: {
        tagPrefix: '🍊 o(o)(){o}()@(o)OO@(){O}() 🍊',
        tagSuffix: ' _ ()()()*()',
        style: isNode ? `${isoStyling.white}${isoStyling.bgBlack}`
                      : `color: ${colours.orange}`,
    },
    theBird: {
        tagPrefix: '🤘🏼✋🖐🏼🖖🏼👋🏼🖕🏼🤘🏼[',
        tagSuffix: ']🖕🏼👋🏼🖕🏼🖖🏼🖐🏼✋🤘🏼',
        style: isNode ? `${isoStyling.black}${isoStyling.bgYellow}`
                      : `color: green; background-color: yellow; ${style.bold}`,
    },
    theHeist: {
        tagPrefix: "🚚==|💰😰🔫😎|_",
        tagSuffix: "_|😎🔧🔒|📦",
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: ${colours.white}; ${style.underline}; ` +
                          `background-color: ${colours.darkGray}; ${style.bold}`
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        style: isNode ? `${isoStyling.black}${isoStyling.bold}${isoStyling.bgWhite}`
                      : `color: ${colours.deepRed}; ` +
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
        style: isNode ? `${isoStyling.white}${isoStyling.bgBlack}`
                      : `color: ${colours.white}; background-color: ${colours.black}`
    }
};

export const logMarkers = {...madLogMarkers};
