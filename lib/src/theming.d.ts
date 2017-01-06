/************************************************************************************************
 *
 * Colours and styles for use in console log messages
 *
 */
export declare const colours: {
    violet: string;
    orange: string;
    brown: string;
    maroon: string;
    blue: string;
    darkMidnightBlue: string;
    deepRed: string;
    yellowishGold: string;
    darkGray: string;
    hotPink: string;
    tan: string;
    white: string;
    indigo: string;
    green: string;
    darkGreen: string;
    gray: string;
    cyan: string;
    black: string;
    ultraPaleGreen: string;
};
export declare const style: {
    bold: string;
    underline: string;
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
export declare const madLogMarkers: {
    angryBird: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    arrow: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    backAndForth: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    barbells: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    brainwave: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    cartoonSwearing: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    checkmate: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    default: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    dirtRoad: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    escherBarbieLego: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    farmerBrown: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    grasslands: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    lispyKatana: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    maceWindu: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    lakeLouise: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    nightmare: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    swimmers: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    tangerines: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    springy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    vendetta: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    xmlHell: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
};
export declare const saneLogMarkers: {};
export declare const logMarkers: {} & {
    angryBird: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    arrow: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    backAndForth: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    barbells: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    brainwave: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    cartoonSwearing: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    checkmate: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    default: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    dirtRoad: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    escherBarbieLego: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    farmerBrown: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    grasslands: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    lispyKatana: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    maceWindu: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    lakeLouise: {
        tagSuffix: string;
        tagPrefix: string;
        style: string | ((msg: any) => string);
    };
    nightmare: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    swimmers: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    tangerines: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    springy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    vendetta: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
    xmlHell: {
        tagPrefix: string;
        tagSuffix: string;
        style: string | ((msg: any) => string);
    };
};
