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
    rainbow: (str: string) => string;
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
export declare const isoStyles: Record<string, ((fName: string) => string) | ((fName: string) => any[])>;
export { node as nodeStyling };
