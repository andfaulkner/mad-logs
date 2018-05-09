/**
 * @export
 * Collection of atomic styles that can be used in both the browser and the cli.
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
/***************************************** STYLES EXPORT ******************************************/
/**
 * Series of isomorphic styles (One style for the browser, another for Node)
 */
export declare const isoStyles: {
    a: ((fName: string) => string) | ((fName: string) => string[]);
    aquarium: ((fName: string) => string) | ((fName: string) => string[]);
    b: ((fName: string) => string) | ((fName: string) => string[]);
    rainbowLeaf: ((fName: string) => string) | ((fName: string) => string[]);
    c: ((fName: string) => string) | ((fName: string) => string[]);
    lucky: ((fName: string) => string) | ((fName: string) => string[]);
    d: ((fName: string) => string) | ((fName: string) => string[]);
    probeArcade: ((fName: string) => string) | ((fName: string) => string[]);
    e: ((fName: string) => string) | ((fName: string) => string[]);
    potOfGold: ((fName: string) => string) | ((fName: string) => string[]);
    f: ((fName: string) => string) | ((fName: string) => string[]);
    cult: ((fName: string) => string) | ((fName: string) => string[]);
    g: ((fName: string) => string) | ((fName: string) => string[]);
    bracelet: ((fName: string) => string) | ((fName: string) => string[]);
    h: ((fName: string) => string) | ((fName: string) => string[]);
    rockIsDead: ((fName: string) => string) | ((fName: string) => string[]);
    i: ((fName: string) => string) | ((fName: string) => string[]);
    smokeyHatesChristmas: ((fName: string) => string) | ((fName: string) => string[]);
    j: ((fName: string) => string) | ((fName: string) => string[]);
    joy: ((fName: string) => string) | ((fName: string) => string[]);
    k: ((fName: string) => string) | ((fName: string) => string[]);
    hatBlock: ((fName: string) => string) | ((fName: string) => string[]);
    l: ((fName: string) => string) | ((fName: string) => string[]);
    theHeist: ((fName: string) => string) | ((fName: string) => string[]);
};
export { node as nodeStyling };
