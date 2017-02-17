import { logGtEqlSilly, logGtEqlDebug, logGtEqlVerbose, logGtEqlInfo,
         logGtEqlWarn, logGtEqlError, logGtEqlWtf } from 'env-var-helpers';

if (process.env.mocha === true) {

}

// export function injectConsoleForTest(cl, fn, ...msg) {
//     console.log = 
//     const storeLogs = [];
//     origConsoleLog = console.log;
//     console.log = (...msg) => storeLogs.push(msg);
// }

export function isolog(TAG = '') {
    const logFns = {
        /**
         * Log if LOG_LEVEL is silly
         */
        silly: function silly(...msg: any[]) {
            if (logGtEqlSilly) console.log(`${TAG}`, ...msg);
        },

        /**
         * Log if LOG_LEVEL is verbose or higher: verbose or silly
         */
        verbose: function verbose(...msg: any[]) {
            if (logGtEqlVerbose) console.log(`${TAG}`, ...msg);
        },

        /**
         * Log if LOG_LEVEL is debug
         */
        debug: function debug(...msg: any[]) {
            if (logGtEqlDebug) console.log(`${TAG}`, ...msg);
        },

        /**
         * Log if LOG_LEVEL is info or higher: info, verbose, or silly
         */
        info: function info(...msg: any[]) {
            if (logGtEqlInfo) console.log(`${TAG}`, ...msg);
        },

        /**
         * Log if LOG_LEVEL is warn or higher: warn, info, verbose, or silly
         */
        warn: function warn(...msg: any[]) {
            if (logGtEqlWarn) console.log(`${TAG}`, ...msg);
        },

        /**
         * Log if LOG_LEVEL is error or higher: error, warn, info, verbose, or silly
         */
        error: function error(...msg: any[]) {
            if (logGtEqlError) console.log(`${TAG}`, ...msg);
        },

        /**
         * Log if LOG_LEVEL is wtf or higher: wtf, error, warn, info, verbose, or silly
         */
        wtf: function wtf(...msg: any[]) {
            if (logGtEqlWtf) console.log(`${TAG}`, ...msg);
        }
    };
    return logFns;
};

export const isoLog = isolog;
