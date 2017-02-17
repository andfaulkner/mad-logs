"use strict";
var env_var_helpers_1 = require("env-var-helpers");
if (process.env.mocha === true) {
}
// export function injectConsoleForTest(cl, fn, ...msg) {
//     console.log = 
//     const storeLogs = [];
//     origConsoleLog = console.log;
//     console.log = (...msg) => storeLogs.push(msg);
// }
function isolog(TAG) {
    if (TAG === void 0) { TAG = ''; }
    var logFns = {
        /**
         * Log if LOG_LEVEL is silly
         */
        silly: function silly() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlSilly)
                console.log.apply(console, ["" + TAG].concat(msg));
        },
        /**
         * Log if LOG_LEVEL is verbose or higher: verbose or silly
         */
        verbose: function verbose() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlVerbose)
                console.log.apply(console, ["" + TAG].concat(msg));
        },
        /**
         * Log if LOG_LEVEL is debug
         */
        debug: function debug() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlDebug)
                console.log.apply(console, ["" + TAG].concat(msg));
        },
        /**
         * Log if LOG_LEVEL is info or higher: info, verbose, or silly
         */
        info: function info() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlInfo)
                console.log.apply(console, ["" + TAG].concat(msg));
        },
        /**
         * Log if LOG_LEVEL is warn or higher: warn, info, verbose, or silly
         */
        warn: function warn() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlWarn)
                console.log.apply(console, ["" + TAG].concat(msg));
        },
        /**
         * Log if LOG_LEVEL is error or higher: error, warn, info, verbose, or silly
         */
        error: function error() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlError)
                console.log.apply(console, ["" + TAG].concat(msg));
        },
        /**
         * Log if LOG_LEVEL is wtf or higher: wtf, error, warn, info, verbose, or silly
         */
        wtf: function wtf() {
            var msg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                msg[_i] = arguments[_i];
            }
            if (env_var_helpers_1.logGtEqlWtf)
                console.log.apply(console, ["" + TAG].concat(msg));
        }
    };
    return logFns;
}
exports.isolog = isolog;
;
exports.isoLog = isolog;
//# sourceMappingURL=simple-by-log-level.js.map