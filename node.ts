/******************************************** IMPORTS *********************************************/
import { isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf } from 'env-var-helpers';
import { inspect as nodeInspect } from 'util';
import * as isNode from 'detect-node'

/************************ ENSURE MODULE ONLY LOADED IN CORRECT ENVIRONMENT ************************/
// Throw error & crash the app if attempt made to load this sub-module outside Node.
if (!isNode && !process.env.mocha) {
    const mlogsErrStr = `mad-logs: Can't import mad-logs/lib/node into browser env. NodeJS only.`;
    console.error(mlogsErrStr);
    throw new TypeError(mlogsErrStr);
}

/**************************************** TYPE DEFINITIONS ****************************************/
export interface InspectFn {
    /**
     * Deep-inspect object & return it as string.
     * If env var LOG_LEVEL >= info, also log it (with the file tag included in the log).
     * @param {any} obj - Object to inspect.
     */
    (obj: any): string;
    /**
     * Deep-inspect object & return as string.
     * If env var LOG_LEVEL >= info, also log it, with the text in msg & the filename tag included.
     * @param {any} obj - Object to inspect.
     */
    (msg: string, obj: any): string;
}

export type AnyArgsWithLastArgT<T> = (T | any)[];

export interface MadLogFnObj {
    (...args: any[]): void;
    thru: <T>(...anyArgsWLastArgT: AnyArgsWithLastArgT<T>) => T;
    inspect: InspectFn;
}

export interface NodeMadLogsFuncInstance {
    (...args: any[]): void; // acts identically to log.info
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

export interface NodeMadLogsInstance extends NodeMadLogsFuncInstance {
    fn: (fnName: string) => NodeMadLogsFuncInstance;
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

const passThruLog = (logFn: (...args: any[]) => void) => <T>(...anyArgsWLastArgT: (T|any)[]): T => {
    if (anyArgsWLastArgT.length > 0) {
        logFn(anyArgsWLastArgT);
        return anyArgsWLastArgT[anyArgsWLastArgT.length - 1];
    } else {
        logFn('');
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
const inspector = (TAG, logCond = isInfo) => (msgOrObj: string | any, obj?: any): string => {
    // Handle object inspection when a message arg was provided.
    if (obj && ((typeof obj === 'object') || (typeof obj === 'function'))) {
        const objInfoString = inspect(obj);
        if (logCond) {
            console.log(`${TAG} ~> ${msgOrObj ? msgOrObj + ': ' : ''}`, objInfoString);
        }
        return objInfoString;

    // If provided val was a string, include warning in the log, but return val as-is.
    } else if (typeof msgOrObj === 'string') {
        const msgTag = `${TAG} ~> ${msgOrObj}`;
        switch (typeof obj) {
            case "undefined": if (logCond) console.log(`${msgTag}`);
                              return msgOrObj;
            case "string":    if (logCond) console.log(`${msgTag}`, obj);
                              return obj;
            case "object":    if (logCond) console.log(`${msgTag}`, inspect(obj));
                              return obj;
            case "function":  if (logCond) console.log(`${msgTag}`, (obj as Function).toString());
                              return obj;
            default:          if (logCond) console.log(`${msgTag} [TYPE UNKNOWN]:`, inspect(obj));
                              return obj;
        }

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

/**
 * Actual builder for the log library, minus the fn method.
 */
const logObjFactory = (TAG: string, fnName?: string): NodeMadLogsFuncInstance => {
    const fTAG = (fnName) ? `${TAG} [func: ${fnName}] ::` : TAG;

    const logTemplate = (logGate: boolean, logType: 'log' | 'error' | 'warn', wrap: string = '') => (...args: any[]): void => {
        if (logGate) {
            if (logType === 'log')   console.log(`${wrap}${fTAG} `, ...args, `${wrap}`);
            if (logType === 'error') console.error(`${wrap}${fTAG} `, ...args, `${wrap}`);
            if (logType === 'warn')  console.warn(`${wrap}${fTAG} `, ...args, `${wrap}`);
        }
    };

    const logObj = Object.assign(logTemplate(isInfo, 'log'),
        {
            TAG,

            blankWrap:    logTemplate(isWtf, 'log', `\n`),
            blankWrap2:   logTemplate(isWtf, 'log', `\n\n`),
            blankWrap3:   logTemplate(isWtf, 'log', `\n\n\n`),

            silly:        logTemplate(isSilly, 'log'),
            sillyError:   logTemplate(isSilly, 'error'),

            verbose:      logTemplate(isVerbose, 'log'),
            verboseError: logTemplate(isVerbose, 'error'),

            debug:        logTemplate(isDebug, 'log'),
            debugError:   logTemplate(isDebug, 'error'),

            info:         logTemplate(isInfo, 'log'),
            infoError:    logTemplate(isInfo, 'error'),

            warn:         logTemplate(isWarn, 'warn'),
            error:        logTemplate(isError, 'error'),
            wtf:          logTemplate(isWtf, 'error'),
            always:       logTemplate(isWtf, 'log'),

            inspect:      inspector(fTAG),
        }
    );

    /**
     * Set up log object to have 'thru' and inspect properties attached to all methods.
     */
    const logObjBoundDeep = Object.keys(logObj).reduce((acc, logFnName: string) => {
        const outVal = Object.assign(logObj[logFnName],
            {
                thru: passThruLog(logObj[logFnName]),
                inspect: (() => {
                    switch (logFnName) {
                        case 'silly':        return inspector(fTAG, isSilly);
                        case 'sillyError':   return inspector(fTAG, isSilly);
                        case 'verbose':      return inspector(fTAG, isVerbose);
                        case 'verboseError': return inspector(fTAG, isVerbose);
                        case 'debug':        return inspector(fTAG, isDebug);
                        case 'debugError':   return inspector(fTAG, isDebug);
                        case 'infoError':    return inspector(fTAG, isInfo);
                        case 'info':         return inspector(fTAG, isInfo);
                        case 'warn':         return inspector(fTAG, isWarn);
                        case 'error':        return inspector(fTAG, isError);
                        case 'wtf':          return inspector(fTAG, isWtf);
                        default:             return inspector(fTAG);
                    }
                })()
            }
        );
        acc[logFnName] = outVal as MadLogFnObj;
        return acc;
    }, logTemplate(isInfo, 'log')) as NodeMadLogsFuncInstance;

    return logObjBoundDeep;
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
    // Build main log factory.
    const logObjBoundDeep = logObjFactory(TAG);

    // Attach fn to logObj, for creating function-scoped log instances.
    Object.assign(logObjBoundDeep, {
        fn: (fnName: string): NodeMadLogsFuncInstance => logObjFactory(TAG, fnName),
    });

    return logObjBoundDeep as NodeMadLogsInstance;
};

import { buildFileTagString } from './src/build-file-tag-string';
export { buildFileTagString as buildFileTag }

import * as colors from 'colors';
export { colors };
