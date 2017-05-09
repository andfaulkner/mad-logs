/************************************** THIRD-PARTY IMPORTS ***************************************/
// const find = require("lodash.find");
// const isString = require("lodash.isstring");

import { find, isString } from 'lodash';
import * as isNode from 'detect-node';

import { buildFileTagString } from './src/build-file-tag-string';

/**
 * Provide deprecation warning if buildFileTag used in the browser.
 */
// tslint:disable-next-line
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
    logLevel: string;
}

export interface LogOpts {
  tagPrefix: string;
  tagSuffix: string;
  style: string;
}

export interface MadLog {
    (...strs: any[]): any;
    silly: any;
    verbose: any;
    debug: any;
    info: any;
    warn: any;
    error: any;
    wtf: any;
}

type LogMethod = (...strs: any[]) => string;
type ToConsoleFunc = (...strs: any[]) => void;

/********************************** CONFIG & LOG LEVEL HANDLING ***********************************/
// default log level is 'info', if no config object is given, and none is set in the environment
const logLevelBase = (process.env.LOG_LEVEL)
    ? process.env.LOG_LEVEL
    : 'info';

/**
 * Default config options
 */
const defLogOpts = { tagPrefix: '', tagSuffix: '', style: '' };
const defConfig = { logLevel: logLevelBase };

/**
 * Defines the available log levels in the application
 */
const logValues = {
    silly: 1,
    verbose: 2,
    debug: 3,
    info: 4,
    warn: 5,
    error: 6,
    wtf: 7,
};

/**
 * Get the log level value (number) corresponding to the log level string
 */
const getLogVal = (logLevel = 'info'): number | boolean => {
    return find(logValues, (logValNum: number, logVal: string) => {
        return ((logVal === logLevel) ? logValNum : (false));
    });
};

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
    if (!(config.logLevel)) {
        throw new TypeError('Config object passed to mad-logs logFactory must be null or have ' +
                            'key logLevel')
    }
    if (!isString(config.logLevel)) {
        throw new TypeError('Config.logLevel must be a string');
    }
    if (!(Object.keys(logValues).some((logValue) => (logValue === config.logLevel)))) {
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
        const logLevelNum = getLogVal((config as any).logLevel || 4);
        const fileTag = buildFileTagForBrowser(fileName, opts)

        const basicLog = (...strs: any[]): void => {
            console.log(fileTag, opts.style, ...strs);
        };

        /**
         * Builder for logging functions called by (most) properties on outputted log function-object
         */
        const logMethodFactory = (levelNum: number, out: ToConsoleFunc = basicLog): LogMethod => {
            return (...strs) => {
                if (logLevelNum < levelNum) {
                    out(...strs);
                }
                return strs[0];
            }
        };

        /************* CONSTRUCT LOG OBJECT METHODS FROM logMethodFactory **************/
        const log = logMethodFactory(4) as MadLog;
        log.silly = logMethodFactory(2);
        log.verbose = logMethodFactory(3);
        log.debug = logMethodFactory(4);
        log.info = logMethodFactory(5);
        log.warn = logMethodFactory(6, warnLogOut(fileTag));

        /*********************** CONSTRUCT ERROR OBJECT METHOD *************************/
        log.error = logMethodFactory(7, (...strs) => {
            (isNode)
                  // \u001b[41m \u001b[49m   \u001b[37m \u001b[39m
                ? console.error(bgRed(white((`[ERROR] ${fileTag}`))), ' :: ', ...strs)
                : console.error(fileTag, ': ', '%c[ERROR]', 'color: red;', ':: ', ...strs);
        });

        /******************** CONSTRUCT SEVERE ERROR OBJECT METHOD *********************/
        log.wtf = logMethodFactory(8, (...strs) => {
            (isNode)
                  // \u001b[31m \u001b[39m   \u001b[47m \u001b[49m
                ? console.error('\n', red(bgWhite(`[! DANGER: FATAL ERROR !] ${fileTag}`)),
                                ' :: ', ...strs, '\n')
                : console.error(fileTag, ': ', '%c[! DANGER: FATAL ERROR !]', 'color: red;', ':: ',
                                ...strs);
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
 * Output a warning to the console with fileTag as a "marker" as ...strs as the output.
 * Isomorphic.
 */
function warnLogOut(fileTag: string): ToConsoleFunc {
    return (...strs) => {
        (isNode)
            ? console.warn(yellow(`[WARNING] ${fileTag}`), ' :: ', ...strs)
            : console.warn(fileTag, ': ', '%c[WARNING]', 'color: yellow', ':: ', ...strs);
    };
}

/****************************************** COLOUR UTILS ******************************************/
// Start: \u001b[33m     End: \u001b[39m
function yellow(text) {
    return `\u001b[33m${text}\u001b[39m`;
}

// Start: \u001b[31m     End: \u001b[39m
function red(text) {
    return `\u001b[31m${text}\u001b[39m`;
}

// Start: \u001b[37m     End: \u001b[39m
function white(text) {
    return `\u001b[37m${text}\u001b[39m`;
}

// Start: \u001b[41m     End: \u001b[49m
function bgRed(text) {
    return `\u001b[41m${text}\u001b[49m`;
}

// Start: \u001b[47m     End: \u001b[49m
function bgWhite(text) {
    return `\u001b[47m${text}\u001b[49m`;
}

/********************************************* EXPORT *********************************************/
export { logMarkers }
