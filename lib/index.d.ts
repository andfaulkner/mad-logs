import { logMarkers } from './src/theming';
/**
 * Provide deprecation warning if buildFileTag used in the browser
 */
export declare const buildFileTag: (filenm: string, clrize?: number | Function, rpadLen?: number) => string;
/**************************************** TYPE DEFINITIONS ****************************************/
export interface AppConf {
    logLevel: keyof MadLog;
}
export interface LogOpts {
    tagPrefix: string;
    tagSuffix: string;
    style: string;
}
export interface MadLog {
    <T>(...strs: any[]): T;
    silly: <T>(...args: Array<(string | any)>) => T;
    verbose: <T>(...args: Array<(string | any)>) => T;
    debug: <T>(...args: Array<(string | any)>) => T;
    info: <T>(...args: Array<(string | any)>) => T;
    warn: <T>(...args: Array<(string | any)>) => T;
    error: <T>(...args: Array<(string | any)>) => T;
    wtf: <T>(...args: Array<(string | any)>) => T;
}
/**
 * Defines the available log levels in the application
 */
export declare const logValues: {
    silly: number;
    verbose: number;
    debug: number;
    info: number;
    warn: number;
    error: number;
    wtf: number;
};
/**
 * Export type containing all usable log levels
 */
export declare type LogLevels = keyof typeof logValues;
/************************************ MAIN LOG OBJECT FACTORY *************************************/
/**
 *  Build 'logger' object for reuse throughout any module it's constructed in
 *  Strings passed to factory appear on the left of all logs emitted by functions in the returned
 *  object, easing identification (visually & by search) of logs emitted in a specific file/module
 *
 *  @param {string} filename Name of the module it is being built in
 *  @param {Object} opts Config log object being built
 *                       Values in logMarkers object are intended for assignment to this arg
 *  @return {Object} contains a set of logging functions corresponding to available log levels
 *           A log won't display unless the global log level is higher than the log level tied
 *           to the function (e.g. if LOG_LEVEL=info, a message passed to log.debug won't show)
 */
export declare const logFactory: (config?: {} | AppConf) => (fileName: string, opts?: LogOpts) => MadLog;
/********************************************* EXPORT *********************************************/
export { logMarkers };
