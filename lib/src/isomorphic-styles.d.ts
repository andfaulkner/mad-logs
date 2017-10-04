/**
 * @export
 * Collection of styles that can be used in both the browser and the cli
 */
export declare const isomorphicStyles: {
    default: {
        cli: string;
        browser: string;
    };
    black: {
        cli: string;
        browser: string;
    };
    blue: {
        cli: string;
        browser: string;
    };
    cyan: {
        cli: string;
        browser: string;
    };
    gray: {
        cli: string;
        browser: string;
    };
    grey: {
        cli: string;
        browser: string;
    };
    green: {
        cli: string;
        browser: string;
    };
    magenta: {
        cli: string;
        browser: string;
    };
    red: {
        cli: string;
        browser: string;
    };
    white: {
        cli: string;
        browser: string;
    };
    yellow: {
        cli: string;
        browser: string;
    };
    bgBlack: {
        cli: string;
        browser: string;
    };
    bgBlue: {
        cli: string;
        browser: string;
    };
    bgCyan: {
        cli: string;
        browser: string;
    };
    bgGray: {
        cli: string;
        browser: string;
    };
    bgGrey: {
        cli: string;
        browser: string;
    };
    bgGreen: {
        cli: string;
        browser: string;
    };
    bgMagenta: {
        cli: string;
        browser: string;
    };
    bgRed: {
        cli: string;
        browser: string;
    };
    bgWhite: {
        cli: string;
        browser: string;
    };
    bgYellow: {
        cli: string;
        browser: string;
    };
    blink: {
        cli: string;
        browser: string;
    };
    bold: {
        cli: string;
        browser: string;
    };
    dim: {
        cli: string;
        browser: string;
    };
    hidden: {
        cli: string;
        browser: string;
    };
    inverse: {
        cli: string;
        browser: string;
    };
    italic: {
        cli: string;
        browser: string;
    };
    strikethrough: {
        cli: string;
        browser: string;
    };
    underline: {
        cli: string;
        browser: string;
    };
};
/****************************************** NODE STYLES *******************************************/
declare const node: {
    black: (str: string) => string;
    red: (str: string) => string;
    green: (str: string) => string;
    yellow: (str: string) => string;
    blue: (str: string) => string;
    magenta: (str: string) => string;
    cyan: (str: string) => string;
    white: (str: string) => string;
    gray: (str: string) => string;
    bgBlack: (str: string) => string;
    bgRed: (str: string) => string;
    bgGreen: (str: string) => string;
    bgYellow: (str: string) => string;
    bgBlue: (str: string) => string;
    bgMagenta: (str: string) => string;
    bgCyan: (str: string) => string;
    bgWhite: (str: string) => string;
    bold: (str: string) => string;
    underline: (str: string) => string;
    italic: (str: string) => string;
};
export interface LogOpts {
    tagPrefix: string;
    tagSuffix: string;
    style: string;
}
export declare const isoStyles: {
    a: (fileName: string) => string;
    b: (fileName: string) => string;
    c: (fileName: string) => string;
    d: (fileName: string) => string;
    e: (fileName: string) => string;
    f: (fileName: string) => string;
    g: (fileName: string) => string;
};
export { node as nodeStyling };
