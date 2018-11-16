"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var theming_1 = require("./theming");
var detect_node_1 = __importDefault(require("detect-node"));
var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
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
/**
 * Build the file tag, including styling and %c prefix
 * Example: `%c🔨⏰[load-message.tsx]⏰🔨`
 */
function buildFileTag(fName, opts) {
    return detect_node_1.default
        ? "" + opts.tagPrefix + fName + opts.tagSuffix
        : "" + (opts.style ? '%c' : '') + opts.tagPrefix + "[" + fName + "]" + opts.tagSuffix;
}
// Extract colours
var bgBlack = node.bgBlack, bgBlue = node.bgBlue, bgCyan = node.bgCyan, bgGreen = node.bgGreen, bgMagenta = node.bgMagenta, bgRed = node.bgRed, bgWhite = node.bgWhite, bgYellow = node.bgYellow;
var black = node.black, blue = node.blue, cyan = node.cyan, green = node.green, magenta = node.magenta, red = node.red, white = node.white, yellow = node.yellow, gray = node.gray;
var underline = node.underline, bold = node.bold, italic = node.italic, rainbow = node.rainbow;
/********************************************* STYLES *********************************************/
var none = detect_node_1.default
    ? function (fName) { return "[" + fName + "] "; }
    : function (fName) { return [
        buildFileTag(fName, { tagPrefix: '[', tagSuffix: ']  ', style: "" }),
        theming_1.madLogMarkers.aquarium.style,
    ]; };
var angryBird = detect_node_1.default
    ? function (fName) { return bgYellow(black("\uD83D\uDC25  " + fName + " \uD83D\uDC25 ")) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.angryBird),
        theming_1.madLogMarkers.angryBird.style,
    ]; };
var aquarium = detect_node_1.default
    ? function (fName) { return bgBlue(white(bold("\uD83D\uDC20 \uD83D\uDC19  " + fName + " \uD83D\uDC19 \uD83D\uDC20 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.aquarium),
        theming_1.madLogMarkers.aquarium.style,
    ]; };
var arrow = detect_node_1.default
    ? function (fName) { return gray(bold(bgWhite(">>--[" + fName + "]-->"))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.arrow), theming_1.madLogMarkers.arrow.style]; };
var backAndForth = detect_node_1.default
    ? function (fName) { return black(bold(bgWhite("))><(( [" + fName + "] ))><(("))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.backAndForth),
        theming_1.madLogMarkers.backAndForth.style,
    ]; };
var barbells = detect_node_1.default
    ? function (fName) { return underline(bold(bgBlack(white("|-()-()-[ " + fName + " ]-()-()-|")))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.barbells),
        theming_1.madLogMarkers.barbells.style,
    ]; };
var bracelet = detect_node_1.default
    ? function (fName) { return bold(bgMagenta(cyan("\u231A  " + fName + " \u231A "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.bracelet),
        theming_1.madLogMarkers.bracelet.style,
    ]; };
var brainwave = detect_node_1.default
    ? function (fName) { return bold(bgBlue(cyan("~^~^~[" + fName + "]~^~^~"))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.brainwave),
        theming_1.madLogMarkers.brainwave.style,
    ]; };
var cantTouch = detect_node_1.default
    ? function (fName) { return bold(bgCyan(white("\u270B \uD83D\uDD28 \u23F0  " + fName + " \u270B \uD83D\uDD28 \u23F0 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.cantTouch),
        theming_1.madLogMarkers.cantTouch.style,
    ]; };
var cartoonSwearing = detect_node_1.default
    ? function (fName) { return underline(bgCyan(red("@%@%! " + fName + " !@%@%"))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.cartoonSwearing),
        theming_1.madLogMarkers.cartoonSwearing.style,
    ]; };
var checkmate = detect_node_1.default
    ? function (fName) { return bgYellow(black("\u265C \u265E \u265D \u265A \u265B " + fName + " \u265B \u265A \u265D \u265E \u265C ")) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.checkmate),
        theming_1.madLogMarkers.checkmate.style,
    ]; };
var cult = detect_node_1.default
    ? function (fName) { return bold(bgRed(cyan("\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66 \uD83D\uDC6A  " + fName + "  \uD83D\uDC6A \uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66 "))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.cult), theming_1.madLogMarkers.cult.style]; };
var dirtRoad = detect_node_1.default
    ? function (fName) { return bold(bgCyan(white("= = [" + fName + "] = ="))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.dirtRoad),
        theming_1.madLogMarkers.dirtRoad.style,
    ]; };
var escherBarbieLego = detect_node_1.default
    ? function (fName) { return bgMagenta(black("||\u2517\u251B\u250F\u2513  " + fName + "  \u250F\u2513\u2517\u251B||")) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.escherBarbieLego),
        theming_1.madLogMarkers.escherBarbieLego.style,
    ]; };
