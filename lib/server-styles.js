"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./typings/index.d.ts" />
var colors = require("colors");
/****
 *
 * Taken from colors - this is a collection of styles that are nicely visible on the terminal.
 * It was a royal pain in the ass determining which were good and which were invisible.
 *
 * WIP - not included in library yet.
 *
 */
exports.serverStyles = {
    blueBgWhite: colors.bgMagenta.white,
    magentaBgWhite: colors.bgMagenta.white,
    cyanBgBlack: colors.bgBlack.cyan,
    whiteBgYellow: colors.bgYellow.white,
    whiteBgBlack: colors.bgBlack.white,
    blackBgCyanItalic: colors.bgCyan.black.italic,
    blackBgGreen: colors.bgGreen.black,
    blackBgYellow: colors.bgYellow.black,
    blackBgWhite: colors.bgWhite.black,
};
//# sourceMappingURL=server-styles.js.map