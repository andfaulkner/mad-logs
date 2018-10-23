/************************************** THIRD-PARTY MODULES ***************************************/
import {isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf} from 'env-var-helpers';
import {isoStyles, nodeStyling} from './src/isomorphic-styles';
import * as isNode from 'detect-node';

/**************************************** HELPERS & CONFIG ****************************************/
const bookend = `\n***************\n`;

/**
 * Basic function to run the inspect function against the given object
 * Both logs & returns the inspect result
 */
const _showInspectRes = (
    obj: any,
    styler: (s: string) => string | string[],
    filename: string,
    inspectFn: Function
) => {
    let output: string;

    if (typeof obj === 'undefined') {
        output = 'undefined';
    } else if (obj == null) {
        output = 'null';
    } else if (typeof obj === 'string' || typeof obj === 'number') {
        output = obj.toString();
    } else {
        output = inspectFn(obj);
    }

    const tagObj = styler(this.filename);
    console.log.apply(
        console,
        [bookend]
            .concat(Array.isArray(tagObj) ? tagObj : [tagObj])
            .concat(' :: \n${output}${bookend}')
    );
};

/**************************************** TYPE DEFINITIONS ****************************************/
/**
 * Available log levels in the application
 */
export type LogLevels = keyof Log['inspector'];

/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object
 *
 * Logs differently between node.js & browser when given the same styles
 * Avoids need for separate browser & node modules
 */
export class Log {
    /**
     * If defined, use this value for inspecting objects
     * Allows dependency injecting node's inspect in once & getting it everywhere
     */
    static inspectFn: Function;

    /* INSTANCE PROPERTIES */

    protected filename: string;
    protected styler: typeof isoStyles[keyof typeof isoStyles];
    protected inspectFn: Function;

    /* INITIALIZATION */

    // TODO make setting global inspectFn separate from instantiation
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
    constructor(
        filename: string,
        style?: keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles],
        inspectFn?: Function
    ) {
        // Set the file name
        this.filename = filename;

        // Define new 'global' inspectFn if one was given; use fallback otherwise
        if (inspectFn) Log.inspectFn = inspectFn;
        this.inspectFn = Log.inspectFn || ((obj: string) => obj);

        // Set the styler function based on the given value of the style prop
        if (typeof style === 'undefined' || style == null) this.styler = isoStyles.none;
        else if (typeof style === 'string') this.styler = isoStyles[style];
        else this.styler = style;
    }

    /* METHODS */

    silly = <T>(...args: Array<string | any>): T => {
        if (isSilly) {
            const tagObj = this.styler(this.filename);
            console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
            return args[args.length - 1];
        }
    };

    verbose = <T>(...args: Array<string | any>): T => {
        if (isVerbose) {
            const tagObj = this.styler(this.filename);
            console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
            return args[args.length - 1];
        }
    };

    debug = <T>(...args: Array<string | any>): T => {
        if (isDebug) {
            const tagObj = this.styler(this.filename);
            console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
            return args[args.length - 1];
        }
    };

    info = <T>(...args: Array<string | any>): T => {
        if (isInfo) {
            const tagObj = this.styler(this.filename);
            console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
            return args[args.length - 1];
        }
    };

    warn = <T>(...args: Array<string | any>): T => {
        if (isWarn) {
            const tagObj = this.styler(this.filename);
            console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
            return args[args.length - 1];
        }
    };

    error = <T>(...args: Array<string | T | any>): T => {
        if (isError) {
            if (isNode) {
                const {bgRed, white, bold} = nodeStyling;
                console.error(bgRed(white(bold(`[ERROR] ${this.filename}`))), ' :: ', ...args);
            } else {
                const tagObj = this.styler(this.filename);
                console.error.apply(
                    console,
                    (Array.isArray(tagObj) ? tagObj : [tagObj]).concat([' [ERROR] ']).concat(args)
                );
            }
        }
        return args[args.length - 1];
    };

    wtf = <T>(...args: Array<string | T | any>): T => {
        if (isError) {
            if (isNode) {
                const {bgRed, white, bold} = nodeStyling;
                console.error(bgRed(white(bold(`[ERROR] ${this.filename}`))), ' :: ', ...args);
            } else {
                const tagObj = this.styler(this.filename);
                console.error.apply(
                    console,
                    (Array.isArray(tagObj) ? tagObj : [tagObj])
                        .concat([' [WTF ERROR] '])
                        .concat(args)
                );
            }
        }
        return args[args.length - 1];
    };

    /**
     * Object inspection
     *
     * Inspect object at any given level
     * Both logs and shows inspect result
     */
    inspector = (() => ({
        silly: (obj: any): string | void => {
            if (isSilly) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
        verbose: (obj: any): string | void => {
            if (isVerbose) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
        debug: (obj: any): string | void => {
            if (isDebug) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
        info: (obj: any): string | void => {
            if (isInfo) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
        warn: (obj: any): string | void => {
            if (isWarn) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
        error: (obj: any): string | void => {
            if (isError) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
        wtf: (obj: any): string | void => {
            if (isWtf) return _showInspectRes(obj, this.styler, this.filename, this.inspectFn);
        },
    }))();
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
export const logFactory = (
    filename: string,
    style?: keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles],
    inspector?: Function
): Log & ((...args: Array<string | any>) => void) & {inspect: (obj: any) => string | void} => {
    const log = new Log(filename, style, inspector);
    return Object.assign(log.info.bind(log), log, {inspect: log.inspector.info.bind(log)});
};

export {isoStyles as Styles};
