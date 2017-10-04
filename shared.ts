/************************************** THIRD-PARTY MODULES ***************************************/
import { isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf } from 'env-var-helpers';
import { isoStyles, nodeStyling } from './src/isomorphic-styles';
import { isNode } from 'detect-node';

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

    constructor(public filename: string, style: keyof typeof isoStyles) {
        this.styler = isoStyles[style];
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
 */
const logFactory = (filename: string, style: keyof typeof isoStyles): Log => {
    return new Log(filename, style);
};
