/************************************** THIRD-PARTY MODULES ***************************************/
import { isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf } from 'env-var-helpers';
import { isoStyles, nodeStyling } from './src/isomorphic-styles';
import * as isNode from 'detect-node';

/**************************************** TYPE DEFINITIONS ****************************************/
export interface Log {
    silly<T>  (...args: Array<(string | any)>): T
    verbose<T>(...args: Array<(string | any)>): T
    debug<T>  (...args: Array<(string | any)>): T
    info<T>   (...args: Array<(string | any)>): T
    warn<T>   (...args: Array<(string | any)>): T
    error<T>  (...args: Array<(string | any)>): T
    wtf<T>    (...args: Array<(string | any)>): T
}

// WIP

/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object. Logs differently between Node and Browser.
 */
export class Log implements Log {
    public styler: typeof isoStyles[keyof typeof isoStyles];

    constructor(public filename: string,
                       style:    keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles]
    ) {
        if (typeof style === 'undefined' || style == null) this.styler = isoStyles.a;
        else if (typeof style === 'string')                this.styler = isoStyles[style];
        else                                               this.styler = style;
    }

    silly<T>  (...args: Array<(string | any)>): T {
        if (isSilly) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    verbose<T>(...args: Array<(string | any)>): T {
        if (isVerbose) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    debug<T>  (...args: Array<(string | any)>): T {
        if (isDebug) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    info<T>   (...args: Array<(string | any)>): T {
        if (isInfo) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    warn<T>   (...args: Array<(string | any)>): T {
        if (isWarn) {
            console.log(this.styler(this.filename), ...args);
            return args[0];
        }
    }

    error<T>  (...args: Array<(string | T | any)>): T {
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

    wtf<T>    (...args: Array<(string | T | any)>): T {
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
}

/**
 * Construct new Log object & return it.
 * @param {string} fileName Name of current file (to include before each message this logger emits)
 * @param {Function|string} style String-wrapping function OR string matching 1 of isoStyles' keys
 * @return {Log & Function} Log instance. Also runs as standalone function (delegates to this.info)
 */
export const logFactory = (filename: string,
                           style?: keyof typeof isoStyles | typeof isoStyles[keyof typeof isoStyles]
): Log & ((...args: Array<(string | any)>) => void) =>
{
    const log = new Log(filename, style);
    return Object.assign(log.info.bind(log), log);
}

export { isoStyles as Styles }