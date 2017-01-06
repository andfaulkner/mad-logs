import isNode from 'detect-node';
import { isomorphicStyles as iStyl } from './isomorphic-styles';

/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
export const colours = {
    violet:           '#551A8B',
    orange:           '#EE7600',
    brown:            '#593001',
    maroon:           '#5d0000',
    blue:             '#0000FF',
    darkMidnightBlue: '#003366',
    deepRed:          '#800000',
    yellowishGold:    '#E5C100',
    darkGray:         '#818181',
    hotPink:          '#FF69B4',
    tan:              '#C4AEAD',
    white:            '#FFFFFF',
    indigo:           '#4B0082',
    green:            '#00FF00',
    darkGreen:        '#004000',
    gray:             '#777777',
    cyan:             '#00FFFF',
    black:            '#000000',
    ultraPaleGreen:   '#f0fff0',
};

export const style = {
    bold:      'font-weight: bold;',
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
export const madLogMarkers = {
    angryBird: {
        tagPrefix: '＼(｀0´)／',
        tagSuffix: '',
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgYellow.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.yellowishGold};`,
    },
    arrow: {
        tagPrefix: '>>--',
        tagSuffix: '---|> ',
        style: '',
    },
    backAndForth: {
        tagPrefix: '))><((',
        tagSuffix: '))><((',
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bold.cli(iStyl.underline.cli(msg))))
                        : `color: ${colours.brown}; ${style.bold} ${style.underline}`,
    },
    barbells: {
        tagSuffix: '--()-()',
        tagPrefix: '()-()--',
        style: (isNode) ? ((msg) => iStyl.gray.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.darkGray}; ${style.bold}`,
    },
    brainwave: {
        tagPrefix: '~^~^~^-',
        tagSuffix: '-~^~^~^',
        style: (isNode) ? ((msg) => iStyl.blue.cli(iStyl.bgWhite.cli(msg)))
                        : `color: ${colours.darkMidnightBlue};`,
    },
    cartoonSwearing: {
        tagPrefix: '@%@%@%',
        tagSuffix: '@%@%@%',
        style: (isNode) ? ((msg) => iStyl.magenta.cli(iStyl.bold.cli(msg)))
                        : `color: ${colours.indigo}`,
    },
    checkmate: {
        tagPrefix: '♜♞♝♚♛♝♞♜_',
        tagSuffix: '_♟♟♟♟♟♟♟♟',
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(msg)))
                        : `color: ${colours.brown}`,
    },
    default: {
        tagPrefix: '[',
        tagSuffix: ']',
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(msg)))
                        : `color: ${colours.darkGreen}`,
    },
    dirtRoad: {
        tagSuffix: '= = = =',
        tagPrefix: '= = = =',
        style: (isNode) ? `${iStyl.bgGray}${iStyl.yellow}${iStyl.bold}`
                        : `color:          ${colours.tan};
                           ${style.bold}
                           border-top:     1px inset ${colours.tan};
                           border-bottom:  1px inset ${colours.tan};
                           border-color:   ${colours.tan};
                           padding-top:    2px;
                           padding-bottom: 2px;
                           margin-top:     2px;
                           margin-bottom:  2px;`,
    },
    escherBarbieLego: {
        tagPrefix: '||┗┛┏┓',
        tagSuffix: '┏┓┗┛||',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : 'background-color: ${colours.hotPink}; color: ${colours.white}',
    },
    farmerBrown: {
        tagPrefix: '[🐑🐂🐑]-',
        tagSuffix: '-[🐑🐂🐑] ',
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : '',
    },
    grasslands: {
        tagSuffix: '^^^^',
        tagPrefix: '^^^^',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.green}; ${style.bold}`,
    },
    lispyKatana: {
        tagSuffix: ';;;;;;;;;;;;;;()()',
        tagPrefix: '',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.gray}; ${style.bold}`,
    },
    maceWindu: {
        tagPrefix: '',
        tagSuffix: ' o==[]::::::::::::::::> ',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.violet}; ${style.bold}`,
    },
    lakeLouise: {
        tagSuffix: '^^\\/\\/\\/\\/\\/\\/',
        tagPrefix: '\\/\\/\\/\\/\\/\\/^^',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.cyan};`,
    },
    nightmare: {
        tagPrefix: '>:~',
        tagSuffix: '~:<',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.white}; background-color: ${colours.black};`,
    },
    swimmers: {
        tagPrefix: '~~~~@ ',
        tagSuffix: '',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.blue}; ${style.bold}`,
    },
    tangerines: {
        tagPrefix: 'o(o)(){o}()@(o)OO@(){O}() _ ',
        tagSuffix: ' _ ()()()*()',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.orange};`,
    },
    springy: {
        tagPrefix: '◀-\\__/--',
        tagSuffix: '--\\__/-►',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.blue}; background-color: ${colours.white};`,
    },
    vendetta: {
        tagPrefix: "/~~VVV~~|| ",
        tagSuffix: ' ||~~VVV~~\\',
        // TODO change node colours
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : `color: ${colours.deepRed}; ` +
               `${style.bold} background-color: ${colours.ultraPaleGreen}`,
    },
    xmlHell: {
        tagPrefix: '<<<<<>>>>>',
        tagSuffix: ' >> ',
        style: (isNode) ? ((msg) => iStyl.black.cli(iStyl.bgWhite.cli(iStyl.bold.cli(msg))))
                        : '',
    },
};

// TODO - WIP
export const saneLogMarkers = {
    // tagPrefix: `${iStyl.blue.cli}${iStyl.bgWhite.cli}`,
    // tagSuffix: `${iStyl.default}${iStyl.default}`,
    // blueOnWhite: (iStyl.blue.cli + iStyl.bgWhite.cli),
};

export const logMarkers = Object.assign({}, madLogMarkers/*, saneLogMarkers*/);
