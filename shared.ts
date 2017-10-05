/************************************** THIRD-PARTY MODULES ***************************************/
import { isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf } from 'env-var-helpers';
import { isoStyles, nodeStyling } from './src/isomorphic-styles';
import * as isNode from 'detect-node';

/**************************************** HELPERS & CONFIG ****************************************/
const bookend = `\n***************\n`;

/**
 * @private
 *
 * Basic function to run the inspect function against the given object.
 * Both logs & returns the inspect result.
 */
const _showInspectRes =
    (obj: any,
     styler: (s: string) => string,
     filename: string,
     inspectFn: Function
) => {
    let output: string;

    if (typeof obj === 'undefined') {
        output = 'undefined';

    } else if (obj == null) {
        output = 'null';

    } else if (typeof obj === 'string' || typeof obj === 'number') {
        output = obj.toString()

    } else {
        output = inspectFn(obj);
    }

    console.log(`${bookend}${styler(filename)} :: \n${output}${bookend}\n`);
    return output;
};

/**************************************** TYPE DEFINITIONS ****************************************/
export interface Log {
    silly:   <T>(...args: Array<(string | any)>) => T
    verbose: <T>(...args: Array<(string | any)>) => T
    debug:   <T>(...args: Array<(string | any)>) => T
    info:    <T>(...args: Array<(string | any)>) => T
    warn:    <T>(...args: Array<(string | any)>) => T
    error:   <T>(...args: Array<(string | any)>) => T
    wtf:     <T>(...args: Array<(string | any)>) => T
}


/******************************************* LOG OBJECT *******************************************/
/**
 * @export Main exported class
 *
 * Isomorphic Log object. Logs differently between Node and Browser.
 */
export class Log implements Log {
    /**
     * If defined, use this value for inspecting objects.
     * Allows dependency injecting node's inspect in once, and getting it everywhere.
     */
    static inspectFn: Function;


    /* INSTANCE PROPERTIES */

    protected filename: string;
    protected styler: typeof isoStyles[keyof typeof isoStyles]
    protected inspectFn: Function


    /* INITIALIZATION */

    /**
     * @constructor for Log object
     * @param {string} fileName Current file name, to include before each message this logger emits
     * @param {Function|string} style String-wrapping function OR 1 of isoStyles' keys (string)
     * @param {Function?} inspectFn If given, becomes new global inspector for all Log objects.
     *                              Uses a fallback inspect fn if none provided.
     *                              Allows DI of node's inspect without having browser issues.
     * If none is defined, use a fallback (passthrough) instead

     */
    constructor(filename: string,
                style?: keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles],
                inspectFn?: Function)
    {
        // Set the file name
        this.filename = filename;

        // Define new 'global' inspectFn if one was given; use fallback otherwise.
        if (inspectFn) Log.inspectFn = inspectFn;
        this.inspectFn = Log.inspectFn || ((obj: string) => obj);

        // Set the styler function based on the given value of the style prop.
        if (typeof style === 'undefined' || style == null) this.styler = isoStyles.a;
        else if (typeof style === 'string')                this.styler = isoStyles[style];
        else                                               this.styler = style;
    }


    /* METHODS */

    silly = <T>(...args: Array<(string | any)>): T => {
        if (isSilly) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    verbose = <T>(...args: Array<(string | any)>): T => {
        if (isVerbose) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    debug = <T>(...args: Array<(string | any)>): T => {
        if (isDebug) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    info = <T>(...args: Array<(string | any)>): T => {
        if (isInfo) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    warn = <T>(...args: Array<(string | any)>): T => {
        if (isWarn) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    error =  <T>(...args: Array<(string | T | any)>): T => {
        if (isError) {
            if (isNode){
                const { bgRed, white, bold } = nodeStyling;
                console.error(bgRed(white(bold(`[ERROR] ${this.filename}`))), ' :: ', ...args);
            } else {
                console.error(this.styler(this.filename), ' [ERROR] ', ...args);
            }
        }
        return args[args.length - 1];
    }

    wtf = <T>(...args: Array<(string | T | any)>): T => {
        if (isError) {
            if (isNode){
                const { bgRed, white, bold } = nodeStyling;
                console.error(bgRed(white(bold(`[ERROR] ${this.filename}`))), ' :: ', ...args);
            } else {
                console.error(this.styler(this.filename), ' [ERROR] ', ...args);
            }
        }
        return args[args.length - 1];
    }

    /* OBJECT INSPECTION */

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
    }))()
}


/******************************************** FACTORY *********************************************/
/**
 * @export Use to construct a new Log object & return it. [NOTE: PRIMARY EXPORT]
 *
 * @param {string} fileName Name of current file (to include before each message this logger emits)
 * @param {Function|string} style String-wrapping function OR string matching 1 of isoStyles' keys
 *
 * @return {Log & Function} Log instance. Also runs as standalone function (delegates to this.info)
 */
export const logFactory = (filename: string,
                           style?: keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles],
                           inspector?: Function
): Log & ((...args: Array<(string | any)>) => void) =>
{
    const log = new Log(filename, style, inspector);
    return Object.assign(log.info.bind(log), log);
}

export { isoStyles as Styles }