var farmerBrown = detect_node_1.default
    ? function (fName) { return bold(white(bgGreen("\uD83D\uDC11 \uD83D\uDC02  " + fName + " \uD83D\uDC02 \uD83D\uDC11 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.farmerBrown),
        theming_1.madLogMarkers.farmerBrown.style,
    ]; };
var fountain = detect_node_1.default
    ? function (fName) { return white(bgBlack("\uD83D\uDE4F  " + fName + " \uD83D\uDE4F ")) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.fountain),
        theming_1.madLogMarkers.fountain.style,
    ]; };
var fresh = detect_node_1.default
    ? function (fName) { return white(bgMagenta("\uD83D\uDCD6 \uD83D\uDC76 >\uD83D\uDC75 \uD83D\uDD04  " + fName + " \u231B \uD83D\uDCBA \u2B05\uFE0F \uD83D\uDC51 \uD83D\uDD14 \uD83D\uDCA8 ")) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.fresh), theming_1.madLogMarkers.fresh.style]; };
var grasslands = detect_node_1.default
    ? function (fName) { return black(bgGreen("^^^[" + fName + "]^^^")) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.grasslands),
        theming_1.madLogMarkers.grasslands.style,
    ]; };
var hatBlock = detect_node_1.default
    ? function (fName) { return bgCyan(black("\uD83C\uDFA9  " + fName + " \uD83C\uDFA9 ")) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.hatBlock),
        theming_1.madLogMarkers.hatBlock.style,
    ]; };
var hotPursuit = detect_node_1.default
    ? function (fName) { return bgRed(white(bold("\uD83C\uDF6F \uD83D\uDC3B  " + fName + " \uD83D\uDC1D \uD83D\uDC1D "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.hotPursuit),
        theming_1.madLogMarkers.hotPursuit.style,
    ]; };
var joy = detect_node_1.default
    ? function (fName) { return bgYellow(black("\uD83D\uDE00 \uD83D\uDE00  " + fName + " \uD83D\uDE00 \uD83D\uDE00 ")) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.joy), theming_1.madLogMarkers.joy.style]; };
var kingRageBlock = detect_node_1.default
    ? function (fName) { return bgRed(white(bold("\uD83D\uDC41\u200D\uD83D\uDDE8 \uD83D\uDDE3 \uD83D\uDDEF  " + fName + " \uD83D\uDC41\u200D\uD83D\uDDE8 \uD83D\uDDE3 \uD83D\uDDEF "))) + '  '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.kingRageBlock),
        theming_1.madLogMarkers.kingRageBlock.style,
    ]; };
var lakeLouise = detect_node_1.default
    ? function (fName) { return bgCyan(white(bold("\uD83C\uDFDE\uFE0F  " + fName + " \uD83C\uDFDE\uFE0F "))) + '  '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.lakeLouise),
        theming_1.madLogMarkers.lakeLouise.style,
    ]; };
var lucky = detect_node_1.default
    ? function (fName) { return bold(white(bgYellow("\uD83C\uDF40  " + fName + " \uD83C\uDF40 "))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.lucky), theming_1.madLogMarkers.lucky.style]; };
var maceWindu = detect_node_1.default
    ? function (fName) { return bold(white(bgMagenta("o==[" + fName + "]::::::::::::::::>"))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.maceWindu),
        theming_1.madLogMarkers.maceWindu.style,
    ]; };
var mechanicalAtFists = detect_node_1.default
    ? function (fName) { return bold(black(bgWhite("--#@[" + fName + "]@#--"))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.mechanicalAtFists),
        theming_1.madLogMarkers.mechanicalAtFists.style,
    ]; };
var moProblems = detect_node_1.default
    ? function (fName) { return bold(black(bgWhite("\uD83D\uDCB0 [" + fName + "] \uD83D\uDCB0 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.moProblems),
        theming_1.madLogMarkers.moProblems.style,
    ]; };
var mrsPotatoVHS = detect_node_1.default
    ? function (fName) { return underline(black(bgYellow("\uD83D\uDC43 \uD83D\uDC41 \uD83D\uDC42 " + fName + " \uD83D\uDC42 \uD83D\uDC41 \uD83D\uDC45 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.mrsPotatoVHS),
        theming_1.madLogMarkers.mrsPotatoVHS.style,
    ]; };
var neverEnough = detect_node_1.default
    ? function (fName) { return bold(blue(bgWhite("\uD83D\uDD14 \uD83D\uDC2E \uD83D\uDD14  " + fName + " \uD83D\uDD14 \uD83D\uDC2E \uD83D\uDD14 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.neverEnough),
        theming_1.madLogMarkers.neverEnough.style,
    ]; };
var nightmare = detect_node_1.default
    ? function (fName) { return bold(white(bgBlack(">:~ [" + fName + "] ~:<"))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.nightmare),
        theming_1.madLogMarkers.nightmare.style,
    ]; };
var ohMy = detect_node_1.default
    ? function (fName) { return black(bgGreen("\uD83E\uDD81 \uD83D\uDC2F \uD83D\uDC3B  " + fName + " \uD83D\uDC3B \uD83D\uDC2F \uD83E\uDD81 ")) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.ohMy), theming_1.madLogMarkers.ohMy.style]; };
var pipeDream = detect_node_1.default
    ? function (fName) { return bold(bgBlue(white("\u2523\u254B\u2501\u254B~\uD83D\uDEC0  " + fName + " \uD83D\uDEC0~\u254B\u2501\u254B\u252B"))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.pipeDream),
        theming_1.madLogMarkers.pipeDream.style,
    ]; };
var potOfGold = detect_node_1.default
    ? function (fName) { return italic(bold(yellow(bgBlack("\uD83D\uDCB0  " + fName + " \uD83D\uDCB0  ")))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.potOfGold),
        theming_1.madLogMarkers.potOfGold.style,
    ]; };
var probeArcade = detect_node_1.default
    ? function (fName) { return bold(cyan(bgBlue("\uD83D\uDC7D  " + fName + " \uD83D\uDC7D "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.probeArcade),
        theming_1.madLogMarkers.probeArcade.style,
    ]; };
var rainbowLeaf = detect_node_1.default
    ? function (fName) { return '🌈  ' + rainbow(fName) + ' 🌈  '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.rainbowLeaf),
        theming_1.madLogMarkers.rainbowLeaf.style,
    ]; };
