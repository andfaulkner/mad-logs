const cssInverse = 'filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);';


/**
 * @EXPORT
 * Collection of styles that can be used in both the browser and the cli
 */
export const isomorphicStyles = {

    default: {
        cli:     '\u001b[49m\u001b[0m',
        browser: 'color: black; background-color: white;'
    },

    // Colors
    black:         { cli: '\u001b[30m', browser: 'color: #333'                  },
    blue:          { cli: '\u001b[34m', browser: 'color: #3498db'               },
    cyan:          { cli: '\u001b[36m', browser: 'color: #00FFFF'               },
    gray:          { cli: '\u001b[90m', browser: 'color: #7f8c8d'               },
    grey:          { cli: '\u001b[90m', browser: 'color: #7f8c8d'               },
    green:         { cli: '\u001b[32m', browser: 'color: #2ecc71'               },
    magenta:       { cli: '\u001b[35m', browser: 'color: #8e44ad'               },
    red:           { cli: '\u001b[31m', browser: 'color: #e74c3c'               },
    white:         { cli: '\u001b[37m', browser: 'color: #fff'                  },
    yellow:        { cli: '\u001b[33m', browser: 'color: #f1c40f'               },

    // Background colors
    bgBlack:       { cli: '\u001b[40m', browser: 'background-color: #333'       },
    bgBlue:        { cli: '\u001b[44m', browser: 'background-color: #3498db'    },
    bgCyan:        { cli: '\u001b[46m', browser: 'background-color: #00ffff'    },
    bgGray:        { cli: '\u001b[47m', browser: 'background-color: #7f8c8d'    },
    bgGrey:        { cli: '\u001b[47m', browser: 'background-color: #7f8c8d'    },
    bgGreen:       { cli: '\u001b[42m', browser: 'background-color: #2ecc71'    },
    bgMagenta:     { cli: '\u001b[45m', browser: 'background-color: #8e44ad'    },
    bgRed:         { cli: '\u001b[41m', browser: 'background-color: #e74c3c'    },
    bgWhite:       { cli: '\u001b[47m', browser: 'background-color: #fff'       },
    bgYellow:      { cli: '\u001b[43m', browser: 'background-color: #f1c40f'    },

    // Misc style settings
    blink:         { cli: '\u001b[5m', browser: 'text-decoration: blink'        },
    bold:          { cli: '\u001b[1m', browser: 'font-weight: bold'             },
    dim:           { cli: '\u001b[2m', browser: 'opacity: .8'                   },
    hidden:        { cli: '\u001b[8m', browser: 'visibility: hidden'            },
    inverse:       { cli: '\u001b[7m', browser: cssInverse                      },
    italic:        { cli: '\u001b[3m', browser: 'font-style: italic'            },
    strikethrough: { cli: '\u001b[9m', browser: 'text-decoration: line-through' },
    underline:     { cli: '\u001b[4m', browser: 'text-decoration: underline'    },
};

// const styler = ()