"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theming_1 = require("./theming");
var isNode = require("detect-node");
var cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';
var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
/**
 * @export
 * Collection of atomic styles that can be used in both the browser and the cli.
 */
// prettier-ignore
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
// prettier-ignore
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
    underline: function (str) { return "\u001B[4m" + str + "\u001B[0m"; },
    italic: function (str) { return "\u001B[3m" + str + "\u001B[0m"; },
    rainbow: function (str) {
        return str
            .split('')
            .map(function (char, idx) {
            return char === ' '
                ? char
                : node.bold(node.bgBlack(node[rainbowColors[idx++ % rainbowColors.length]](char)));
        })
            .join('');
    },
};
exports.nodeStyling = node;
function buildFileTagForBrowser(fName, opts) {
    return isNode
        ? "" + opts.tagPrefix + fName + opts.tagSuffix
        : "" + (opts.style ? '%c' : '') + opts.tagPrefix + "[" + fName + "]" + opts.tagSuffix + " ;";
}
// Extract colours
var bgBlack = node.bgBlack, bgBlue = node.bgBlue, bgCyan = node.bgCyan, bgGreen = node.bgGreen, bgMagenta = node.bgMagenta, bgRed = node.bgRed, bgWhite = node.bgWhite, bgYellow = node.bgYellow;
var black = node.black, blue = node.blue, cyan = node.cyan, green = node.green, magenta = node.magenta, red = node.red, white = node.white, yellow = node.yellow, gray = node.gray;
var underline = node.underline, bold = node.bold, italic = node.italic, rainbow = node.rainbow;
/********************************************* STYLES *********************************************/
var none = isNode
    ? function (fName) { return "[" + fName + "] "; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, { tagPrefix: '[', tagSuffix: ']  ', style: "" }),
        theming_1.madLogMarkers.aquarium.style,
    ]; };
var angryBird = isNode
    ? function (fName) { return bgYellow(black("\uD83D\uDC25 [" + fName + "]\uD83D\uDC25 ")) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.angryBird),
        theming_1.madLogMarkers.angryBird.style,
    ]; };
var aquarium = isNode
    ? function (fName) { return bgBlue(white(bold("\uD83D\uDC20 \uD83D\uDC19 [" + fName + "]\uD83D\uDC19 \uD83D\uDC20 "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.aquarium),
        theming_1.madLogMarkers.aquarium.style,
    ]; };
var arrow = isNode
    ? function (fName) { return gray(bold(bgWhite("--[" + fName + "]-->"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.arrow),
        theming_1.madLogMarkers.arrow.style,
    ]; };
var backAndForth = isNode
    ? function (fName) { return black(bold(bgWhite("))><(( [" + fName + "] ))><(("))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.backAndForth),
        theming_1.madLogMarkers.backAndForth.style,
    ]; };
var barbells = isNode
    ? function (fName) { return underline(bold(bgBlack(white("|-()-()-[ " + fName + " ]-()-()-|")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.barbells),
        theming_1.madLogMarkers.barbells.style,
    ]; };
var bracelet = isNode
    ? function (fName) { return bold(bgMagenta(cyan("\u231A [" + fName + "]\u231A "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.bracelet),
        theming_1.madLogMarkers.bracelet.style,
    ]; };
var brainwave = isNode
    ? function (fName) { return bold(bgBlue(cyan("~^~^~[" + fName + "]~^~^~"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.brainwave),
        theming_1.madLogMarkers.brainwave.style,
    ]; };
var checkmate = isNode
    ? function (fName) { return bgYellow(black("\u265C \u265E \u265D \u265A \u265B [" + fName + "]\u265B \u265A \u265D \u265E \u265C ")) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.checkmate),
        theming_1.madLogMarkers.checkmate.style,
    ]; };
var cult = isNode
    ? function (fName) { return bold(bgRed(cyan("\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66 \uD83D\uDC6A  [" + fName + "] \uD83D\uDC6A \uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66 "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.cult),
        theming_1.madLogMarkers.cult.style,
    ]; };
var dirtRoad = isNode
    ? function (fName) { return bold(bgCyan(white("= = [" + fName + "] = ="))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.dirtRoad),
        theming_1.madLogMarkers.dirtRoad.style,
    ]; };
var escherBarbieLego = isNode
    ? function (fName) { return bgMagenta(black("||\u2517\u251B\u250F\u2513 [" + fName + "] \u250F\u2513\u2517\u251B||")) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.escherBarbieLego),
        theming_1.madLogMarkers.escherBarbieLego.style,
    ]; };
