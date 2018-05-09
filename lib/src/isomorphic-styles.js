"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theming_1 = require("./theming");
var isNode = require("detect-node");
var cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';
/**
 * @export
 * Collection of atomic styles that can be used in both the browser and the cli.
 */
exports.isomorphicStyles = {
    default: {
        cli: '\u001b[49m\u001b[0m',
        browser: 'color: black; background-color: white;'
    },
    // Colors
    black: { cli: '\u001b[30m', browser: 'color: #333' },
    blue: { cli: '\u001b[34m', browser: 'color: #3498db' },
    cyan: { cli: '\u001b[36m', browser: 'color: #00FFFF' },
    gray: { cli: '\u001b[90m', browser: 'color: #7f8c8d' },
    grey: { cli: '\u001b[90m', browser: 'color: #7f8c8d' },
    green: { cli: '\u001b[32m', browser: 'color: #2ecc71' },
    magenta: { cli: '\u001b[35m', browser: 'color: #8e44ad' },
    red: { cli: '\u001b[31m', browser: 'color: #e74c3c' },
    white: { cli: '\u001b[37m', browser: 'color: #fff' },
    yellow: { cli: '\u001b[33m', browser: 'color: #f1c40f' },
    // Background colors
    bgBlack: { cli: '\u001b[40m', browser: 'background-color: #333' },
    bgBlue: { cli: '\u001b[44m', browser: 'background-color: #3498db' },
    bgCyan: { cli: '\u001b[46m', browser: 'background-color: #00ffff' },
    bgGray: { cli: '\u001b[47m', browser: 'background-color: #7f8c8d' },
    bgGrey: { cli: '\u001b[47m', browser: 'background-color: #7f8c8d' },
    bgGreen: { cli: '\u001b[42m', browser: 'background-color: #2ecc71' },
    bgMagenta: { cli: '\u001b[45m', browser: 'background-color: #8e44ad' },
    bgRed: { cli: '\u001b[41m', browser: 'background-color: #e74c3c' },
    bgWhite: { cli: '\u001b[47m', browser: 'background-color: #fff' },
    bgYellow: { cli: '\u001b[43m', browser: 'background-color: #f1c40f' },
    // Misc style settings
    blink: { cli: '\u001b[5m', browser: 'text-decoration: blink' },
    bold: { cli: '\u001b[1m', browser: 'font-weight: bold' },
    dim: { cli: '\u001b[2m', browser: 'opacity: .8' },
    hidden: { cli: '\u001b[8m', browser: 'visibility: hidden' },
    inverse: { cli: '\u001b[7m', browser: cssInverse },
    italic: { cli: '\u001b[3m', browser: 'font-style: italic' },
    strikethrough: { cli: '\u001b[9m', browser: 'text-decoration: line-through' },
    underline: { cli: '\u001b[4m', browser: 'text-decoration: underline' },
};
/****************************************** NODE STYLES *******************************************/
var node = {
    black: function (str) { return "\u001B[30m" + str + "\u001B[0m"; },
    red: function (str) { return "\u001B[31m" + str + "\u001B[0m"; },
    green: function (str) { return "\u001B[32m" + str + "\u001B[0m"; },
    yellow: function (str) { return "\u001B[33m" + str + "\u001B[0m"; },
    blue: function (str) { return "\u001B[34m" + str + "\u001B[0m"; },
    magenta: function (str) { return "\u001B[35m" + str + "\u001B[0m"; },
    cyan: function (str) { return "\u001B[36m" + str + "\u001B[0m"; },
    white: function (str) { return "\u001B[37m" + str + "\u001B[0m"; },
    gray: function (str) { return "\u001B[90m" + str + "\u001B[0m"; },
    bgBlack: function (str) { return "\u001B[40m" + str + "\u001B[0m"; },
    bgRed: function (str) { return "\u001B[41m" + str + "\u001B[0m"; },
    bgGreen: function (str) { return "\u001B[42m" + str + "\u001B[0m"; },
    bgYellow: function (str) { return "\u001B[43m" + str + "\u001B[0m"; },
    bgBlue: function (str) { return "\u001B[44m" + str + "\u001B[0m"; },
    bgMagenta: function (str) { return "\u001B[45m" + str + "\u001B[0m"; },
    bgCyan: function (str) { return "\u001B[46m" + str + "\u001B[0m"; },
    bgWhite: function (str) { return "\u001B[47m" + str + "\u001B[0m"; },
    bold: function (str) { return "\u001B[1m" + str + "\u001B[0m"; },
    underline: function (str) { return "\u001B[2m" + str + "\u001B[0m"; },
    italic: function (str) { return "\u001B[3m" + str + "\u001B[0m"; },
};
exports.nodeStyling = node;
function buildFileTagForBrowser(fName, opts) {
    return (isNode)
        ? "" + opts.tagPrefix + fName + opts.tagSuffix
        : "" + ((opts.style) ? '%c' : '') + opts.tagPrefix + "[" + fName + "]" + opts.tagSuffix + " ;";
}
// Extract colours
var bgBlack = node.bgBlack, bgBlue = node.bgBlue, bgCyan = node.bgCyan, bgGreen = node.bgGreen, bgMagenta = node.bgMagenta, bgRed = node.bgRed, bgWhite = node.bgWhite, bgYellow = node.bgYellow;
var black = node.black, blue = node.blue, cyan = node.cyan, green = node.green, magenta = node.magenta, red = node.red, white = node.white, yellow = node.yellow, gray = node.gray;
var underline = node.underline, bold = node.bold, italic = node.italic;
/********************************************* STYLES *********************************************/
var aquarium = isNode ? function (fName) { return blue(bgWhite("[" + fName + "]")); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.aquarium),
        theming_1.madLogMarkers.aquarium.style]; };
