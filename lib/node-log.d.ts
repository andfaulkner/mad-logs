/**
 * Preconfigured version of Node's util.inspect function. Automatically changes
 * depth based on the current process.env.LOG_LEVEL.
 *
 * @param {Object} obj - Object to inspect
 * @param {boolean} isHidden - [OPTIONAL] If true, show hidden values. Defaults to true
 *                             if process.env.LOG_LEVEL is 'silly' (otherwise it's false).
 * @return {string} Readable string representation of object (standard util.inspect output)
 */
export declare const inspect: (obj: any, isHidden?: boolean) => string;
/**
 * Create a special log for the current file
 * @param {string} TAG - filename, possible decorated by a style.
 */
export declare const nodeLogFactory: (TAG: string) => {
    blankWrap3: (...argsToLog: any[]) => void;
    blankWrap2: (...argsToLog: any[]) => void;
    blankWrap: (...argsToLog: any[]) => void;
    silly: (...argsToLog: any[]) => void;
    verbose: (...argsToLog: any[]) => void;
    debug: (...argsToLog: any[]) => void;
    info: (...argsToLog: any[]) => void;
    warn: (...argsToLog: any[]) => void;
    error: (...argsToLog: any[]) => void;
    wtf: (...argsToLog: any[]) => void;
    inspect: (obj: any, isHidden?: boolean) => string;
};
