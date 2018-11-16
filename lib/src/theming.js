"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var detect_node_1 = __importDefault(require("detect-node"));
var isomorphic_styling_1 = require("./isomorphic-styling");
/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
// prettier-ignore
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
    lighestGray: '#e7e7e7',
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
exports.madLogMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgYellow + isomorphic_styling_1.isoStyling.bold
            : "color: " + exports.colours.yellowishGold,
    },
    aquarium: {
        tagPrefix: ' 🐠 🐌 🐌 ',
        tagSuffix: ' 🐠🐠🐠 🐙',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.underline
            : "color: darkblue; background-color: lightblue;\n                         font-size: 15px; font-weight:bold;\n                         padding: 3px;\n                         border-bottom: solid 2px black;\n                         border-left: solid 2px black; border-right: solid 2px black;\n                         border-radius: 4px;\n                         border-top-left-radius: 1px; border-top-right-radius: 1px",
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.underline
            : "color: " + exports.colours.brown + "; " + exports.style.bold + " " + exports.style.underline,
    },
    barbells: {
        tagPrefix: '()-()--',
        tagSuffix: '--()-()',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.gray + isomorphic_styling_1.isoStyling.bgWhite + isomorphic_styling_1.isoStyling.bold
            : "color: " + exports.colours.darkGray + "; " + exports.style.bold,
    },
    bracelet: {
        tagPrefix: '🔮🔮🔮',
        tagSuffix: '🔮🔮🔮',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.underline
            : "color: white; background-color: violet; " + exports.style.bold,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.darkMidnightBlue,
    },
    cantTouch: {
        tagPrefix: '🔨⏰',
        tagSuffix: '⏰🔨',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgCyan + isomorphic_styling_1.isoStyling.bold
            : "color: " + exports.colours.yellow + "; background-color: " + exports.colours.brown + "; " +
                "font-size: 17px; padding: 2px; border-radius: 6px",
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.magenta + isomorphic_styling_1.isoStyling.bold
            : "color: " + exports.colours.indigo,
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_ [',
        tagSuffix: '] _♟♟♟♟♟♟♟♟',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.brown,
    },
    cult: {
        tagPrefix: '👪,👩‍👩‍👧‍👧👨‍👨‍👦‍👦👨‍👨‍👧‍👦',
        tagSuffix: '👨‍👨‍👧‍👦👨‍👨‍👦‍👦👩‍👩‍👧‍👧.👪',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: purple; background-color: lightblue; " + exports.style.bold,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.darkGreen,
    },
    dirtRoad: {
        tagPrefix: '= = = =',
        tagSuffix: '= = = =',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgGray + isomorphic_styling_1.isoStyling.yellow + isomorphic_styling_1.isoStyling.bold
            : "color:          " + exports.colours.tan + ";\n                           " + exports.style.bold + "\n                           border-top:     1px inset " + exports.colours.tan + ";\n                           border-bottom:  1px inset " + exports.colours.tan + ";\n                           border-color:   " + exports.colours.tan + ";\n                           padding-top:    2px;\n                           padding-bottom: 2px;\n                           margin-top:     2px;\n                           margin-bottom:  2px",
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgWhite + isomorphic_styling_1.isoStyling.magenta
            : "color: " + exports.colours.white + "; background-color: " + exports.colours.hotPink,
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
        style: "font-size: 18px; background-color: steelblue; color: #02025d;" +
            "border-top-left-radius: 25px; border-top-right-radius: 2px;" +
            "border-bottom-right-radius: 2px",
    },
    fresh: {
        tagPrefix: '📖 👶>👵 🔄',
        tagSuffix: '⌛💺⬅️👑🔔💨',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgMagenta + isomorphic_styling_1.isoStyling.white
            : "color: palegreen; background-color: magenta; " +
                "font-size: 15px; padding: 2px; " +
                "border-bottom-right-radius: 20px; border-top-left-radius: 20px; " +
                "border: 1.5px black solid",
    },
    grasslands: {
        tagPrefix: '^^^^',
        tagSuffix: '^^^^',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgWhite + isomorphic_styling_1.isoStyling.magenta
            : "color: " + exports.colours.green + "; " + exports.style.bold,
    },
    hatBlock: {
        tagPrefix: '😀⛑👒🎩🎓👑',
        tagSuffix: '👑🎓🎩👒⛑',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgYellow
            : "color: lightgreen; background-color: blue; " + exports.style.bold,
    },
    hotPursuit: {
        tagPrefix: '🎄🎄 !🍯🐻---🎄!🐝🐝--- [',
        tagSuffix: '] !🐝🐝🐝🐝--- 🎄🎄',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgYellow
            : "color: " + exports.colours.black + "; background-color: " + exports.colours.orangeBasic,
    },
    joy: {
        tagPrefix: '😀😀😀😀😀[',
        tagSuffix: ']😀😀😀😀😀',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgYellow
            : "color: yellow; background-color: black; " + exports.style.bold,
    },
    kingRageBlock: {
        tagPrefix: '(👁‍🗨🗣🗯)',
        tagSuffix: '(👁‍🗨🗣🗯)',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgWhite + isomorphic_styling_1.isoStyling.magenta
            : "color: pink; background-color: purple; font-size: 16px; padding: 3px; " +
                "border-style: solid; border-radius: 10; border-color: black"
    },
    lakeLouise: {
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.cyan,
    },
    lispyKatana: {
        tagPrefix: '',
        tagSuffix: ';;;;;;;;;;;;;;()()',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.gray + "; " + exports.style.bold,
    },
    lucky: {
        tagPrefix: '🍀🍀🍀',
        tagSuffix: '🍀🍀🍀',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: darkblue; background-color: darksalmon; " + exports.style.bold,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgBlack
            : "color: " + exports.colours.violet + "; " + exports.style.bold,
    },
    mechanicalAtFists: {
        tagPrefix: '--#@!@#--',
        tagSuffix: ' || ',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.indigo,
    },
    moProblems: {
        tagPrefix: '$$$$$$$ |💰| ',
        tagSuffix: ' |💰| $$$$$$$',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgBlack
            : "color: " + exports.colours.gold + "; " + exports.style.bold,
    },
    mrsPotatoVHS: {
        tagPrefix: '(👃👁👂)',
        tagSuffix: '(👂👁👅)',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: black; background-color: white; font-weight: 900; " +
                "font-size: 17px; padding: 1.5px; " +
                "border-style: solid; border-color: black; border-width: 5px",
    },
    neverEnough: {
        tagPrefix: '🔔🐮🔔',
        tagSuffix: '🔔🐮🔔',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: white; background-color: black;" +
                "font-size: 17px;" +
                "padding: 3px;" +
                "border-radius: 2px;" +
                "border-top-right-radius:15px; border-top-left-radius: 15px",
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgBlack
            : "color: " + exports.colours.white + "; background-color: " + exports.colours.black,
    },
    ohMy: {
        tagPrefix: ' 🦁🐯🐻 ',
        tagSuffix: ' 🐻🐯🦁 ',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgGreen + isomorphic_styling_1.isoStyling.black
            : "color: orange; background-color: darkgreen;" +
                "font-size: 17px; padding: 3px;" +
                "border-top-right-radius: 20px; border-top-left-radius: 20px"
    },
    pipeDream: {
        tagPrefix: '┣╋━╋~🛀~╋━╋┫ ',
        tagSuffix: ' ┣┫',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgBlack
            : "color: " + exports.colours.gray + "; background-color: " + exports.colours.white + "; " + exports.style.bold,
    },
    potOfGold: {
        tagPrefix: ' 💰 ',
        tagSuffix: ' 💰 ',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.underline
            : "color: #946C08; font-size: 15px; font-weight: bold;\n                         background-color: palegoldenrod;\n                         padding: 3px;\n                         border-top: solid 1px green;\n                         border-bottom: solid 2.5px darkgreen;\n                         border-left: solid 2.5px darkgreen; border-right: solid 2.5px darkgreen;\n                         border-radius: 10px;\n                         border-top-left-radius: 1px; border-top-right-radius: 1px"
    },
    probeArcade: {
        tagPrefix: '🚀.👽👽👽👽_👾',
        tagSuffix: '👾_👽👽👽👽.🚀',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgMagenta
            : 'color: darkblue; background-color:darksalmon; border-radius: 4px; ' +
                'border-style: solid; border-color: black; font-weight:bold',
    },
    rainbowLeaf: {
        tagPrefix: ' 🌈  🌈  ',
        tagSuffix: '  🌈  🌈 ',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.underline
            : "color: black; background-color: lightgreen;\n                         font-size: 15px; font-weight:bold;\n                         padding: 3px;\n                         border-top: solid 2px black;\n                         border-bottom: solid 2px black;\n                         border-left: solid 2px black; border-right: solid 2px black;\n                         border-radius: 8px;\n                         text-shadow: 1.5px 1.5px 1px cyan;\n                         border-bottom-left-radius: 1px; border-top-right-radius: 1px",
    },
    rockIsDead: {
        tagPrefix: '💀☠🎸💀💎💀🎸💀 |',
        tagSuffix: '| 😃🔊♪♪💃💃💃💃💃🎧😃',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.yellow + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgGreen
            : "color: " + exports.colours.yellow + "; background-color: " + exports.colours.midDarkGreen,
    },
    seafoamSalad: {
        tagPrefix: '🍓',
        tagSuffix: '🍅',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.bgGreen + isomorphic_styling_1.isoStyling.white
            : "color: darkgreen; background-color: lightgreen;" +
                "font-size: 15px; font-weight: bold; padding: 0px; " +
                "border-top-left-radius: 20px; border-top-right-radius: 20px; " +
                "border-bottom: 3.5px green solid",
    },
    smokeyHatesChristmas: {
        tagPrefix: '🔥🎄🔥🎄🔥🎄🔥|',
        tagSuffix: '|🔥🎄🔥🎄🔥🎄🔥',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.green + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.orange + "; " + exports.style.underline + "; " + exports.style.bold,
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.blue + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.blue + "; background-color: " + exports.colours.white,
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        style: detect_node_1.default ? isomorphic_styling_1.isoStyling.blue + ";" + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.blue + "; background-color: " + exports.colours.lighestGray + ";" +
                (exports.style.bold + ";"),
    },
    tangerines: {
        tagPrefix: '🍊 o(o)(){o}()@(o)OO@(){O}() 🍊',
        tagSuffix: ' _ ()()()*()',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgBlack
            : "color: " + exports.colours.orange,
    },
    theBird: {
        tagPrefix: '🤘🏼✋🖐🏼🖖🏼👋🏼🖕🏼🤘🏼[',
        tagSuffix: ']🖕🏼👋🏼🖕🏼🖖🏼🖐🏼✋🤘🏼',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bgYellow
            : "color: green; background-color: yellow; " + exports.style.bold,
    },
    theHeist: {
        tagPrefix: "🚚==|💰😰🔫😎|_",
        tagSuffix: "_|😎🔧🔒|📦",
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
            : "color: " + exports.colours.white + "; " + exports.style.underline + "; " +
                ("background-color: " + exports.colours.darkGray + "; " + exports.style.bold)
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.black + isomorphic_styling_1.isoStyling.bold + isomorphic_styling_1.isoStyling.bgWhite
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
        style: detect_node_1.default ? "" + isomorphic_styling_1.isoStyling.white + isomorphic_styling_1.isoStyling.bgBlack
            : "color: " + exports.colours.white + "; background-color: " + exports.colours.black
    }
};
exports.logMarkers = __assign({}, exports.madLogMarkers);
//# sourceMappingURL=theming.js.map