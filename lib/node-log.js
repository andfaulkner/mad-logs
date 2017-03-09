"use strict";
var _this = this;
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
var passThruLog = function (logFn) { return function (fnNameOrVal, val) {
    if (!val) {
        logFn(fnNameOrVal);
        return fnNameOrVal;
    }
    else {
        logFn(fnNameOrVal, val);
        return val;
    }
}; };
/**
 * Create a special log for the current file
 * @param {string} TAG - filename, possible decorated by a style.
 */
exports.nodeLogFactory = function (TAG) {
    var logObj = {
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
            Object.keys(_this);
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
    };
    var logObjBoundThru = Object.keys(logObj).reduce(function (acc, logFnName) {
        console.log('logObj[logFnName]: initial:', logObj[logFnName]);
        var outVal = Object.assign(logObj[logFnName], { thru: passThruLog(logObj[logFnName]) });
        console.log('outVal:', outVal);
        acc[logFnName] = outVal;
        return acc;
    }, {});
    console.log("inspect logObjBoundThru:", logObj.inspect(logObjBoundThru));
    console.log("logObjBoundThru:", logObjBoundThru);
    console.log("logObjBoundThru.silly.thru:", logObjBoundThru.silly.thru);
    console.log("logObjBoundThru.verbose.thru:", logObjBoundThru.verbose.thru);
    console.log("logObjBoundThru.info.thru:", logObjBoundThru.info.thru);
    return logObjBoundThru;
};
//# sourceMappingURL=node-log.js.map