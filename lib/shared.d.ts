import { isoStyles } from './src/isomorphic-styles';
/**************************************** TYPE DEFINITIONS ****************************************/
/**
 * Available log levels in the application
 */
export declare type LogLevels = keyof Log['inspector'];
/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object
 *
 * Logs differently between node.js & browser when given the same styles
 * Avoids need for separate browser & node modules
 */
export declare class Log {
    /**
     * If defined, use this value for inspecting objects
     * Allows dependency injecting node's inspect in once & getting it everywhere
     */
    static inspectFn: Function;
    protected filename: string;
    protected styler: typeof isoStyles[keyof typeof isoStyles];
    protected inspectFn: Function;
    /**
     * Constructor for Log object
     *
     * Provide [fileName], [style] item from Style object, and optionally
     * [inspectFn] function to set as new global inspector of all Log objects
     *
     * @param {string} fileName Current file name, to include before each
     *                          message this logger emits
     * @param {Function|string} style String-wrapping function OR 1 of
     *                                isoStyles' keys (string)
     *                                If `none` given, pass to console.log with
     *                                fileName wrapped by [] & no styles
     * @param {Function?} inspectFn {OPTIONAL} If given, becomes new global
     *                              inspector for all Log objects
     *                              Uses a fallback inspect (passthrough)
     *                              function if none provided
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
    /**
     * Object inspection
     *
     * Inspect object at any given level
     * Both logs and shows inspect result
     */
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
export declare const logFactory: (filename: string, style?: string | ((fName: string) => string) | ((fName: string) => any[]), inspector?: Function) => Log & ((...args: any[]) => void) & {
    inspect: (obj: any) => string | void;
};
export { isoStyles as Styles };
