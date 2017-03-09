import { isSilly, isVerbose, isDebug, isInfo, isWarn, isError, isWtf } from 'env-var-helpers';
import { inspect as nodeInspect } from 'util';

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

export interface MadLogFnObj {
    (...argsToLog: any[]): void;
    thru: (...argsToLog: any[]) => void;
}

export interface NodeMadLogsInstance {
    blankWrap3: MadLogFnObj;
    blankWrap2: MadLogFnObj;
    blankWrap: MadLogFnObj;
    silly: MadLogFnObj;
    verbose: MadLogFnObj;
    debug: MadLogFnObj;
    info: MadLogFnObj;
    warn: MadLogFnObj;
    error: MadLogFnObj;
    wtf: MadLogFnObj;
    inspect: MadLogFnObj;
}

/**
 * Create a special log for the current file
 * @param {string} TAG - filename, possible decorated by a style.
 */
export const nodeLogFactory = (TAG: string) => {
    const logObj = {
        blankWrap3: (...argsToLog: any[]): void => {
            console.log(`\n\n\n${TAG} `, ...argsToLog, '\n\n\n');
        },
        blankWrap2: (...argsToLog: any[]): void => {
            console.log(`\n\n${TAG} `, ...argsToLog, '\n\n');
        },
        blankWrap: (...argsToLog: any[]): void => {
            console.log(`\n${TAG} `, ...argsToLog, '\n');
        },
        silly: (...argsToLog: any[]): void => {
            Object.keys(this);
            if (isSilly) console.log(`${TAG} `, ...argsToLog);
        },
        verbose: (...argsToLog: any[]): void => {
            if (isVerbose) console.log(`${TAG} `, ...argsToLog);
        },
        debug: (...argsToLog: any[]): void => {
            if (isDebug) console.log(`${TAG} `, ...argsToLog);
        },
        info: (...argsToLog: any[]): void => {
            if (isInfo) console.log(`${TAG} `, ...argsToLog);
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
        inspect
    };

    const logObjBoundThru = Object.keys(logObj).reduce((acc, logFnName: string) => {
        const outVal = Object.assign(logObj[logFnName], { thru: passThruLog(logObj[logFnName]) });
        acc[logFnName] = outVal as MadLogFnObj;
        return acc;
    }, {}) as NodeMadLogsInstance;

    return logObjBoundThru;
};
