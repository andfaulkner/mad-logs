// TODO:
// 1) Make this throw instantly if it's imported outside Node.
// 2) log.fn constructor that creates a copy of the log object, with the function name added to the TAG.
// 3) 

import { isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf } from 'env-var-helpers';
import { inspect as nodeInspect } from 'util';


/**************************************** TYPE DEFINITIONS ****************************************/

export interface InspectFn {
    /**
     * Deep-inspect object & return it as string.
     * If env var LOG_LEVEL >= info, also log it (with the file tag included in the log).
     * @param {Object} obj - Object to inspect.
     */
    (obj: Object): string;
    /**
     * Deep-inspect object & return as string.
     * If env var LOG_LEVEL >= info, also log it, with the text in msg & the filename tag included.
     * @param {Object} obj - Object to inspect.
     */
    (msg: string, obj: Object): string;
}

export interface MadLogFnObj {
    (...argsToLog: any[]): void;
    thru: (...argsToLog: any[]) => void;
    inspect: InspectFn;
}

export interface NodeMadLogsInstance {
    (...argsToLog: any[]): void; // acts identically to log.info
    blankWrap: MadLogFnObj;
    blankWrap2: MadLogFnObj;
    blankWrap3: MadLogFnObj;
    silly: MadLogFnObj;
    verbose: MadLogFnObj;
    debug: MadLogFnObj;
    info: MadLogFnObj;
    warn: MadLogFnObj;
    error: MadLogFnObj;
    wtf: MadLogFnObj;

    sillyError: MadLogFnObj;
    verboseError: MadLogFnObj;
    debugError: MadLogFnObj;
    infoError: MadLogFnObj;

    inspect: InspectFn;

    always: MadLogFnObj;
}


/******************************************** HELPERS *********************************************/
/**
 * Preconfigured version of Node's util.inspect function. Automatically changes
 * depth based on the current process.env.LOG_LEVEL.
 *
 * @param {Object} obj - Object to inspect
 * @param {boolean} isHidden - [OPTIONAL] If true, show hidden values. Defaults to true
 *                             if process.env.LOG_LEVEL is 'silly' (otherwise it's false).
 * @return {string} Readable string representation of object (standard util.inspect output)
 */
export const inspect = (obj: any, isHidden?: boolean): string => {
    const depth = (() => {
        let logLevelNorm = (process.env.LOG_LEVEL && typeof process.env.LOG_LEVEL === 'string')
                               ? process.env.LOG_LEVEL.toLowerCase()
                               : 'info';
        switch (logLevelNorm) {
            case 'silly':   return 10;
            case 'verbose': return 7;
            case 'info':    return 5;
            case 'warn':    return 3;
            case 'error':   return 2;
            case 'wtf':     return 1;
        }
    })();

    return nodeInspect(obj, {
        showHidden: (isHidden) ? isHidden : !!isSilly,
        depth,
        colors: true
    });
}

const passThruLog = (logFn: (...argsToLog: any[]) => void) => (fnNameOrVal: string | any, val?) => {
    if (!val) {
        logFn(fnNameOrVal);
        return fnNameOrVal;
    } else {
        logFn(fnNameOrVal, ':', val);
        return val;
    }
};

/**
 * Outer function returns a reusable 'inspector' function for returning deep-inspected versions of
 * objects, and automatically logging them with IDing information if (by default) LOG_LEVEL is
 * silly, verbose, debug, or info.
 *
 * @param {string} TAG - Decorated name of the file being logged from
 * @param {boolean} logCond - If true, don't just return the output, also log it.
 *
 * @return {Function} Inspector function with the following params:
 *     | @param {string|Object} msgOrObj - Message describing the object to be inspected (in the 2nd arg),
 *     | @param {string|Object} obj?     - Object for inspection, if 1st arg contained a message string.
 *     | @return {string} Pretty-printed string form of the object being inspected.
 */
const inspector = (TAG, logCond = isInfo) => (msgOrObj: string | Object, obj?: Object): string => {
    // Handle object inspection when a message arg was provided.
    if (obj && ((typeof obj === 'object') || (typeof obj === 'function'))) {
        const objInfoString = inspect(obj);
        if (logCond) {
            console.log(`${TAG} ~> ${msgOrObj ? msgOrObj + ': ' : ''}`, objInfoString);
        }
        return objInfoString;

    // If provided val was a string, include warning in the log, but return val as-is.
    } else if (typeof msgOrObj === 'string') {
        console.log(`${TAG} ~> (NOTE: INSPECTED OBJ ALREADY STRING) : ${msgOrObj}`);
        return msgOrObj;

    // Handle object inspection when no message arg is provided.
    } else if (typeof msgOrObj === 'object') {
        const objInfoString = inspect(msgOrObj);
        const name = ((msgOrObj as any).name) ? ` ${(msgOrObj as any).name}: ` : '';
        if (logCond) {
            console.log(`${TAG} ~>${name}`, objInfoString);
        }
        return objInfoString;
    }

    return msgOrObj;
};

