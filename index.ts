/************************************** THIRD-PARTY IMPORTS ***************************************/
// const find = require("lodash.find");
// const isString = require("lodash.isstring");

import { find, isString } from 'lodash';
import * as isNode from 'detect-node';

import { buildFileTagString } from './src/build-file-tag-string';

/**
 * Provide deprecation warning if buildFileTag used in the browser.
 */
export const buildFileTag = (filenm: string, clrize?: Function | number, rpadLen = 20): string => {
    console.warn(`DEPRECATION WARNING: mad-logs: buildFileTag method is intended for use in Node,`);
    console.warn(` & its inclusion in the browser build is now deprecated. Please import it from`);
    console.warn(` mad-logs/lib/node if using in Node, and remove uses from browser.`);
    return buildFileTagString(filenm)
};

/************************************* IMPORT PROJECT MODULES *************************************/
import { colours, style, logMarkers } from './src/theming';

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
    silly:   <T>(...args: Array<(string | any)>) => T;
    verbose: <T>(...args: Array<(string | any)>) => T;
    debug:   <T>(...args: Array<(string | any)>) => T;
    info:    <T>(...args: Array<(string | any)>) => T;
    warn:    <T>(...args: Array<(string | any)>) => T;
    error:   <T>(...args: Array<(string | any)>) => T;
    wtf:     <T>(...args: Array<(string | any)>) => T;
}

type LogMethod = <T>(...strs: any[]) => T;
type ToConsoleFunc = <T>(...strs: any[]) => T;

/********************************** CONFIG & LOG LEVEL HANDLING ***********************************/
// Default log level is info, if no config object given & no level set in the environment.
const logLevelBase = (process.env.LOG_LEVEL) ? process.env.LOG_LEVEL : 'info';

/**
 * Default config options
 */
const defLogOpts = { tagPrefix: '', tagSuffix: '', style: '' };
const defConfig = { logLevel: logLevelBase };

/**
 * Defines the available log levels in the application.
 */
const logValues = { silly: 1, verbose: 2, debug: 3, info: 4, warn: 5, error: 6, wtf: 7 };

/**
 * Get the log level value (number) corresponding to the log level string.
 */
const getLogVal = <T extends keyof typeof logValues>(logLvl: T): number => logValues[logLvl];

/****************************************** COLOUR UTILS ******************************************/
/**
 * Wrap text with tags to change the fg colour to yellow
 *     START TAG: \u001b[33m    END TAG: \u001b[39m
 */
const yellow = (text: string): string => `\u001b[33m${text}\u001b[39m`;
/**
 * Wrap text with tags to change the fg colour to red
 *     START TAG: \u001b[31m    END TAG: \u001b[39m
 */
const red = (text: string): string => `\u001b[31m${text}\u001b[39m`;
/**
 * Wrap text with tags to change the fg colour to white
 *     START TAG: \u001b[37m    END TAG: \u001b[39m
 */
const white = (text: string): string => `\u001b[37m${text}\u001b[39m`;
/**
 * Wrap text with tags to change the bg colour to red
 *     START TAG: \u001b[41m    END TAG: \u001b[49m
 */
const bgRed = (text: string): string => `\u001b[41m${text}\u001b[49m`;
/**
 * Wrap text with tags to change the fg colour to white
 *     START TAG: \u001b[47m    END TAG: \u001b[49m
 */
const bgWhite = (text: string): string => `\u001b[47m${text}\u001b[49m`;

/****************************************** VERIFICATION ******************************************/
/**
 * Ensure valid config object is passed in.
 * @param  {Object} string must be 1 of the logValues object's keys to be valid.
 * @return {undefined} - this operates via side effects (thrown exception on fail)
 */
