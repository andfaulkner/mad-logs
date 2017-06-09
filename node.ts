/******************************************** IMPORTS *********************************************/
import { isSilly, isVerbose, isDebug, isInfo,
         isWarn, isError, isWtf, isProduction } from 'env-var-helpers';
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
// For cases where the value truly can be anything (in contrast to cases where any is used because
// it's too difficult to determine the actual type)
export type RealAny = any;

export interface InspectFn {
    /**
     * Deep-inspect object & return it as string.
     * If env var LOG_LEVEL >= info, also log it (with the file tag included in the log).
     * @param {any} obj - Object to inspect.
     */
    (obj: RealAny): string;
    /**
     * Deep-inspect object & return as string.
     * If env var LOG_LEVEL >= info, also log it, with the text in msg & the filename tag included.
     * @param {any} obj - Object to inspect.
     */
    (msg: string, RealAny: any): string;
}

export type AnyArgsWithLastArgT<T> = (T | any)[];

export interface MadLogFnObj {
    (...args: RealAny[]): void;
    thru: <T>(...anyArgsWLastArgT: AnyArgsWithLastArgT<T>) => T;
    inspect: InspectFn;
    noTag: (...args: RealAny[]) => void;
    TAG: string;
}

export interface NodeMadLogsFuncInstance {
    (...args: RealAny[]): void; // acts identically to log.info
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