var farmerBrown = isNode
    ? function (fName) { return bold(white(bgGreen("\uD83D\uDC11 \uD83D\uDC02 [" + fName + "]\uD83D\uDC02 \uD83D\uDC11 "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.farmerBrown),
        theming_1.madLogMarkers.farmerBrown.style,
    ]; };
var grasslands = isNode
    ? function (fName) { return black(bgGreen("^^^[" + fName + "]^^^")) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.grasslands),
        theming_1.madLogMarkers.grasslands.style,
    ]; };
var hatBlock = isNode
    ? function (fName) { return bgCyan(black("\uD83C\uDFA9  [" + fName + "] \uD83C\uDFA9 ")) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.hatBlock),
        theming_1.madLogMarkers.hatBlock.style,
    ]; };
var hotPursuit = isNode
    ? function (fName) { return bgRed(white(bold("\uD83C\uDF6F \uD83D\uDC3B [" + fName + "]\uD83D\uDC1D \uD83D\uDC1D "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.hotPursuit),
        theming_1.madLogMarkers.hotPursuit.style,
    ]; };
var joy = isNode
    ? function (fName) { return bgYellow(black("\uD83D\uDE00 \uD83D\uDE00 [" + fName + "]\uD83D\uDE00 \uD83D\uDE00 ")) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.joy),
        theming_1.madLogMarkers.joy.style,
    ]; };
var kingRageBlock = isNode
    ? function (fName) { return bgRed(white(bold("\uD83D\uDC41\u200D\uD83D\uDDE8 \uD83D\uDDE3 \uD83D\uDDEF [" + fName + "]\uD83D\uDC41\u200D\uD83D\uDDE8 \uD83D\uDDE3 \uD83D\uDDEF "))) + '  '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.kingRageBlock),
        theming_1.madLogMarkers.kingRageBlock.style,
    ]; };
var lakeLouise = isNode
    ? function (fName) { return bgCyan(white(bold("\uD83C\uDFDE\uFE0F  [" + fName + "] \uD83C\uDFDE\uFE0F "))) + '  '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.lakeLouise),
        theming_1.madLogMarkers.lakeLouise.style,
    ]; };