var angryBird = isNode ? function (fName) { return blue(bgBlack(bgYellow("[" + fName + "]"))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.angryBird),
        theming_1.madLogMarkers.angryBird.style]; };
var rainbowLeaf = isNode ? function (fName) { return magenta(bgBlue("[" + fName + "]")); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.rainbowLeaf),
        theming_1.madLogMarkers.rainbowLeaf.style]; };
var lucky = isNode ? function (fName) { return bold(white(bgMagenta("[" + fName + "]"))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.lucky),
        theming_1.madLogMarkers.lucky.style]; };
var probeArcade = isNode ? function (fName) { return bold(cyan(bgBlue("[" + fName + "]"))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.probeArcade),
        theming_1.madLogMarkers.probeArcade.style]; };
var potOfGold = isNode ? function (fName) { return italic(bold(yellow(bgBlack("[" + fName + "]")))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.potOfGold),
        theming_1.madLogMarkers.potOfGold.style]; };
var cult = isNode ? function (fName) { return bgWhite(black("[" + fName + "]")); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.cult),
        theming_1.madLogMarkers.cult.style]; };
var bracelet = isNode ? function (fName) { return bold(bgMagenta(cyan("[" + fName + "]"))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.bracelet),
        theming_1.madLogMarkers.bracelet.style]; };
var rockIsDead = isNode ? function (fName) { return bold(bgBlack(magenta("[" + fName + "]"))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.rockIsDead),
        theming_1.madLogMarkers.rockIsDead.style]; };
var smokeyHatesChristmas = isNode ? function (fName) { return underline(bgGreen(white("[" + fName + "]"))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.smokeyHatesChristmas),
        theming_1.madLogMarkers.smokeyHatesChristmas.style]; };
var joy = isNode ? function (fName) { return bgYellow(magenta(" [" + fName + "] ")); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.joy),
        theming_1.madLogMarkers.joy.style]; };
var hatBlock = isNode ? function (fName) { return bgCyan(black(" [" + fName + "] ")); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.hatBlock),
        theming_1.madLogMarkers.hatBlock.style]; };
var theHeist = isNode ? function (fName) { return underline(bold(white(bgBlack(" [" + fName + "] ")))); }
    : function (fName) { return [buildFileTagForBrowser(fName, theming_1.madLogMarkers.theHeist),
        theming_1.madLogMarkers.theHeist.style]; };
/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
exports.isoStyles = {
    a: aquarium, aquarium: aquarium,
    b: rainbowLeaf, rainbowLeaf: rainbowLeaf,
    c: lucky, lucky: lucky,
    d: probeArcade, probeArcade: probeArcade,
    e: potOfGold, potOfGold: potOfGold,
    f: cult, cult: cult,
    g: bracelet, bracelet: bracelet,
    h: rockIsDead, rockIsDead: rockIsDead,
    i: smokeyHatesChristmas, smokeyHatesChristmas: smokeyHatesChristmas,
    j: joy, joy: joy,
    k: hatBlock, hatBlock: hatBlock,
    l: theHeist, theHeist: theHeist,
};
//# sourceMappingURL=isomorphic-styles.js.map