    sillyWarn: MadLogFnObj;
    verboseWarn: MadLogFnObj;
    debugWarn: MadLogFnObj;
    infoWarn: MadLogFnObj;

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

type LogFn = (...args: RealAny[]) => void;

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
export const inspect = (obj: RealAny, isHidden?: boolean): string => {
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


/**
 * Log given items normally, but let the the last argument pass through as the return value.
 * @param {RealAny[]} args - Items to log (true RealAny)
 * @return {RealAny} Last argument given to function (pass it through unchanged)
 */
const passThruLog = (logFn: LogFn) => <T>(...anyArgsWLastArgT: (T|RealAny)[]): T => {
    if (anyArgsWLastArgT.length > 0) {
        logFn(anyArgsWLastArgT);
        return anyArgsWLastArgT[anyArgsWLastArgT.length - 1];
    }
    logFn('');
};

/**
 * Outer function returns a reusable 'inspector' function for returning deep-inspected versions of
 * objects, and automatically logging them with IDing information if (by default) LOG_LEVEL is
 * silly, verbose, debug, or info.
 *
 * @param {string} TAG - Decorated name of the file being logged from
 * @param {boolean} doAutoLog - If true, don't just return the output, also log it.
 *
 * @return {Function} Inspector function with the following params:
 *     | @param {string|Object} msgOrObj - Message describing the object to be inspected (in the 2nd arg),
 *     | @param {string|Object} obj?     - Object for inspection, if 1st arg contained a message string.
 *     | @return {string} Pretty-printed string form of the object being inspected.
 */
const inspector = (TAG, doAutoLog = isInfo && !isProduction) =>
    (msgOrObj: string | RealAny, obj?: RealAny): string =>
{
    // Handle object inspection when a message arg was provided.
    if (obj && ((typeof obj === 'object') || (typeof obj === 'function'))) {
        const objInfoString = inspect(obj);
        if (doAutoLog) console.log(`${TAG} ~> ${msgOrObj ? msgOrObj + ': ' : ''}`, objInfoString);
        return objInfoString;

    // If provided val was a string, include warning in the log, but return val as-is.
    } else if (typeof msgOrObj === 'string') {
        const msgTag = `${TAG} ~> ${msgOrObj}`;
        switch (typeof obj) {
            case "undefined": if (doAutoLog) console.log(`${msgTag}`);
                              return msgOrObj;
            case "string":    if (doAutoLog) console.log(`${msgTag}`, obj);
                              return obj;
            case "object":    if (doAutoLog) console.log(`${msgTag}`, inspect(obj));
                              return obj;
            case "function":  if (doAutoLog) console.log(`${msgTag}`, (obj as Function).toString());
                              return obj;
            default:          if (doAutoLog) console.log(`${msgTag} [TYPE UNKNOWN]:`, inspect(obj));
                              return obj;
        }

    // Handle object inspection when no message arg is provided.
    } else if (typeof msgOrObj === 'object' && msgOrObj != null) {
        const objInfoString = inspect(msgOrObj);
        const name = Object.keys(msgOrObj).find(key => key === 'name')
                         ? ` ${msgOrObj.name}: `
                         : '';
        if (doAutoLog) console.log(`${TAG} ~>${name}`, objInfoString);

        return objInfoString;
    }

    return msgOrObj;
};

type LogType = 'log' | 'error' | 'warn';

/**
 * Actual builder for the log library, minus the fn method.
 */
const logObjFactory = (TAG: string, fnName?: string): NodeMadLogsFuncInstance => {
    const fTAG = (fnName) ? `${TAG} [func: ${fnName}] ::` : TAG;

    /**
     * Main logging function. Actual logging to the console occurs through here.
     *
     * @param {boolean} logGate - Only log if true. This is determined by the LOG_LEVEL env value.
     * @param {LogType} logType - log, error, or warn. Determines which console method to use
     * @param {string} wrap - Text to wrap the output in.
     * @param {boolean} blockTag - If true, don't display the tag.
     */
    const logTemplate = (logGate: boolean, logType: LogType, wrap: string = '', blockTag = false) =>
        (...args: RealAny[]): void =>
    {
        if (logGate) {
            if (blockTag) {
                console[logType](`${wrap}`, ...args, `${wrap}`);
            } else {
                console[logType](`${wrap}${fTAG} `, ...args, `${wrap}`);
            }
        }
    };

    const logObj = Object.assign(logTemplate(isInfo, 'log'),
        {
            TAG,

            blankWrap:    logTemplate(isWtf, 'log', `\n`),
            blankWrap2:   logTemplate(isWtf, 'log', `\n\n`),
            blankWrap3:   logTemplate(isWtf, 'log', `\n\n\n`),

            silly:        logTemplate(isSilly, 'log'),
            sillyWarn:    logTemplate(isSilly, 'warn'),
            sillyError:   logTemplate(isSilly, 'error'),

            verbose:      logTemplate(isVerbose, 'log'),
            verboseWarn:  logTemplate(isVerbose, 'warn'),
            verboseError: logTemplate(isVerbose, 'error'),

            debug:        logTemplate(isDebug, 'log'),
            debugWarn:    logTemplate(isDebug, 'warn'),
            debugError:   logTemplate(isDebug, 'error'),

            info:         logTemplate(isInfo, 'log'),
            infoWarn:     logTemplate(isInfo, 'warn'),
            infoError:    logTemplate(isInfo, 'error'),

            warn:         logTemplate(isWarn, 'warn'),
            error:        logTemplate(isError, 'error'),
            wtf:          logTemplate(isWtf, 'error'),
            always:       logTemplate(isWtf, 'log'),

            inspect:      inspector(fTAG),
        }
    );

    /**
     * Set up log object to have thru and inspect properties attached to all methods.
     */
    const logObjBoundDeep = Object.keys(logObj).reduce((acc, logFnName: string) => {
        const outVal = Object.assign(logObj[logFnName],
            {
                thru: passThruLog(logObj[logFnName]),
                noTag: (() => {
                    // TODO find cleaner solution than repeating above function calls w/ added arg
                    switch(logFnName) {
                        case 'silly':        return logTemplate(isSilly, 'log', '', true);
                        case 'sillyWarn':    return logTemplate(isSilly, 'warn', '', true);
                        case 'sillyError':   return logTemplate(isSilly, 'error', '', true);
                        case 'verbose':      return logTemplate(isVerbose, 'log', '', true);
                        case 'verboseWarn':  return logTemplate(isVerbose, 'warn', '', true);
                        case 'verboseError': return logTemplate(isVerbose, 'error', '', true);
                        case 'debug':        return logTemplate(isDebug, 'log', '', true);
                        case 'debugWarn':    return logTemplate(isDebug, 'warn', '', true);
                        case 'debugError':   return logTemplate(isDebug, 'error', '', true);
                        case 'info':         return logTemplate(isInfo, 'log', '', true);
                        case 'infoWarn':     return logTemplate(isInfo, 'warn', '', true);
                        case 'infoError':    return logTemplate(isInfo, 'error', '', true);
                        case 'warn':         return logTemplate(isWarn, 'warn', '', true);
                        case 'error':        return logTemplate(isError, 'error', '', true);
                        case 'wtf':          return logTemplate(isWtf, 'error', '', true);
                        case 'always':       return logTemplate(isWtf, 'log', '', true);
                    }
                })(),
                inspect: (() => {
                    switch (logFnName) {
                        case 'silly':        return inspector(fTAG, isSilly);
                        case 'sillyWarn':    return inspector(fTAG, isSilly);
                        case 'sillyError':   return inspector(fTAG, isSilly);
                        case 'verbose':      return inspector(fTAG, isVerbose);
                        case 'verboseWarn':  return inspector(fTAG, isVerbose);
                        case 'verboseError': return inspector(fTAG, isVerbose);
                        case 'debug':        return inspector(fTAG, isDebug);
                        case 'debugWarn':    return inspector(fTAG, isVerbose);
                        case 'debugError':   return inspector(fTAG, isDebug);
                        case 'info':         return inspector(fTAG, isInfo);
                        case 'infoWarn':     return inspector(fTAG, isInfo);
                        case 'infoError':    return inspector(fTAG, isInfo);
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
