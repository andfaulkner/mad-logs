"use strict";
/******************************************** IMPORTS *********************************************/
var env_var_helpers_1 = require("env-var-helpers");
var util_1 = require("util");
var isNode = require("detect-node");
/************************ ENSURE MODULE ONLY LOADED IN CORRECT ENVIRONMENT ************************/
// Throw error & crash the app if attempt made to load this sub-module outside Node.
if (!isNode && !process.env.mocha) {
    var mlogsErrStr = "mad-logs: Can't import mad-logs/lib/node into browser env. NodeJS only.";
    console.error(mlogsErrStr);
    throw new TypeError(mlogsErrStr);
}
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
var passThruLog = function (logFn) { return function () {
    var anyArgsWLastArgT = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        anyArgsWLastArgT[_i] = arguments[_i];
    }
    if (anyArgsWLastArgT.length > 0) {
        logFn(anyArgsWLastArgT);
        return anyArgsWLastArgT[anyArgsWLastArgT.length - 1];
    }
    else {
        logFn('');
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
            var msgTag = TAG + " ~> " + msgOrObj;
            switch (typeof obj) {
                case "undefined":
                    if (logCond)
                        console.log("" + msgTag);
                    return msgOrObj;
                case "string":
                    if (logCond)
                        console.log("" + msgTag, obj);
                    return obj;
                case "object":
                    if (logCond)
                        console.log("" + msgTag, exports.inspect(obj));
                    return obj;
                case "function":
                    if (logCond)
                        console.log("" + msgTag, obj.toString());
                    return obj;
                default:
                    if (logCond)
                        console.log(msgTag + " [TYPE UNKNOWN]:", exports.inspect(obj));
                    return obj;
            }
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
/**
 * Actual builder for the log library, minus the fn method.
 */
var logObjFactory = function (TAG, fnName) {
    var fTAG = (fnName) ? TAG + " [func: " + fnName + "] ::" : TAG;
    var logTemplate = function (logGate, logType, wrap) {
        if (wrap === void 0) { wrap = ''; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (logGate) {
                if (logType === 'log')
                    console.log.apply(console, ["" + wrap + fTAG + " "].concat(args, ["" + wrap]));
                if (logType === 'error')
                    console.error.apply(console, ["" + wrap + fTAG + " "].concat(args, ["" + wrap]));
                if (logType === 'warn')
                    console.warn.apply(console, ["" + wrap + fTAG + " "].concat(args, ["" + wrap]));
            }
        };
    };
    var logObj = Object.assign(logTemplate(env_var_helpers_1.isInfo, 'log'), {
        TAG: TAG,
        blankWrap: logTemplate(env_var_helpers_1.isWtf, 'log', "\n"),
        blankWrap2: logTemplate(env_var_helpers_1.isWtf, 'log', "\n\n"),
        blankWrap3: logTemplate(env_var_helpers_1.isWtf, 'log', "\n\n\n"),
        silly: logTemplate(env_var_helpers_1.isSilly, 'log'),
        sillyError: logTemplate(env_var_helpers_1.isSilly, 'error'),
        verbose: logTemplate(env_var_helpers_1.isVerbose, 'log'),
        verboseError: logTemplate(env_var_helpers_1.isVerbose, 'error'),
        debug: logTemplate(env_var_helpers_1.isDebug, 'log'),
        debugError: logTemplate(env_var_helpers_1.isDebug, 'error'),
        info: logTemplate(env_var_helpers_1.isInfo, 'log'),
        infoError: logTemplate(env_var_helpers_1.isInfo, 'error'),
        warn: logTemplate(env_var_helpers_1.isWarn, 'warn'),
        error: logTemplate(env_var_helpers_1.isError, 'error'),
        wtf: logTemplate(env_var_helpers_1.isWtf, 'error'),
        always: logTemplate(env_var_helpers_1.isWtf, 'log'),
        inspect: inspector(fTAG),
    });
    /**
     * Set up log object to have 'thru' and inspect properties attached to all methods.
     */
    var logObjBoundDeep = Object.keys(logObj).reduce(function (acc, logFnName) {
        var outVal = Object.assign(logObj[logFnName], {
            thru: passThruLog(logObj[logFnName]),
            inspect: (function () {
                switch (logFnName) {
                    case 'silly': return inspector(fTAG, env_var_helpers_1.isSilly);
                    case 'sillyError': return inspector(fTAG, env_var_helpers_1.isSilly);
                    case 'verbose': return inspector(fTAG, env_var_helpers_1.isVerbose);
                    case 'verboseError': return inspector(fTAG, env_var_helpers_1.isVerbose);
                    case 'debug': return inspector(fTAG, env_var_helpers_1.isDebug);
                    case 'debugError': return inspector(fTAG, env_var_helpers_1.isDebug);
                    case 'infoError': return inspector(fTAG, env_var_helpers_1.isInfo);
                    case 'info': return inspector(fTAG, env_var_helpers_1.isInfo);
                    case 'warn': return inspector(fTAG, env_var_helpers_1.isWarn);
                    case 'error': return inspector(fTAG, env_var_helpers_1.isError);
                    case 'wtf': return inspector(fTAG, env_var_helpers_1.isWtf);
                    default: return inspector(fTAG);
                }
            })()
        });
        acc[logFnName] = outVal;
        return acc;
    }, logTemplate(env_var_helpers_1.isInfo, 'log'));
    return logObjBoundDeep;
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
    // Build main log factory.
    var logObjBoundDeep = logObjFactory(TAG);
    // Attach fn to logObj, for creating function-scoped log instances.
    Object.assign(logObjBoundDeep, {
        fn: function (fnName) { return logObjFactory(TAG, fnName); },
    });
    return logObjBoundDeep;
};
var build_file_tag_string_1 = require("./src/build-file-tag-string");
exports.buildFileTag = build_file_tag_string_1.buildFileTagString;
var colors = require("colors");
exports.colors = colors;
//# sourceMappingURL=node.js.map