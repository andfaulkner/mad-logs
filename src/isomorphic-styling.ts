import isNode from 'detect-node';

const cssInverse = `filter: invert(100%); -moz-filter: invert(100%); -webkit-filter: invert(100%);`;

// prettier-ignore
/**
 * Collection of atomic styles that can be used in both the browser and the cli
 */
export const isoStyling = {
    default: isNode ? `\u001b[49m\u001b[0m` : `color: black; background-color: white;`,

    // Colors
    black:         isNode ? `\u001b[30m` : `color: #333`,
    blue:          isNode ? `\u001b[34m` : `color: #3498db`,
    cyan:          isNode ? `\u001b[36m` : `color: #00FFFF`,
    gray:          isNode ? `\u001b[90m` : `color: #7f8c8d`,
    grey:          isNode ? `\u001b[90m` : `color: #7f8c8d`,
    green:         isNode ? `\u001b[32m` : `color: #2ecc71`,
    magenta:       isNode ? `\u001b[35m` : `color: #8e44ad`,
    red:           isNode ? `\u001b[31m` : `color: #e74c3c`,
    white:         isNode ? `\u001b[37m` : `color: #fff`,
    yellow:        isNode ? `\u001b[33m` : `color: #f1c40f`,

    // Background colors
    bgBlack:       isNode ? `\u001b[40m` : `background-color: #333`,
    bgBlue:        isNode ? `\u001b[44m` : `background-color: #3498db`,
    bgCyan:        isNode ? `\u001b[46m` : `background-color: #00ffff`,
    bgGray:        isNode ? `\u001b[47m` : `background-color: #7f8c8d`,
    bgGrey:        isNode ? `\u001b[47m` : `background-color: #7f8c8d`,
    bgGreen:       isNode ? `\u001b[42m` : `background-color: #2ecc71`,
    bgMagenta:     isNode ? `\u001b[45m` : `background-color: #8e44ad`,
    bgRed:         isNode ? `\u001b[41m` : `background-color: #e74c3c`,
    bgWhite:       isNode ? `\u001b[47m` : `background-color: #fff`,
    bgYellow:      isNode ? `\u001b[43m` : `background-color: #f1c40f`,

    // Misc style settings
    blink:         isNode ? `\u001b[5m` : `text-decoration: blink`,
    bold:          isNode ? `\u001b[1m` : `font-weight: bold`,
    dim:           isNode ? `\u001b[2m` : `opacity: .8`,
    hidden:        isNode ? `\u001b[8m` : `visibility: hidden`,
    inverse:       isNode ? `\u001b[7m` : cssInverse ,
    italic:        isNode ? `\u001b[3m` : `font-style: italic`,
    strikethrough: isNode ? `\u001b[9m` : `text-decoration: line-through`,
    underline:     isNode ? `\u001b[4m` : `text-decoration: underline`,
};