/********************************************* EXPORT *********************************************/
/**
 * Create a special log for the current file.
 * Produces an ultra-dynamic object with functions that also operate as objects at every layer.
 * The "root-level" function acts like log.info. Each key on that function contains a function
 * that either does specialized logging, or logs dependent on the current LOG_LEVEL value.
 *
 * @param {string} TAG - filename, possible decorated by a style.
 */
export const nodeLogFactory = (TAG: string): NodeMadLogsInstance => {
    const logObjFnBase = (...argsToLog: any[]): void => {
        if (isInfo) console.log(`${TAG} `, ...argsToLog);
    };

    const logObj = Object.assign(logObjFnBase,
        {
            TAG,
            blankWrap: (...argsToLog: any[]): void => {
                console.log(`\n${TAG} `, ...argsToLog, '\n');
            },
            blankWrap2: (...argsToLog: any[]): void => {
                console.log(`\n\n${TAG} `, ...argsToLog, '\n\n');
            },
            blankWrap3: (...argsToLog: any[]): void => {
                console.log(`\n\n\n${TAG} `, ...argsToLog, '\n\n\n');
            },

            silly: (...argsToLog: any[]): void => {
                Object.keys(this);
                if (isSilly) console.log(`${TAG} `, ...argsToLog);
            },
            sillyError: (...argsToLog: any[]): void => {
                Object.keys(this);
                if (isSilly) console.error(`${TAG} `, ...argsToLog);
            },

            verbose: (...argsToLog: any[]): void => {
                if (isVerbose) console.log(`${TAG} `, ...argsToLog);
            },
            verboseError: (...argsToLog: any[]): void => {
                if (isVerbose) console.error(`${TAG} `, ...argsToLog);
            },

            debug: (...argsToLog: any[]): void => {
                if (isDebug) console.log(`${TAG} `, ...argsToLog);
            },
            debugError: (...argsToLog: any[]): void => {
                if (isDebug) console.error(`${TAG} `, ...argsToLog);
            },

            info: (...argsToLog: any[]): void => {
                if (isInfo) console.log(`${TAG} `, ...argsToLog);
            },
            infoError: (...argsToLog: any[]): void => {
                if (isInfo) console.error(`${TAG} `, ...argsToLog);
            },

            warn: (...argsToLog: any[]): void => {
                if (isWarn) console.warn(`${TAG} `, ...argsToLog);
            },
            error: (...argsToLog: any[]): void => {
                if (isError) console.error(`${TAG} `, ...argsToLog);
            },
            wtf: (...argsToLog: any[]): void => {
                if (isWtf) console.error(`${TAG} `, ...argsToLog);
            },

            always: (...argsToLog: any[]): void => {
                console.log(`${TAG} `, ...argsToLog);
            },

            inspect: inspector(TAG),
        }
    );

    /**
     * Set up log object to have a 'thru' property
     */
    const logObjBoundDeep = Object.keys(logObj).reduce((acc, logFnName: string) => {
        const outVal = Object.assign(logObj[logFnName],
            {
                thru: passThruLog(logObj[logFnName]),
                inspect: (() => {
                    switch (logFnName) {
                        case 'silly':        return inspector(TAG, isSilly);
                        case 'sillyError':   return inspector(TAG, isSilly);
                        case 'verbose':      return inspector(TAG, isVerbose);
                        case 'verboseError': return inspector(TAG, isVerbose);
                        case 'debug':        return inspector(TAG, isDebug);
                        case 'debugError':   return inspector(TAG, isDebug);
                        case 'infoError':    return inspector(TAG, isInfo);
                        case 'info':         return inspector(TAG, isInfo);
                        case 'warn':         return inspector(TAG, isWarn);
                        case 'error':        return inspector(TAG, isError);
                        case 'wtf':          return inspector(TAG, isWtf);
                        default:             return inspector(TAG);
                    }
                })()
            }
        );
        acc[logFnName] = outVal as MadLogFnObj;
        return acc;
    }, logObjFnBase) as NodeMadLogsInstance;

    return logObjBoundDeep;
};
