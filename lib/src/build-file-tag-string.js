"use strict";
var padEnd = require('string.prototype.padend');
var isFunction = require('lodash.isfunction');
var validateBuildFileTagStringInput = function (filename, colourizer, rpadLen) {
    var colourizerTypeError = '[mad-logs] 2nd arg to buildFileTagString must be a function ' +
        'from the "colors" module, or be excluded';
    var filenameTypeError = '[mad-logs] 1st arg to buildFileTagString must be a string';
    if (typeof filename !== 'string') {
        console.error(filenameTypeError);
        throw new TypeError(filenameTypeError);
    }
    if ((colourizer
        && (!isFunction(colourizer) && !colourizer._styles))
        && (typeof colourizer !== 'number')) {
        console.error(colourizerTypeError);
        throw new TypeError(colourizerTypeError);
    }
    if (colourizer && isFunction(colourizer) && !colourizer._styles) {
        console.error(colourizerTypeError);
        throw new TypeError(colourizerTypeError);
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
    if (rpadLen === void 0) { rpadLen = 20; }
    validateBuildFileTagStringInput(filename, colourizer, rpadLen);
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