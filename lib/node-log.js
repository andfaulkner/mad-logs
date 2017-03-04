"use strict";
var env_var_helpers_1 = require("env-var-helpers");
var util_1 = require("util");
/**
 * Preconfigured version of Node's util.inspect function. Automatically changes
 * depth based on the current process.env.LOG_LEVEL.
 *
 * @param {Object} obj - Object to inspect
 * @param {boolean} isHidden - [OPTIONAL] If true, show hidden values. Defaults to true
 *                             if process.env.LOG_LEVEL is 'silly' (otherwise it's false).
 * @return {string} Readable string representation of object (standard util.inspect output)
 */
exports.inspect = function (obj, isHidden) {
    var depth = (function () {
        var logLevelNorm = (process.env.LOG_LEVEL && typeof process.env.LOG_LEVEL === 'string')
            ? process.env.LOG_LEVEL.toLowerCase()
            : 'info';
        switch (logLevelNorm) {
            case 'silly': return 10;
            case 'verbose': return 7;
            case 'info': return 5;
            case 'warn': return 3;
            case 'error': return 2;
            case 'wtf': return 1;
        }
    })();
    return util_1.inspect(obj, {
        showHidden: (isHidden) ? isHidden : !!env_var_helpers_1.isSilly,
        depth: depth,
        colors: true
    });
};
/**
 * Create a special log for the current file
 * @param {string} TAG - filename, possible decorated by a style.
 */
exports.nodeLogFactory = function (TAG) {
    return ({
        blankWrap3: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, ["\n\n\n" + TAG + " "].concat(argsToLog, ['\n\n\n']));
        },
        blankWrap2: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, ["\n\n" + TAG + " "].concat(argsToLog, ['\n\n']));
        },
        blankWrap: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, ["\n" + TAG + " "].concat(argsToLog, ['\n']));
        },
        silly: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isSilly)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        verbose: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isVerbose)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        debug: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isDebug)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        info: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isInfo)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        warn: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isWarn)
                console.warn.apply(console, [TAG + " "].concat(argsToLog));
        },
        error: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isError)
                console.error.apply(console, [TAG + " "].concat(argsToLog));
        },
        wtf: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isWtf)
                console.error.apply(console, [TAG + " "].concat(argsToLog));
        },
        inspect: exports.inspect
    });
};
//# sourceMappingURL=node-log.js.map