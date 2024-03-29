/// <reference path="./typings/index.d.ts" />
import colors from '@colors/colors';

/****
 *
 * Taken from colors - this is a collection of styles that are nicely visible on the terminal.
 * It was a royal pain in the ass determining which were good and which were invisible.
 *
 * WIP - not included in library yet.
 *
 */
export const serverStyles = {
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
