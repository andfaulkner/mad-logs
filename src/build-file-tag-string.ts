const padEnd = require('string.prototype.padend');
const isFunction = (val): val is Function => ({}.toString.call(val) == '[object Function]');

/***************************************** ERROR MESSAGES *****************************************/
const colourizerTypeError =
    '[mad-logs] 2nd arg to buildFileTagString must be a function from the' +
    ' colors module, a number (representing r-pad length), or be excluded';
const filenameTypeError = '[mad-logs] 1st arg to buildFileTagString must be a string';
const tooManyArgsError =
    '[mad-logs] if 2nd arg to buildFileTagString is a number (representing ' +
    'right pad length), it must not receive a third arg.';

/**
 * Throws if buildFileTagString function (bldTag) is given invalid input
 * Input must be a string, rpad must be a number if it exists
 */
const validateBuildFileTagStringInput = (
    filename: string,
    colourizerOrRpad: number | any,
    rpad?: number
): void => {
    if (typeof filename !== 'string') {
        throw new TypeError(filenameTypeError);
    }
    if (
        colourizerOrRpad &&
        (!isFunction(colourizerOrRpad) && !colourizerOrRpad._styles) &&
        typeof colourizerOrRpad !== 'number'
    ) {
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
 * which a log originated, and make it easy to see in the CLI output without close inspection
 * Ensures consistency between generated tags (especially in terms of padding)
 *
 * @param  {string} fileName Name of originating file
 * @param  {function} colourizer Chain of composed colors.js functions, set up to apply all
 *                                 styles in the chain to any string it's passed to
 * @param {number} rpadLen Amount to pad tag with, on the right side
 * @return {string} styled output string
 */
const bldTag = (filename: string, colourizer?: Function | number, rpadLen?: number): string => {
    validateBuildFileTagStringInput(filename, colourizer, rpadLen);
    rpadLen = rpadLen || 20;

    // If the 2nd arg is a number, use that as the padding size
    const padlen = typeof colourizer === 'number' ? colourizer : rpadLen;

    // Colourize the filename, if a colourizer function is present
    const colouredFilename =
        colourizer && typeof colourizer === 'function' ? colourizer(filename) : filename;

    // Get width of the colour encoding info
    const colourWidth = colourizer ? colouredFilename.length - filename.length : 0;
    const TAG = padEnd(`${colouredFilename}`, padlen + colourWidth, ' ');
    return TAG;
};

export {bldTag as buildFileTagString};
