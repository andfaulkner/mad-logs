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
export declare const nodeLogFactory: (TAG: string) => NodeMadLogsInstance;
