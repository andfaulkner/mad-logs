// TODO:
// 1) Make this throw instantly if it's imported outside Node.
// 2) log.fn constructor that creates a copy of the log object, with the function name added to the TAG.
// 3) 
"use strict";
var _this = this;
var env_var_helpers_1 = require("env-var-helpers");
var util_1 = require("util");
/******************************************** HELPERS *********************************************/
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
var passThruLog = function (logFn) { return function (fnNameOrVal, val) {
    if (!val) {
        logFn(fnNameOrVal);
        return fnNameOrVal;
    }
    else {
        logFn(fnNameOrVal, ':', val);
        return val;
    }
}; };
/**
 * Outer function returns a reusable 'inspector' function for returning deep-inspected versions of
 * objects, and automatically logging them with IDing information if (by default) LOG_LEVEL is
 * silly, verbose, debug, or info.
 *
 * @param {string} TAG - Decorated name of the file being logged from
 * @param {boolean} logCond - If true, don't just return the output, also log it.
 *
 * @return {Function} Inspector function with the following params:
 *     | @param {string|Object} msgOrObj - Message describing the object to be inspected (in the 2nd arg),
 *     | @param {string|Object} obj?     - Object for inspection, if 1st arg contained a message string.
 *     | @return {string} Pretty-printed string form of the object being inspected.
 */
var inspector = function (TAG, logCond) {
    if (logCond === void 0) { logCond = env_var_helpers_1.isInfo; }
    return function (msgOrObj, obj) {
        // Handle object inspection when a message arg was provided.
        if (obj && ((typeof obj === 'object') || (typeof obj === 'function'))) {
            var objInfoString = exports.inspect(obj);
            if (logCond) {
                console.log(TAG + " ~> " + (msgOrObj ? msgOrObj + ': ' : ''), objInfoString);
            }
            return objInfoString;
        }
        else if (typeof msgOrObj === 'string') {
            console.log(TAG + " ~> (NOTE: INSPECTED OBJ ALREADY STRING) : " + msgOrObj);
            return msgOrObj;
        }
        else if (typeof msgOrObj === 'object') {
            var objInfoString = exports.inspect(msgOrObj);
            var name = (msgOrObj.name) ? " " + msgOrObj.name + ": " : '';
            if (logCond) {
                console.log(TAG + " ~>" + name, objInfoString);
            }
            return objInfoString;
        }
        return msgOrObj;
    };
};
/********************************************* EXPORT *********************************************/
/**
 * Create a special log for the current file.
 * Produces an ultra-dynamic object with functions that also operate as objects at every layer.
 * The "root-level" function acts like log.info. Each key on that function contains a function
 * that either does specialized logging, or logs dependent on the current LOG_LEVEL value.
 *
 * @param {string} TAG - filename, possible decorated by a style.
 */
exports.nodeLogFactory = function (TAG) {
    var logObjFnBase = function () {
        var argsToLog = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argsToLog[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isInfo)
            console.log.apply(console, [TAG + " "].concat(argsToLog));
    };
    var logObj = Object.assign(logObjFnBase, {
        TAG: TAG,
        blankWrap: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, ["\n" + TAG + " "].concat(argsToLog, ['\n']));
        },
        blankWrap2: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, ["\n\n" + TAG + " "].concat(argsToLog, ['\n\n']));
        },
        blankWrap3: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, ["\n\n\n" + TAG + " "].concat(argsToLog, ['\n\n\n']));
        },
        silly: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            Object.keys(_this);
            if (env_var_helpers_1.isSilly)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        sillyError: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            Object.keys(_this);
            if (env_var_helpers_1.isSilly)
                console.error.apply(console, [TAG + " "].concat(argsToLog));
        },
        verbose: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isVerbose)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        verboseError: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isVerbose)
                console.error.apply(console, [TAG + " "].concat(argsToLog));
        },
        debug: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isDebug)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        debugError: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isDebug)
                console.error.apply(console, [TAG + " "].concat(argsToLog));
        },
        info: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isInfo)
                console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        infoError: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isInfo)
                console.error.apply(console, [TAG + " "].concat(argsToLog));
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
        always: function () {
            var argsToLog = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                argsToLog[_i] = arguments[_i];
            }
            console.log.apply(console, [TAG + " "].concat(argsToLog));
        },
        inspect: inspector(TAG),
    });
    /**
     * Set up log object to have a 'thru' property
     */
    var logObjBoundDeep = Object.keys(logObj).reduce(function (acc, logFnName) {
        var outVal = Object.assign(logObj[logFnName], {
            thru: passThruLog(logObj[logFnName]),
            inspect: (function () {
                switch (logFnName) {
                    case 'silly': return inspector(TAG, env_var_helpers_1.isSilly);
                    case 'sillyError': return inspector(TAG, env_var_helpers_1.isSilly);
                    case 'verbose': return inspector(TAG, env_var_helpers_1.isVerbose);
                    case 'verboseError': return inspector(TAG, env_var_helpers_1.isVerbose);
                    case 'debug': return inspector(TAG, env_var_helpers_1.isDebug);
                    case 'debugError': return inspector(TAG, env_var_helpers_1.isDebug);
                    case 'infoError': return inspector(TAG, env_var_helpers_1.isInfo);
                    case 'info': return inspector(TAG, env_var_helpers_1.isInfo);
                    case 'warn': return inspector(TAG, env_var_helpers_1.isWarn);
                    case 'error': return inspector(TAG, env_var_helpers_1.isError);
                    case 'wtf': return inspector(TAG, env_var_helpers_1.isWtf);
                    default: return inspector(TAG);
                }
            })()
        });
        acc[logFnName] = outVal;
        return acc;
    }, logObjFnBase);
    return logObjBoundDeep;
};
//# sourceMappingURL=node-log.js.map