"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var padEnd = require('string.prototype.padend');
var isFunction = require('lodash.isfunction');
/***************************************** ERROR MESSAGES *****************************************/
var colourizerTypeError = '[mad-logs] 2nd arg to buildFileTagString must be a function from the' +
    ' colors module, a number (representing r-pad length), or be excluded';
var filenameTypeError = '[mad-logs] 1st arg to buildFileTagString must be a string';
var tooManyArgsError = '[mad-logs] if 2nd arg to buildFileTagString is a number (representing ' +
    'right pad length), it must not receive a third arg.';
/**
 * Throws if buildFileTagString function (bldTag) is given invalid input.
 * Input must be a string, rpad must be a number if it exists.
 */
var validateBuildFileTagStringInput = function (filename, colourizerOrRpad, rpad) {
    if (typeof filename !== 'string') {
        throw new TypeError(filenameTypeError);
    }
    if ((colourizerOrRpad
        && (!isFunction(colourizerOrRpad) && !colourizerOrRpad._styles))
        && (typeof colourizerOrRpad !== 'number')) {
        throw new TypeError(colourizerTypeError);
    }
    if (colourizerOrRpad && isFunction(colourizerOrRpad) && !colourizerOrRpad._styles) {
        throw new TypeError(colourizerTypeError);
    }
    if (typeof colourizerOrRpad === 'number' && typeof rpad !== 'undefined' && rpad != null) {
        throw new TypeError(tooManyArgsError);
    }
};
/**
 * Build and return tag string for prepending to log outputs. Intended to ID the file from
 * which a log originated, and make it easy to see in the CLI output without close inspection.
 * Ensures consistency between generated tags (especially in terms of padding)
 *
 * @param  {string} fileName - name of originating file
 * @param  {function} colourizer - chain of composed colors.js functions, set up to apply all
 *                                 styles in the chain to any string it's passed to
 * @param {number} rpadLen - amount to pad tag with, on the right side
 * @return {string} styled output string
 */
var bldTag = function (filename, colourizer, rpadLen) {
    validateBuildFileTagStringInput(filename, colourizer, rpadLen);
    rpadLen = rpadLen || 20;
    // if the 2nd arg is a number, use that as the padding size
    var padlen = (typeof colourizer === 'number')
        ? colourizer
        : rpadLen;
    // colourize the filename, if a colourizer function is present
    var colouredFilename = (colourizer && typeof colourizer === 'function')
        ? colourizer(filename)
        : filename;
    // get width of the colour encoding info
    var colourWidth = (colourizer)
        ? (colouredFilename.length - filename.length)
        : 0;
    var TAG = padEnd("" + colouredFilename, padlen + colourWidth, ' ');
    return TAG;
};
exports.buildFileTagString = bldTag;
//# sourceMappingURL=build-file-tag-string.js.map