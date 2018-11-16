/**************************************** TYPE DEFINITIONS ****************************************/
export declare type RealAny = any;
export interface InspectFn {
    /**
     * Deep-inspect object & return it as string.
     * If env var LOG_LEVEL >= info, also log it (with the file tag included in the log)
     * @param {any} obj Object to inspect
     */
    (obj: RealAny): string;
    /**
     * Deep-inspect object & return as string
     * If env var LOG_LEVEL >= info, also log it, with the text in msg & the filename tag included
     * @param {any} obj Object to inspect
     */
    (msg: string, RealAny: any): string;
}
export declare type AnyArgsWithLastArgT<T> = (T | any)[];
export interface MadLogFnObj {
    (...args: RealAny[]): void;
    thru: <T>(...anyArgsWLastArgT: AnyArgsWithLastArgT<T>) => T;
    inspect: InspectFn;
    noTag: (...args: RealAny[]) => void;
    TAG: string;
}
export interface NodeMadLogsFuncInstance {
    (...args: RealAny[]): void;
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
/******************************************** HELPERS *********************************************/
/**
 * Preconfigured version of Node's util.inspect function
 * Automatically changes depth based on the current process.env.LOG_LEVEL
 *
 * @param {Object} obj - Object to inspect
 * @param {boolean} isHidden [OPTIONAL] If true, show hidden values. Defaults to true
 *                           if process.env.LOG_LEVEL is 'silly' (otherwise it's false)
 * @return {string} Readable string representation of object (standard util.inspect output)
 */
export declare const inspect: (obj: any, isHidden?: boolean) => string;
/********************************************* EXPORT *********************************************/
/**
 * Create a special log for the current file
 *
 * Produces dynamic object w functions that also operate as objects at each
 * layer, with the "root-level" function acting like log.info
 *
 * Each key on that function contains a function that either does specialized
 * logging, or logs dependent on the current LOG_LEVEL value
 *
 * @param {string} TAG Filename, possible decorated by a style
 */
export declare const nodeLogFactory: (TAG: string) => NodeMadLogsInstance;
import { buildFileTagString } from './src/build-file-tag-string';
export { buildFileTagString as buildFileTag };
import colors from 'colors';
export { colors };
