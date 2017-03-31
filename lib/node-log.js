// TODO:
// 1) Make this throw instantly if it's imported outside Node.
// 2) log.fn constructor that creates a copy of the log object, with the function name added to the TAG.
// 3) 
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
        logFn(fnNameOrVal, ':', val);
        return val;
    }
}; };
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
        inspect: function (msgOrObj, obj) {
            if (obj && ((typeof obj === 'object') || (typeof obj === 'function'))) {
                var objInfoString = exports.inspect(obj);
                if (env_var_helpers_1.isInfo) {
                    console.log(TAG + " " + msgOrObj + ":", objInfoString);
                }
                return objInfoString;
            }
            else if (typeof msgOrObj === 'string') {
                console.log(TAG + " (inspected obj already string): " + msgOrObj);
                return;
            }
            else if (typeof msgOrObj === 'object') {
                var objInfoString = exports.inspect(msgOrObj);
                var name = (msgOrObj.name) ? msgOrObj.name + ': ' : '';
                if (env_var_helpers_1.isInfo) {
                    console.log(TAG + " " + name + ": ", objInfoString);
                }
                return objInfoString;
            }
        },
    });
    /**
     * Set up log object to have a 'thru' property
     */
    var logObjBoundThru = Object.keys(logObj).reduce(function (acc, logFnName) {
        var outVal = Object.assign(logObj[logFnName], {
            thru: passThruLog(logObj[logFnName])
        });
        acc[logFnName] = outVal;
        return acc;
    }, logObjFnBase);
    // const logObjBoundThruPlusFn = Object.assign(logObjBoundThru, {
    //     fn: (this: NodeMadLogsInstance, fnName: string) => {
    //         // TODO clone deep. Version below won't work: it'll point to the original, not make a copy
    //         const self = Object.this;
    //         self.TAG = JSON.parse(JSON.stringify({ TAG: self.TAG })).TAG + fnName;
    //         return self;
    //     }
    // })
    return logObjBoundThru;
};
//# sourceMappingURL=node-log.js.map