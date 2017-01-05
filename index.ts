/************************************** THIRD-PARTY IMPORTS ***************************************/
// const find = require("lodash.find"); 
// const isString = require("lodash.isstring"); 

import { find, isString } from 'lodash';
import * as isNode from 'detect-node';

/************************************* IMPORT PROJECT MODULES *************************************/
import { colours, style, logMarkers } from './src/theming';
import { buildFileTagString } from './src/build-file-tag-string';
const buildFileTag = buildFileTagString;

const colors = (isNode)
    ? require('colors/safe')
    : {};


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


/*************************************** LOG LEVEL HANDLING ***************************************/
// default log level is 'info', if no config object is given, and none is set in the environment
const logLevelBase = (process.env.LOG_LEVEL)
    ? process.env.LOG_LEVEL
    : 'info';

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

/**
 * Ensure valid config object is passed in
 * @param  {Function} next - next function in the sequence. Passed in to allow this function to
 *                           wrap other functions
 * @param  {Object<String>}> string must be 1 of the logValues object's keys to be valid
 * @return {Function} next
 */
const verifyConfig = (config, next) => {
    if (!config) {
        return next(config);
    }
    if (!(config.logLevel)) {
        throw new TypeError('config object passed to mad-logs logFactory must have key logLevel')
    }
    if (!isString(config.logLevel)) {
        throw new TypeError('config.logLevel must be a string');
    }
    if (!(Object.keys(logValues).some((logValue) => (logValue === config.logLevel)))) {
        throw new TypeError(
            `config.logLevel must be one of the following: ${Object.keys(logValues).join(', ')}`
        );
    }
    return next(config);
};

/**
 * Default config options
 */
const defLogOpts = { tagPrefix: '', tagSuffix: '', style: '' };
const defConfig = { logLevel: logLevelBase };

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
const logFactory = (config: AppConf = defConfig) => verifyConfig(config,
    (conf: AppConf) => function buildLog(fileName: string, opts: LogOpts = defLogOpts): MadLog {
        const logLevelNum = getLogVal(conf.logLevel);
        const fileTag = buildFileTagForBrowser(fileName, opts)

        const basicLog = (...strs: any[]): void => {
            console.log(fileTag, opts.style, ...strs);
        };

        /**
         * Builder for logging functions called by (most) properties on outputted log function-object
         */
        const logMethodFactory = (levelNum: number, output: ToConsoleFunc = basicLog): LogMethod => {
            return (...strs) => {
                if (logLevelNum < levelNum) {
                    output(...strs);
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
                ? console.error(colors.bgRed.white(`[ERROR] ${fileTag}`), ' :: ', ...strs)
                : console.error(fileTag, ': ', '%c[ERROR]', 'color: red;', ':: ', ...strs);
        });

        /******************** CONSTRUCT SEVERE ERROR OBJECT METHOD *********************/
        log.wtf = logMethodFactory(8, (...strs) => {
            (isNode)
                ? console.error('\n', colors.red.bgWhite(`[! DANGER: HUGE ERROR !] ${fileTag}`),
                                ' :: ', ...strs, '\n')
                : console.error(fileTag, ': ', '%c[! DANGER: HUGE ERROR !]', 'color: red;', ':: ',
                                ...strs);
        });

        /**************** EXPORT FINAL CONSTRUCTED LOG OBJECT-FUNCTION *****************/
        return log;
    });

/******************************************** HELPERS *********************************************/
function buildFileTagForBrowser(fileName: string, opts: LogOpts): string {
    return (isNode)
        ? `${opts.tagPrefix}[${fileName}]${opts.tagSuffix}`
        : `${((opts.style) ? '%c' : '')}${opts.tagPrefix}[${fileName}]${opts.tagSuffix} `;
}

function warnLogOut(fileTag: string): ToConsoleFunc {
    return (...strs) => {
        (isNode)
            ? console.warn(colors.yellow(`[WARNING] ${fileTag}`), ' :: ', ...strs)
            : console.warn(fileTag, ': ', '%c[WARNING]', 'color: yellow', ':: ', ...strs);
    };
}

export { logMarkers, logFactory, buildFileTag }

