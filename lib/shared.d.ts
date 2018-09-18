import { isoStyles } from './src/isomorphic-styles';
/**************************************** TYPE DEFINITIONS ****************************************/
export interface Log {
    silly: <T>(...args: Array<(string | any)>) => T;
    verbose: <T>(...args: Array<(string | any)>) => T;
    debug: <T>(...args: Array<(string | any)>) => T;
    info: <T>(...args: Array<(string | any)>) => T;
    warn: <T>(...args: Array<(string | any)>) => T;
    error: <T>(...args: Array<(string | any)>) => T;
    wtf: <T>(...args: Array<(string | any)>) => T;
}
/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object
 * Logs differently between Node and Browser
 */
export declare class Log implements Log {
    /**
     * If defined, use this value for inspecting objects
     * Allows dependency injecting node's inspect in once, and getting it everywhere
     */
    static inspectFn: Function;
    protected filename: string;
    protected styler: typeof isoStyles[keyof typeof isoStyles];
    protected inspectFn: Function;
    /**
     * Constructor for Log object
     *
     * @param {string} fileName Current file name, to include before each
     *                          message this logger emits
     * @param {Function|string} style String-wrapping function OR 1 of
     *                                isoStyles' keys (string)
     *                                If `none` is given, pass to console.log
     *                                with fileName wrapped by [] & no styles
     * @param {Function?} inspectFn {OPTIONAL} If given, becomes new global
     *                              inspector for all Log objects
     *                              Uses a fallback inspect (passthrough) fn if
     *                              none provided
     *                              Allows DI of node's inspect without having
     *                              browser issues
     */
    constructor(filename: string, style?: keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles], inspectFn?: Function);
    silly: <T>(...args: any[]) => T;
    verbose: <T>(...args: any[]) => T;
    debug: <T>(...args: any[]) => T;
    info: <T>(...args: any[]) => T;
    warn: <T>(...args: any[]) => T;
    error: <T>(...args: any[]) => T;
    wtf: <T>(...args: any[]) => T;
    inspector: {
        silly: (obj: any) => string | void;
        verbose: (obj: any) => string | void;
        debug: (obj: any) => string | void;
        info: (obj: any) => string | void;
        warn: (obj: any) => string | void;
        error: (obj: any) => string | void;
        wtf: (obj: any) => string | void;
    };
}
/******************************************** FACTORY *********************************************/
/**
 * Use to construct a new Log object & return it
 *
 * @param {string} fileName Name of current file (to include before each message
 *                          this logger emits)
 * @param {Function|string} style String-wrapping function OR string matching 1
 *                                of isoStyles' keys
 * @return {Log & Function} Log instance
 *                          Also runs as standalone function (delegates to this.info)
 */
export declare const logFactory: (filename: string, style?: ((fName: string) => string) | ((fName: string) => string[]) | "none" | "angryBird" | "aquarium" | "arrow" | "backAndForth" | "barbells" | "bracelet" | "brainwave" | "cantTouch" | "cartoonSwearing" | "checkmate" | "cult" | "default" | "dirtRoad" | "escherBarbieLego" | "farmerBrown" | "fresh" | "grasslands" | "hatBlock" | "hotPursuit" | "joy" | "kingRageBlock" | "lakeLouise" | "lucky" | "maceWindu" | "mechanicalAtFists" | "moProblems" | "mrsPotatoVHS" | "neverEnough" | "nightmare" | "pipeDream" | "ohMy" | "potOfGold" | "probeArcade" | "rainbowLeaf" | "rockIsDead" | "seafoamSalad" | "smokeyHatesChristmas" | "springy" | "swimmers" | "tangerines" | "theBird" | "theHeist" | "vendetta" | "xmlHell" | "zebra", inspector?: Function) => Log & ((...args: any[]) => void) & {
    inspect: (obj: any) => string | void;
};
export { isoStyles as Styles };