var lucky = isNode
    ? function (fName) { return bold(white(bgGreen("\uD83C\uDF40 [" + fName + "]\uD83C\uDF40 "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.lucky),
        theming_1.madLogMarkers.lucky.style,
    ]; };
var maceWindu = isNode
    ? function (fName) { return bold(white(bgMagenta("o==[" + fName + "]::::::::::::::::>"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.maceWindu),
        theming_1.madLogMarkers.maceWindu.style,
    ]; };
var mechanicalAtFists = isNode
    ? function (fName) { return bold(black(bgWhite("--#@[" + fName + "]@#--"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.mechanicalAtFists),
        theming_1.madLogMarkers.mechanicalAtFists.style,
    ]; };
var moProblems = isNode
    ? function (fName) { return bold(black(bgWhite("\uD83D\uDCB0 [" + fName + "] \uD83D\uDCB0"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.moProblems),
        theming_1.madLogMarkers.moProblems.style,
    ]; };
var mrsPotatoVHS = isNode
    ? function (fName) { return underline(black(bgYellow("(\uD83D\uDC43 \uD83D\uDC41 \uD83D\uDC42) " + fName + " (\uD83D\uDC42 \uD83D\uDC41 \uD83D\uDC45 )"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.mrsPotatoVHS),
        theming_1.madLogMarkers.mrsPotatoVHS.style,
    ]; };
var nightmare = isNode
    ? function (fName) { return bold(white(bgBlack(">:~ [" + fName + "] ~:<"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.nightmare),
        theming_1.madLogMarkers.nightmare.style,
    ]; };
var pipeDream = isNode
    ? function (fName) { return bold(bgBlue(white("\u2523\u254B\u2501\u254B~\uD83D\uDEC0  " + fName + " \uD83D\uDEC0~\u254B\u2501\u254B\u252B"))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.pipeDream),
        theming_1.madLogMarkers.pipeDream.style,
    ]; };
var potOfGold = isNode
    ? function (fName) { return italic(bold(yellow(bgBlack("\uD83D\uDCB0  [" + fName + "] \uD83D\uDCB0  ")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.potOfGold),
        theming_1.madLogMarkers.potOfGold.style,
    ]; };
var probeArcade = isNode
    ? function (fName) { return bold(cyan(bgBlue("\uD83D\uDC7D  [" + fName + "] \uD83D\uDC7D "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.probeArcade),
        theming_1.madLogMarkers.probeArcade.style,
    ]; };
var rainbowLeaf = isNode
    ? function (fName) { return '🌈  ' + rainbow("[" + fName + "]") + ' 🌈  '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.rainbowLeaf),
        theming_1.madLogMarkers.rainbowLeaf.style,
    ]; };
var rockIsDead = isNode
    ? function (fName) { return bold(bgBlack(magenta("\uD83C\uDFB8  [" + fName + "] \uD83C\uDFB8  "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.rockIsDead),
        theming_1.madLogMarkers.rockIsDead.style,
    ]; };
var smokeyHatesChristmas = isNode
    ? function (fName) { return white(bold(bgGreen("\uD83C\uDF84 \uD83D\uDD25 [" + fName + "]\uD83D\uDD25 \uD83C\uDF84 "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.smokeyHatesChristmas),
        theming_1.madLogMarkers.smokeyHatesChristmas.style,
    ]; };
var springy = isNode
    ? function (fName) { return underline(bold(white("\u2699\uFE0F  [" + fName + "] \u2699\uFE0F "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.springy),
        theming_1.madLogMarkers.springy.style,
    ]; };
var swimmers = isNode
    ? function (fName) { return underline(bold(bgWhite(blue("~~[" + fName + "]~~@")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.swimmers),
        theming_1.madLogMarkers.swimmers.style,
    ]; };
var tangerines = isNode
    ? function (fName) { return '🍊  ' + rainbow("[" + fName + "]") + ' 🍊  '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.tangerines),
        theming_1.madLogMarkers.tangerines.style,
    ]; };
var theBird = isNode
    ? function (fName) { return white(bold(bgMagenta("\uD83D\uDD95\uD83C\uDFFC [" + fName + "]\uD83D\uDD95\uD83C\uDFFC "))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.theBird),
        theming_1.madLogMarkers.theBird.style,
    ]; };
var theHeist = isNode
    ? function (fName) { return underline(bold(white(bgBlack("[" + fName + "]")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.theHeist),
        theming_1.madLogMarkers.theHeist.style,
    ]; };
var vendetta = isNode
    ? function (fName) { return underline(bold(white(bgRed("[" + fName + "]")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.vendetta),
        theming_1.madLogMarkers.vendetta.style,
    ]; };
var xmlHell = isNode
    ? function (fName) { return underline(bold(white(bgBlack("<<< " + fName + " >>>")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.vendetta),
        theming_1.madLogMarkers.vendetta.style,
    ]; };
var zebra = isNode
    ? function (fName) { return underline(bold(white(bgBlack("| | | " + fName + " | | |")))) + ' '; }
    : function (fName) { return [
        buildFileTagForBrowser(fName, theming_1.madLogMarkers.zebra),
        theming_1.madLogMarkers.zebra.style,
    ]; };
/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
// prettier-ignore
exports.isoStyles = {
    none: none,
    angryBird: angryBird,
    aquarium: aquarium,
    arrow: arrow,
    backAndForth: backAndForth,
    barbells: barbells,
    bracelet: bracelet,
    brainwave: brainwave,
    checkmate: checkmate,
    cult: cult,
    dirtRoad: dirtRoad,
    escherBarbieLego: escherBarbieLego,
    farmerBrown: farmerBrown,
    grasslands: grasslands,
    hatBlock: hatBlock,
    hotPursuit: hotPursuit,
    joy: joy,
    kingRageBlock: kingRageBlock,
    lakeLouise: lakeLouise,
    lucky: lucky,
    maceWindu: maceWindu,
    mechanicalAtFists: mechanicalAtFists,
    moProblems: moProblems,
    mrsPotatoVHS: mrsPotatoVHS,
    nightmare: nightmare,
    pipeDream: pipeDream,
    potOfGold: potOfGold,
    probeArcade: probeArcade,
    rainbowLeaf: rainbowLeaf,
    rockIsDead: rockIsDead,
    smokeyHatesChristmas: smokeyHatesChristmas,
    springy: springy,
    swimmers: swimmers,
    tangerines: tangerines,
    theBird: theBird,
    theHeist: theHeist,
    vendetta: vendetta,
    xmlHell: xmlHell,
    zebra: zebra,
};
//# sourceMappingURL=isomorphic-styles.js.map