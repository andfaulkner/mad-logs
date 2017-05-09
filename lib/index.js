/************************************** THIRD-PARTY IMPORTS ***************************************/
// const find = require("lodash.find");
// const isString = require("lodash.isstring");
"use strict";
var lodash_1 = require("lodash");
var isNode = require("detect-node");
var build_file_tag_string_1 = require("./src/build-file-tag-string");
/**
 * Provide deprecation warning if buildFileTag used in the browser.
 */
exports.buildFileTag = function (filenm, clrize, rpadLen) {
    if (rpadLen === void 0) { rpadLen = 20; }
    console.warn("DEPRECATION WARNING: mad-logs: buildFileTag method is intended for use in Node,");
    console.warn(" & its inclusion in the browser build is now deprecated. Please import it from");
    console.warn(" mad-logs/lib/node if using in Node, and remove uses from browser.");
    return build_file_tag_string_1.buildFileTagString(filenm);
};
/************************************* IMPORT PROJECT MODULES *************************************/
var theming_1 = require("./src/theming");
exports.logMarkers = theming_1.logMarkers;
/********************************** CONFIG & LOG LEVEL HANDLING ***********************************/
// Default log level is info, if no config object given & no level set in the environment.
var logLevelBase = (process.env.LOG_LEVEL) ? process.env.LOG_LEVEL : 'info';
/**
 * Default config options
 */
var defLogOpts = { tagPrefix: '', tagSuffix: '', style: '' };
var defConfig = { logLevel: logLevelBase };
/**
 * Defines the available log levels in the application.
 */
var logValues = { silly: 1, verbose: 2, debug: 3, info: 4, warn: 5, error: 6, wtf: 7 };
/**
 * Get the log level value (number) corresponding to the log level string.
 */
var getLogVal = function (logLvl) { return logValues[logLvl]; };
/****************************************** COLOUR UTILS ******************************************/
/**
 * Wrap text with tags to change the fg colour to yellow
 *     START TAG: \u001b[33m    END TAG: \u001b[39m
 */
var yellow = function (text) { return "\u001B[33m" + text + "\u001B[39m"; };
/**
 * Wrap text with tags to change the fg colour to red
 *     START TAG: \u001b[31m    END TAG: \u001b[39m
 */
var red = function (text) { return "\u001B[31m" + text + "\u001B[39m"; };
/**
 * Wrap text with tags to change the fg colour to white
 *     START TAG: \u001b[37m    END TAG: \u001b[39m
 */
var white = function (text) { return "\u001B[37m" + text + "\u001B[39m"; };
/**
 * Wrap text with tags to change the bg colour to red
 *     START TAG: \u001b[41m    END TAG: \u001b[49m
 */
var bgRed = function (text) { return "\u001B[41m" + text + "\u001B[49m"; };
/**
 * Wrap text with tags to change the fg colour to white
 *     START TAG: \u001b[47m    END TAG: \u001b[49m
 */
var bgWhite = function (text) { return "\u001B[47m" + text + "\u001B[49m"; };
/****************************************** VERIFICATION ******************************************/
/**
 * Ensure valid config object is passed in.
 * @param  {Object} string must be 1 of the logValues object's keys to be valid.
 * @return {undefined} - this operates via side effects (thrown exception on fail)
 */
var verifyConfig = function (config) {
    if (!config)
        return;
    if (config.constructor.name === 'Array') {
        throw new TypeError('Config object passed to mad-logs logFactory must not be an Array');
    }
    if (typeof config === 'object' && Object.keys(config).length === 0) {
        return;
    }
    if (!config.logLevel) {
        throw new TypeError('Config object passed to mad-logs logFactory must be null or have ' +
            'key logLevel');
    }
    if (!lodash_1.isString(config.logLevel)) {
        throw new TypeError('Config.logLevel must be a string');
    }
    if (!Object.keys(logValues).some(function (logValue) { return logValue === config.logLevel; })) {
        throw new TypeError("config.logLevel must be one of the following: " + Object.keys(logValues).join(', '));
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
exports.logFactory = function (config) {
    if (config === void 0) { config = defConfig; }
    // Throw if invalid params given.
    verifyConfig(config);
    return function buildLog(fileName, opts) {
        if (opts === void 0) { opts = defLogOpts; }
        var logLevelNum = getLogVal(config.logLevel || 'info');
        var fileTag = buildFileTagForBrowser(fileName, opts);
        var basicLog = function () {
            var strs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                strs[_i] = arguments[_i];
            }
            console.log.apply(console, [fileTag, opts.style].concat(strs));
            return strs[strs.length - 1];
        };
        /**
         * Builder for logging functions called by (most) properties on outputted log function-object
         */
        var logMethodFactory = function (lvl, out) {
            if (out === void 0) { out = basicLog; }
            return function () {
                var strs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    strs[_i] = arguments[_i];
                }
                if (logLevelNum < lvl)
                    out.apply(void 0, strs);
                return strs[strs.length - 1];
            };
        };
        /************* CONSTRUCT LOG OBJECT METHODS FROM logMethodFactory **************/
        var log = logMethodFactory(4);
        log.silly = logMethodFactory(2);
        log.verbose = logMethodFactory(3);
        log.debug = logMethodFactory(4);
        log.info = logMethodFactory(5);
        log.warn = logMethodFactory(6, warnLogOut(fileTag));
        /*********************** CONSTRUCT ERROR OBJECT METHOD *************************/
        log.error = logMethodFactory(7, function () {
            var strs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                strs[_i] = arguments[_i];
            }
            if (isNode) {
                console.error.apply(console, [bgRed(white(("[ERROR] " + fileTag))), ' :: '].concat(strs));
            }
            else {
                console.error.apply(console, [fileTag, ': ', '%c[ERROR]', 'color: red;', ':: '].concat(strs));
            }
            return strs[strs.length - 1];
        });
        /******************** CONSTRUCT SEVERE ERROR OBJECT METHOD *********************/
        log.wtf = logMethodFactory(8, function () {
            var strs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                strs[_i] = arguments[_i];
            }
            var wtfTag = "[! DANGER: FATAL ERROR !]";
            if (isNode) {
                console.error.apply(console, ['\n', red(bgWhite(wtfTag + " " + fileTag)), ' :: '].concat(strs, ['\n']));
            }
            else {
                console.error.apply(console, [fileTag, ': ', "%c" + wtfTag, 'color: red;', ':: '].concat(strs));
            }
            return strs[strs.length - 1];
        });
        /**************** EXPORT FINAL CONSTRUCTED LOG OBJECT-FUNCTION *****************/
        return log;
    };
};
/******************************************** HELPERS *********************************************/
function buildFileTagForBrowser(fileName, opts) {
    return (isNode)
        ? "" + opts.tagPrefix + fileName + opts.tagSuffix
        : "" + ((opts.style) ? '%c' : '') + opts.tagPrefix + "[" + fileName + "]" + opts.tagSuffix + " ";
}
/**
 * Output a warning to the console with fileTag as a "marker" as ...strs as
 * the output. Isomorphic.
 */
function warnLogOut(fileTag) {
    return function () {
        var strs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            strs[_i] = arguments[_i];
        }
        if (isNode) {
            console.warn.apply(console, [yellow("[WARNING] " + fileTag), ' :: '].concat(strs));
        }
        else {
            console.warn.apply(console, [fileTag, ': ', '%c[WARNING]', 'color: yellow', ':: '].concat(strs));
        }
        return strs[strs.length - 1];
    };
}
//# sourceMappingURL=index.js.map