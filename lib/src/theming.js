"use strict";
var detect_node_1 = require("detect-node");
var isomorphic_styles_1 = require("./isomorphic-styles");
/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
exports.colours = {
    violet: '#551A8B',
    orange: '#EE7600',
    brown: '#593001',
    maroon: '#5d0000',
    blue: '#0000FF',
    lightBlue: '#add8e6',
    darkMidnightBlue: '#003366',
    midDarkGreen: 'darkgreen',
    deepRed: '#800000',
    yellow: 'yellow',
    orangeBasic: 'orange',
    yellowishGold: '#E5C100',
    gold: '#FFD700',
    darkGray: '#818181',
    hotPink: '#FF69B4',
    tan: '#C4AEAD',
    white: '#FFFFFF',
    indigo: '#4B0082',
    green: '#00FF00',
    darkGreen: '#004000',
    gray: '#777777',
    cyan: '#00FFFF',
    black: '#000000',
    ultraPaleGreen: '#f0fff0',
};
exports.style = {
    bold: 'font-weight: bold;',
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
exports.madLogMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgYellow + isomorphic_styles_1.isomorphicStyles.bold
            : "color: " + exports.colours.yellowishGold + ";",
    },
    aquarium: {
        tagPrefix: ' 🐠 🐌 🐌 ',
        tagSuffix: ' 🐠🐠🐠 🐙',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.underline
            : "color: darkblue; background-color: lightblue;\n                         font-size: 15px; font-weight:bold;\n                         padding: 3px;\n                         border-bottom: solid 2px black;\n                         border-left: solid 2px black; border-right: solid 2px black;\n                         border-radius: 4px;\n                         border-top-left-radius: 1px; border-top-right-radius: 1px;",
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.underline
            : "color: " + exports.colours.brown + "; " + exports.style.bold + " " + exports.style.underline,
    },
    barbells: {
        tagSuffix: '--()-()',
        tagPrefix: '()-()--',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.gray + isomorphic_styles_1.isomorphicStyles.bgWhite + isomorphic_styles_1.isomorphicStyles.bold
            : "color: " + exports.colours.darkGray + "; " + exports.style.bold,
    },
    bracelet: {
        tagPrefix: '🔮🔮🔮',
        tagSuffix: '🔮🔮🔮',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.underline
            : "color: white; background-color: violet; " + exports.style.bold,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.blue + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.darkMidnightBlue + ";",
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.magenta + isomorphic_styles_1.isomorphicStyles.bold
            : "color: " + exports.colours.indigo + ";",
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_ [',
        tagSuffix: '] _♟♟♟♟♟♟♟♟',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.brown + ";",
    },
    cult: {
        tagPrefix: '👪,👩‍👩‍👧‍👧👨‍👨‍👦‍👦👨‍👨‍👧‍👦',
        tagSuffix: '👨‍👨‍👧‍👦👨‍👨‍👦‍👦👩‍👩‍👧‍👧.👪',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: purple; background-color: lightblue; " + exports.style.bold,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.darkGreen + ";",
    },
    dirtRoad: {
        tagSuffix: '= = = =',
        tagPrefix: '= = = =',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.bgGray + isomorphic_styles_1.isomorphicStyles.yellow + isomorphic_styles_1.isomorphicStyles.bold
            : "color:          " + exports.colours.tan + ";\n                           " + exports.style.bold + "\n                           border-top:     1px inset " + exports.colours.tan + ";\n                           border-bottom:  1px inset " + exports.colours.tan + ";\n                           border-color:   " + exports.colours.tan + ";\n                           padding-top:    2px;\n                           padding-bottom: 2px;\n                           margin-top:     2px;\n                           margin-bottom:  2px;",
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.bgWhite + isomorphic_styles_1.isomorphicStyles.magenta
            : "color: " + exports.colours.white + "; background-color: " + exports.colours.hotPink + ";",
    },
    farmerBrown: {
        tagPrefix: '[🐑🐂🐑]-',
        tagSuffix: '-[🐑🐂🐑] ',
        style: '',
    },
    grasslands: {
        tagSuffix: '^^^^',
        tagPrefix: '^^^^',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.bgWhite + isomorphic_styles_1.isomorphicStyles.magenta
            : "color: " + exports.colours.green + "; " + exports.style.bold + ";",
    },
    hatBlock: {
        tagPrefix: '😀⛑👒🎩🎓👑',
        tagSuffix: '👑🎓🎩👒⛑',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgYellow
            : "color: lightgreen; background-color: blue; " + exports.style.bold,
    },
    hotPursuit: {
        tagPrefix: '🎄🎄 !🍯🐻---🎄!🐝🐝--- [',
        tagSuffix: '] !🐝🐝🐝🐝--- 🎄🎄',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgYellow
            : "color: " + exports.colours.black + "; background-color: " + exports.colours.orangeBasic + ";",
    },
    joy: {
        tagPrefix: '😀😀😀😀😀[',
        tagSuffix: ']😀😀😀😀😀',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgYellow
            : "color: yellow; background-color: black; " + exports.style.bold,
    },
    kingRageBlock: {
        tagPrefix: '(👁‍🗨🗣🗯)',
        tagSuffix: '(👁‍🗨🗣🗯)',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.bgWhite + isomorphic_styles_1.isomorphicStyles.magenta
            : "color: pink; background-color: purple; font-size: 16px; padding: 3px; " +
                "border-style: solid; border-radius: 10; border-color: black;"
    },
    lakeLouise: {
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.blue + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.cyan + ";",
    },
    lispyKatana: {
        tagSuffix: ';;;;;;;;;;;;;;()()',
        tagPrefix: '',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.blue + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.gray + "; " + exports.style.bold + ";",
    },
    lucky: {
        tagPrefix: '🍀🍀🍀',
        tagSuffix: '🍀🍀🍀',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.blue + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: darkblue; background-color: darksalmon; " + exports.style.bold,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgBlack
            : "color: " + exports.colours.violet + "; " + exports.style.bold + ";",
    },
    mechanicalAtFists: {
        tagPrefix: '--#@!@#--',
        tagSuffix: ' || ',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.blue + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.indigo + ";",
    },
    moProblems: {
        tagPrefix: '$$$$$$$ |💰| ',
        tagSuffix: ' |💰| $$$$$$$',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgBlack
            : "color: " + exports.colours.gold + "; " + exports.style.bold + ";",
    },
    mrsPotatoVHS: {
        tagPrefix: '(👃👁👂)',
        tagSuffix: '(👂👁👅)',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: black; font-weight: 900; font-size: 17px; padding: 1.5px; " +
                "border-style: solid; border-color: black; border-width: 5px;",
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgBlack
            : "color: " + exports.colours.white + "; background-color: " + exports.colours.black + ";",
    },
    pipeDream: {
        tagPrefix: '┣╋━╋~🛀~╋━╋┫ ',
        tagSuffix: ' ┣┫',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgBlack
            : "color: " + exports.colours.gray + "; background-color: " + exports.colours.white + "; " + exports.style.bold,
    },
    potOfGold: {
        tagPrefix: ' 💰 ',
        tagSuffix: ' 💰 ',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.underline
            : "color: #946C08; font-size: 15px; font-weight: bold;\n                         background-color: palegoldenrod;\n                         padding: 3px;\n                         border-top: solid 1px green;\n                         border-bottom: solid 2.5px darkgreen;\n                         border-left: solid 2.5px darkgreen; border-right: solid 2.5px darkgreen;\n                         border-radius: 10px;\n                         border-top-left-radius: 1px; border-top-right-radius: 1px;"
    },
    probeArcade: {
        tagPrefix: '🚀.👽👽👽👽_👾',
        tagSuffix: '👾_👽👽👽👽.🚀',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgMagenta
            : 'color: darkblue; background-color:darksalmon; border-radius: 4px; ' +
                'border-style: solid; border-color: black; font-weight:bold;',
    },
    rainbowLeaf: {
        tagPrefix: ' 🌈  🌈  ',
        tagSuffix: '  🌈  🌈 ',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.underline
            : "color: black; background-color: lightgreen;\n                         font-size: 15px; font-weight:bold;\n                         padding: 3px;\n                         border-top: solid 2px black;\n                         border-bottom: solid 2px black;\n                         border-left: solid 2px black; border-right: solid 2px black;\n                         border-radius: 8px;\n                         text-shadow: 1.5px 1.5px 1px cyan;\n                         border-bottom-left-radius: 1px; border-top-right-radius: 1px;",
    },
    rockIsDead: {
        tagPrefix: '💀☠🎸💀💎💀🎸💀 |',
        tagSuffix: '| 😃🔊♪♪💃💃💃💃💃🎧😃',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.yellow + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgGreen
            : "color: " + exports.colours.yellow + "; background-color: " + exports.colours.midDarkGreen + ";",
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        style: detect_node_1.default ? isomorphic_styles_1.isomorphicStyles.blue + ";" + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.blue + "; " + exports.style.bold + ";",
    },
    smokeyHatesChristmas: {
        tagPrefix: '🔥🎄🔥🎄🔥🎄🔥|',
        tagSuffix: '|🔥🎄🔥🎄🔥🎄🔥',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.green + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.orange + "; " + exports.style.underline + "; " + exports.style.bold + ";",
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.blue + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.blue + "; background-color: " + exports.colours.white + ";",
    },
    tangerines: {
        tagPrefix: 'o(o)(){o}()@(o)OO@(){O}() _ ',
        tagSuffix: ' _ ()()()*()',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgBlack
            : "color: " + exports.colours.orange + ";",
    },
    theBird: {
        tagPrefix: '🤘🏼✋🖐🏼🖖🏼👋🏼🖕🏼🤘🏼[',
        tagSuffix: ']🖕🏼👋🏼🖕🏼🖖🏼🖐🏼✋🤘🏼',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bgYellow
            : "color: green; background-color: yellow; " + exports.style.bold,
    },
    theHeist: {
        tagPrefix: "🚚==|💰😰🔫😎|_",
        tagSuffix: "_|😎🔧🔒|📦",
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.white + "; " + exports.style.underline + "; " +
                ("background-color: " + exports.colours.darkGray + "; " + exports.style.bold + ";")
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.black + isomorphic_styles_1.isomorphicStyles.bold + isomorphic_styles_1.isomorphicStyles.bgWhite
            : "color: " + exports.colours.deepRed + "; " +
                (exports.style.bold + " background-color: " + exports.colours.ultraPaleGreen),
    },
    xmlHell: {
        tagPrefix: '<<<<<>>>>>',
        tagSuffix: ' >> ',
        style: '',
    },
    zebra: {
        tagPrefix: '| | | | |',
        tagSuffix: '| | | | |',
        style: detect_node_1.default ? "" + isomorphic_styles_1.isomorphicStyles.white + isomorphic_styles_1.isomorphicStyles.bgBlack
            : "color: " + exports.colours.white + "; background-color: " + exports.colours.black + ";"
    }
};
exports.logMarkers = Object.assign({}, exports.madLogMarkers);
// 🌪⚡🌬 🔥🌤🌩🌟☔🌈☂🌦🌨⛄✨🎋🎍🌋💣🗡⚔🔫💧❄☃☄🌊🚚🔒🔐🔓🗝🏦💣💳📦💼🔦🔧🔨🔩🔪🔫
// 👾👾
//# sourceMappingURL=theming.js.map