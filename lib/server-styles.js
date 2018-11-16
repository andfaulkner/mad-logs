"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./typings/index.d.ts" />
var colors_1 = __importDefault(require("colors"));
/****
 *
 * Taken from colors - this is a collection of styles that are nicely visible on the terminal.
 * It was a royal pain in the ass determining which were good and which were invisible.
 *
 * WIP - not included in library yet.
 *
 */
exports.serverStyles = {
    blueBgWhite: colors_1.default.bgMagenta.white,
    magentaBgWhite: colors_1.default.bgMagenta.white,
    cyanBgBlack: colors_1.default.bgBlack.cyan,
    whiteBgYellow: colors_1.default.bgYellow.white,
    whiteBgBlack: colors_1.default.bgBlack.white,
    blackBgCyanItalic: colors_1.default.bgCyan.black.italic,
    blackBgGreen: colors_1.default.bgGreen.black,
    blackBgYellow: colors_1.default.bgYellow.black,
    blackBgWhite: colors_1.default.bgWhite.black,
};
//# sourceMappingURL=server-styles.js.map