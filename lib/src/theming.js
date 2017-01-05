"use strict";
const detect_node_1 = require("detect-node");
const isomorphic_styles_1 = require("./isomorphic-styles");
/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
exports.colours = {
    violet: '#551A8B',
    orange: '#EE7600',
    brown: '#593001',
    maroon: '#5d0000',
    blue: '#0000FF',
    darkMidnightBlue: '#003366',
    deepRed: '#800000',
    yellowishGold: '#E5C100',
    darkGray: '#818181',
    hotPink: '#FF69B4',
    tan: '#C4AEAD',
    white: '#FFFFFF',
    indigo: '#4B0082',
    green: '#00FF00',
    darkGreen: '#004000',
    gray: '#777777',
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
 *   Collection of predefined styles for differentiating logs between separate files. Values are
 *   intended for by the logFactory, to apply a theme to a specific logger object.
 *
 *   -   tagPrefix:     string to show to left of module name in log output
 *   -   tagSuffix:     string to show to right of module name, but before the message
 *   -   style:         string of CSS style directives separated by ;s. Used to style the
 *                      tag (i.e. ${tagPrefix}${filename}${tagSuffix}) beside each log.
 *
 * @example logFactory()('my-cool-file', madLogMarkers.cartoonSwearing)
 * @example logFactory()('my-cool-file', madLogMarkers.vendetta)
 *
 */
exports.madLogMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.black}${isomorphic_styles_1.isomorphicStyles.bgYellow}${isomorphic_styles_1.isomorphicStyles.bold}`
            : `color: ${exports.colours.yellowishGold};`,
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.black}${isomorphic_styles_1.isomorphicStyles.bold}${isomorphic_styles_1.isomorphicStyles.underline}`
            : `color: ${exports.colours.brown}; ${exports.style.bold} ${exports.style.underline}`,
    },
    barbells: {
        tagSuffix: '--()-()',
        tagPrefix: '()-()--',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.gray}${isomorphic_styles_1.isomorphicStyles.bgWhite}${isomorphic_styles_1.isomorphicStyles.bold}`
            : `color: ${exports.colours.darkGray}; ${exports.style.bold}`,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.blue}${isomorphic_styles_1.isomorphicStyles.bgWhite}`
            : `color: ${exports.colours.darkMidnightBlue};`,
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.magenta}${isomorphic_styles_1.isomorphicStyles.bold}`
            : `color: ${exports.colours.indigo}`,
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_',
        tagSuffix: '_♟♟♟♟♟♟♟♟',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.black}${isomorphic_styles_1.isomorphicStyles.bgWhite}`
            : `color: ${exports.colours.brown}`,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.black}${isomorphic_styles_1.isomorphicStyles.bgWhite}`
            : `color: ${exports.colours.darkGreen}`,
    },
    dirtRoad: {
        tagSuffix: '= = = =',
        tagPrefix: '= = = =',
        style: (detect_node_1.default) ? `${isomorphic_styles_1.isomorphicStyles.bgGray}${isomorphic_styles_1.isomorphicStyles.yellow}${isomorphic_styles_1.isomorphicStyles.bold}`
            : `color:          ${exports.colours.tan};
                           ${exports.style.bold}
                           border-top:     1px inset ${exports.colours.tan};
                           border-bottom:  1px inset ${exports.colours.tan};
                           border-color:   ${exports.colours.tan};
                           padding-top:    2px;
                           padding-bottom: 2px;
                           margin-top:     2px;
                           margin-bottom:  2px;`,
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        style: 'background-color: ${colours.hotPink}; color: ${colours.white}',
    },
    farmerBrown: {
        tagPrefix: '[🐑🐂🐑]-',
        tagSuffix: '-[🐑🐂🐑] ',
        style: '',
    },
    grasslands: {
        tagSuffix: '^^^^',
        tagPrefix: '^^^^',
        style: `color: ${exports.colours.green}; ${exports.style.bold}`,
    },
    lispyKatana: {
        tagSuffix: ';;;;;;;;;;;;;;()()',
        tagPrefix: '',
        style: `color: ${exports.colours.gray}; ${exports.style.bold}`,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        style: `color: ${exports.colours.violet}; ${exports.style.bold}`,
    },
    lakeLouise: {
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        style: `color: ${exports.colours.cyan};`,
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        style: `color: ${exports.colours.white}; background-color: ${exports.colours.black};`,
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        style: `color: ${exports.colours.blue}; ${exports.style.bold}`,
    },
    tangerines: {
        tagPrefix: 'o(o)(){o}()@(o)OO@(){O}() _ ',
        tagSuffix: ' _ ()()()*()',
        style: `color: ${exports.colours.orange};`,
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        style: `color: ${exports.colours.blue}; background-color: ${exports.colours.white};`,
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        style: `color: ${exports.colours.deepRed}; ` +
            `${exports.style.bold} background-color: ${exports.colours.ultraPaleGreen}`,
    },
    xmlHell: {
        tagPrefix: '<<<<<>>>>>',
        tagSuffix: ' >> ',
        style: '',
    },
};
exports.saneLogMarkers = {
    blueOnWhite: (isomorphic_styles_1.isomorphicStyles.blue.cli + isomorphic_styles_1.isomorphicStyles.bgWhite.cli),
};
exports.logMarkers = Object.assign({}, exports.madLogMarkers, exports.saneLogMarkers);
//# sourceMappingURL=theming.js.map