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
    lightBlue: string;
    darkMidnightBlue: string;
    midDarkGreen: string;
    deepRed: string;
    yellow: string;
    orangeBasic: string;
    yellowishGold: string;
    gold: string;
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
        style: string;
    };
    arrow: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    backAndForth: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    barbells: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    bracelet: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    brainwave: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    cartoonSwearing: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    checkmate: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    cult: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    default: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    dirtRoad: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    escherBarbieLego: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    farmerBrown: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    grasslands: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    hatBlock: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    hotPursuit: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    joy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    lakeLouise: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    lispyKatana: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    lucky: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    maceWindu: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    mechanicalAtFists: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    moProblems: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    nightmare: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    pipeDream: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    probeArcade: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    rockIsDead: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    swimmers: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    smokeyHatesChristmas: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    springy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    tangerines: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    theBird: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    theHeist: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    vendetta: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    xmlHell: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    zebra: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
};
export declare const logMarkers: {} & {
    angryBird: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    arrow: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    backAndForth: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    barbells: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    bracelet: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    brainwave: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    cartoonSwearing: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    checkmate: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    cult: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    default: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    dirtRoad: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    escherBarbieLego: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    farmerBrown: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    grasslands: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    hatBlock: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    hotPursuit: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    joy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    lakeLouise: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    lispyKatana: {
        tagSuffix: string;
        tagPrefix: string;
        style: string;
    };
    lucky: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    maceWindu: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    mechanicalAtFists: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    moProblems: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    nightmare: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    pipeDream: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    probeArcade: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    rockIsDead: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    swimmers: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    smokeyHatesChristmas: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    springy: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    tangerines: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    theBird: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    theHeist: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    vendetta: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    xmlHell: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
    zebra: {
        tagPrefix: string;
        tagSuffix: string;
        style: string;
    };
};
