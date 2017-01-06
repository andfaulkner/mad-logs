const cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';

// TODO implement such that the currently active color is stored here, to allow "toggling"
// of colour changes
let cliCurrentStyles = {
    bgColor: '\u001b[49m',
    color: '\u001b[39m',
    attributes: '\u001b[0m',
};

/**
 * @EXPORT
 * Collection of styles that can be used in both the browser and the cli
 */
export const isomorphicStyles = {

    default: {
        cli: `\u001b[49m\u001b[0m\u001b[0m`,
        browser: 'color: black; background-color: white;'
    },

    // Colors
    black: {
        cli: (msg) => `\u001b[30m${msg}\u001b[39m`,
        browser: 'color: #333'
    },
    blue: {
        cli: (msg) => `\u001b[34m${msg}\u001b[39m`,
        browser: 'color: #3498db'
    },
    cyan: {
        cli: (msg) => `\u001b[36m${msg}\u001b[39m`,
        browser: 'color: #00FFFF'
    },
    gray: {
        cli: (msg) => `\u001b[90m${msg}\u001b[99m`,
        browser: 'color: #7f8c8d'
    },
    grey: {
        cli: (msg) => `\u001b[90m${msg}\u001b[99m`,
        browser: 'color: #7f8c8d'
    },
    green: {
        cli: (msg) => `\u001b[32m${msg}\u001b[39m`,
        browser: 'color: #2ecc71'
    },
    magenta: {
        cli: (msg) => `\u001b[35m${msg}\u001b[39m`,
        browser: 'color: #8e44ad'
    },
    red: {
        cli: (msg) => `\u001b[31m${msg}\u001b[39m`,
        browser: 'color: #e74c3c'
    },
    white: {
        cli: (msg) => `\u001b[37m${msg}\u001b[39m`,
        browser: 'color: #fff'
    },
    yellow: {
        cli: (msg) => `\u001b[33m${msg}\u001b[39m`,
        browser: 'color: #f1c40f'
    },

    // Background colors
    bgBlack: {
        cli: (msg) => `\u001b[40m${msg}\u001b[49m`,
        browser: 'background-color: #333'
    },
    bgBlue: {
        cli: (msg) => `\u001b[44m${msg}\u001b[49m`,
        browser: 'background-color: #3498db'
    },
    bgCyan: {
        cli: (msg) => `\u001b[46m${msg}\u001b[49m`,
        browser: 'background-color: #00ffff'
    },
    bgGray: {
        cli: (msg) => `\u001b[47m${msg}\u001b[49m`,
        browser: 'background-color: #7f8c8d'
    },
    bgGrey: {
        cli: (msg) => `\u001b[47m${msg}\u001b[49m`,
        browser: 'background-color: #7f8c8d'
    },
    bgGreen: {
        cli: (msg) => `\u001b[42m${msg}\u001b[49m`,
        browser: 'background-color: #2ecc71'
    },
    bgMagenta: {
        cli: (msg) => `\u001b[45m${msg}\u001b[49m`,
        browser: 'background-color: #8e44ad'
    },
    bgRed: {
        cli: (msg) => `\u001b[41m${msg}\u001b[49m`,
        browser: 'background-color: #e74c3c'
    },
    bgWhite: {
        cli: (msg) => `\u001b[47m${msg}\u001b[49m`,
        browser: 'background-color: #fff'
    },
    bgYellow: {
        cli: (msg) => `\u001b[43m${msg}\u001b[49m`,
        browser: 'background-color: #f1c40f'
    },

    // Misc style settings
    blink: {
        cli: (msg) => `\u001b[5m${msg}\u001b[9m`,
        browser: 'text-decoration: blink'
    },
    bold: {
        cli: (msg) => `\u001b[1m${msg}\u001b[9m`,
        browser: 'font-weight: bold'
    },
    dim: {
        cli: (msg) => `\u001b[2m${msg}\u001b[9m`,
        browser: 'opacity: .8'
    },
    hidden: {
        cli: (msg) => `\u001b[8m${msg}\u001b[9m`,
        browser: 'visibility: hidden'
    },
    inverse: {
        cli: (msg) => `\u001b[7m${msg}\u001b[9m`,
        browser: cssInverse 
    },
    italic: {
        cli: (msg) => `\u001b[3m${msg}\u001b[9m`,
        browser: 'font-style: italic'
    },
    strikethrough: {
        cli: (msg) => `\u001b[9m${msg}\u001b[9m`,
        browser: 'text-decoration: line-through'
    },
    underline: {
        cli: (msg) => `\u001b[4m${msg}\u001b[9m`,
        browser: 'text-decoration: underline'
    },
};