const verifyConfig = (config) => {
    if (!config) return;
    if (config.constructor.name === 'Array') {
        throw new TypeError('Config object passed to mad-logs logFactory must not be an Array');
    }
    if (typeof config === 'object' && Object.keys(config).length === 0) {
        return;
    }
    if (!config.logLevel) {
        throw new TypeError('Config object passed to mad-logs logFactory must be null or have ' +
                            'key logLevel')
    }
    if (!isString(config.logLevel)) {
        throw new TypeError('Config.logLevel must be a string');
    }
    if (!Object.keys(logValues).some(logValue => logValue === config.logLevel)) {
        throw new TypeError(
            `config.logLevel must be one of the following: ${Object.keys(logValues).join(', ')}`
        );
    }
};

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
export const logFactory = (config: (AppConf | {}) = defConfig) => {
    // Throw if invalid params given.
    verifyConfig(config);

    return function buildLog(fileName: string, opts: LogOpts = defLogOpts): MadLog {
        const logLevelNum = getLogVal((config as any).logLevel || 'info');
        const fileTag = buildFileTagForBrowser(fileName, opts)

        const basicLog = (...strs: any[]): any => {
            console.log(fileTag, opts.style, ...strs);
            return strs[strs.length - 1];
        };

        /**
         * Builder for logging functions called by (most) properties on outputted log function-object
         */
        const logMethodFactory = (lvl: number, out: ToConsoleFunc = basicLog): LogMethod => {
            return <T>(...strs: any[]): T => {
                if (logLevelNum < lvl) out(...strs);
                return strs[strs.length - 1] as T;
            }
        }

        /************* CONSTRUCT LOG OBJECT METHODS FROM logMethodFactory **************/
        const log   = logMethodFactory(4) as MadLog;
        log.silly   = logMethodFactory(2);
        log.verbose = logMethodFactory(3);
        log.debug   = logMethodFactory(4);
        log.info    = logMethodFactory(5);
        log.warn    = logMethodFactory(6, warnLogOut(fileTag));

        /*********************** CONSTRUCT ERROR OBJECT METHOD *************************/
        log.error = logMethodFactory(7, (...strs: any[]): any => {
            if (isNode){
                console.error(bgRed(white((`[ERROR] ${fileTag}`))), ' :: ', ...strs)
            } else {
                console.error(fileTag, ': ', '%c[ERROR]', 'color: red;', ':: ', ...strs);
            }
            return strs[strs.length - 1];
        });

        /******************** CONSTRUCT SEVERE ERROR OBJECT METHOD *********************/
        log.wtf = logMethodFactory(8, (...strs: any[]): any => {
            const wtfTag = `[! DANGER: FATAL ERROR !]`;
            if (isNode) {
                console.error('\n', red(bgWhite(`${wtfTag} ${fileTag}`)), ' :: ', ...strs, '\n');
            } else {
                console.error(fileTag, ': ', `%c${wtfTag}`, 'color: red;', ':: ', ...strs);
            }
            return strs[strs.length - 1];
        });

        /**************** EXPORT FINAL CONSTRUCTED LOG OBJECT-FUNCTION *****************/
        return log;
    };
}

/******************************************** HELPERS *********************************************/
function buildFileTagForBrowser(fileName: string, opts: LogOpts): string {
    return (isNode)
        ? `${opts.tagPrefix}${fileName}${opts.tagSuffix}`
        : `${((opts.style) ? '%c' : '')}${opts.tagPrefix}[${fileName}]${opts.tagSuffix} `;
}

/**
 * Output a warning to the console with fileTag as a "marker" as ...strs as
 * the output. Isomorphic.
 */
function warnLogOut(fileTag: string): ToConsoleFunc {
    return (...strs: any[]): any => {
        if (isNode) {
            console.warn(yellow(`[WARNING] ${fileTag}`), ' :: ', ...strs)
        } else {
            console.warn(fileTag, ': ', '%c[WARNING]', 'color: yellow', ':: ', ...strs);
        }
        return strs[strs.length - 1];
    };
}

/********************************************* EXPORT *********************************************/
export { logMarkers }