var rockIsDead = detect_node_1.default
    ? function (fName) { return bold(bgBlack(magenta("\uD83C\uDFB8  " + fName + " \uD83C\uDFB8  "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.rockIsDead),
        theming_1.madLogMarkers.rockIsDead.style,
    ]; };
var seafoamSalad = detect_node_1.default
    ? function (fName) { return bold(white(bgGreen("\uD83C\uDF53  " + fName + " \uD83C\uDF45 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.seafoamSalad),
        theming_1.madLogMarkers.seafoamSalad.style,
    ]; };
var smokeyHatesChristmas = detect_node_1.default
    ? function (fName) { return white(bold(bgGreen("\uD83C\uDF84 \uD83D\uDD25  " + fName + " \uD83D\uDD25 \uD83C\uDF84 "))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.smokeyHatesChristmas),
        theming_1.madLogMarkers.smokeyHatesChristmas.style,
    ]; };
var springy = detect_node_1.default
    ? function (fName) { return underline(bold(white("\u2699\uFE0F  " + fName + " \u2699\uFE0F "))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.springy), theming_1.madLogMarkers.springy.style]; };
var swimmers = detect_node_1.default
    ? function (fName) { return underline(bold(bgWhite(blue("~~[" + fName + "]~~@")))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.swimmers),
        theming_1.madLogMarkers.swimmers.style,
    ]; };
var tangerines = detect_node_1.default
    ? function (fName) { return '🍊  ' + rainbow(fName) + ' 🍊  '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.tangerines),
        theming_1.madLogMarkers.tangerines.style,
    ]; };
var theBird = detect_node_1.default
    ? function (fName) { return white(bold(bgMagenta("\uD83D\uDD95\uD83C\uDFFC  " + fName + " \uD83D\uDD95\uD83C\uDFFC "))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.theBird), theming_1.madLogMarkers.theBird.style]; };
var theHeist = detect_node_1.default
    ? function (fName) { return underline(bold(white(bgBlack("[" + fName + "]")))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.theHeist),
        theming_1.madLogMarkers.theHeist.style,
    ]; };
var vendetta = detect_node_1.default
    ? function (fName) { return underline(bold(white(bgRed("[" + fName + "]")))) + ' '; }
    : function (fName) { return [
        buildFileTag(fName, theming_1.madLogMarkers.vendetta),
        theming_1.madLogMarkers.vendetta.style,
    ]; };
var xmlHell = detect_node_1.default
    ? function (fName) { return underline(bold(white(bgBlack("<<< " + fName + " >>>")))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.xmlHell), theming_1.madLogMarkers.xmlHell.style]; };
var zebra = detect_node_1.default
    ? function (fName) { return underline(bold(white(bgBlack("| | | " + fName + " | | |")))) + ' '; }
    : function (fName) { return [buildFileTag(fName, theming_1.madLogMarkers.zebra), theming_1.madLogMarkers.zebra.style]; };
/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
exports.isoStyles = {
    none: none,
    angryBird: angryBird,
    aquarium: aquarium,
    arrow: arrow,
    backAndForth: backAndForth,
    barbells: barbells,
    bracelet: bracelet,
    brainwave: brainwave,
    cantTouch: cantTouch,
    cartoonSwearing: cartoonSwearing,
    checkmate: checkmate,
    cult: cult,
    default: none,
    dirtRoad: dirtRoad,
    escherBarbieLego: escherBarbieLego,
    farmerBrown: farmerBrown,
    fountain: fountain,
    fresh: fresh,
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
    neverEnough: neverEnough,
    nightmare: nightmare,
    pipeDream: pipeDream,
    ohMy: ohMy,
    potOfGold: potOfGold,
    probeArcade: probeArcade,
    rainbowLeaf: rainbowLeaf,
    rockIsDead: rockIsDead,
    seafoamSalad: seafoamSalad,
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