/**
 * Provide deprecation warning if buildFileTag used in the browser.
 */
export declare const buildFileTag: (filenm: string, clrize?: number | Function, rpadLen?: number) => string;
/************************************* IMPORT PROJECT MODULES *************************************/
import { logMarkers } from './src/theming';
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
    (...strs: any[]): any;
    silly: (...args: Array<(string | any)>) => void;
    verbose: (...args: Array<(string | any)>) => void;
    debug: (...args: Array<(string | any)>) => void;
    info: (...args: Array<(string | any)>) => void;
    warn: (...args: Array<(string | any)>) => void;
    error: (...args: Array<(string | any)>) => void;
    wtf: (...args: Array<(string | any)>) => void;
}
/************************************ MAIN LOG OBJECT FACTORY *************************************/
/**
 *  Build 'logger' object for reuse throughout any module it's constructed in. Strings passed
 *  to the factory appear on the left of all logs emitted by functions in the returned object,
 *  easing identification (visually and by search) of logs emitted in a specific file/module.
 *
 *  @param {string} filename - name of the module it is being built in.
 *  @param {Object} opts - config log object being built. Values in logMarkers object are intended
 *                         for assignment to this arg.
 *  @return {Object} contains a set of logging functions corresponding to available log levels.
 *           A log won't display unless the global log level is higher than the log level tied
 *           to the function (e.g. if LOG_LEVEL=info, a message passed to log.debug won't show).
 */
export declare const logFactory: (config?: {} | AppConf) => (fileName: string, opts?: LogOpts) => MadLog;
/********************************************* EXPORT *********************************************/
export { logMarkers };
