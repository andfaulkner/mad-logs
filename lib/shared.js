"use strict";
/************************************** THIRD-PARTY MODULES ***************************************/
var env_var_helpers_1 = require("env-var-helpers");
var isomorphic_styles_1 = require("./src/isomorphic-styles");
exports.Styles = isomorphic_styles_1.isoStyles;
var isNode = require("detect-node");
/**************************************** HELPERS & CONFIG ****************************************/
var bookend = "\n***************\n";
/**
 * @private
 *
 * Basic function to run the inspect function against the given object.
 * Both logs & returns the inspect result.
 */
var _showInspectRes = function (obj, styler, filename, inspectFn) {
    var output;
    if (typeof obj === 'undefined') {
        output = 'undefined';
    }
    else if (obj == null) {
        output = 'null';
    }
    else if (typeof obj === 'string' || typeof obj === 'number') {
        output = obj.toString();
    }
    else {
        output = inspectFn(obj);
    }
    console.log("" + bookend + styler(filename) + " :: \n" + output + bookend);
    // return output;
};
/******************************************* LOG OBJECT *******************************************/
/**
 * @export Main exported class
 *
 * Isomorphic Log object. Logs differently between Node and Browser.
 */
var Log = (function () {
    /* INITIALIZATION */
    /**
     * @constructor for Log object
     * @param {string} fileName Current file name, to include before each message this logger emits
     * @param {Function|string} style String-wrapping function OR 1 of isoStyles' keys (string)
     * @param {Function?} inspectFn If given, becomes new global inspector for all Log objects.
     *                              Uses a fallback inspect fn if none provided.
     *                              Allows DI of node's inspect without having browser issues.
     * If none is defined, use a fallback (passthrough) instead

     */
    function Log(filename, style, inspectFn) {
        var _this = this;
        /* METHODS */
        this.silly = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isSilly) {
                console.log.apply(console, [_this.styler(_this.filename)].concat(args));
                return args[0];
            }
        };
        this.verbose = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isVerbose) {
                console.log.apply(console, [_this.styler(_this.filename)].concat(args));
                return args[0];
            }
        };
        this.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isDebug) {
                console.log.apply(console, [_this.styler(_this.filename)].concat(args));
                return args[0];
            }
        };
        this.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isInfo) {
                console.log.apply(console, [_this.styler(_this.filename)].concat(args));
                return args[0];
            }
        };
        this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isWarn) {
                console.log.apply(console, [_this.styler(_this.filename)].concat(args));
                return args[0];
            }
        };
        this.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isError) {
                if (isNode) {
                    var bgRed = isomorphic_styles_1.nodeStyling.bgRed, white = isomorphic_styles_1.nodeStyling.white, bold = isomorphic_styles_1.nodeStyling.bold;
                    console.error.apply(console, [bgRed(white(bold("[ERROR] " + _this.filename))), ' :: '].concat(args));
                }
                else {
                    console.error.apply(console, [_this.styler(_this.filename), ' [ERROR] '].concat(args));
                }
            }
            return args[args.length - 1];
        };
        this.wtf = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isError) {
                if (isNode) {
                    var bgRed = isomorphic_styles_1.nodeStyling.bgRed, white = isomorphic_styles_1.nodeStyling.white, bold = isomorphic_styles_1.nodeStyling.bold;
                    console.error.apply(console, [bgRed(white(bold("[ERROR] " + _this.filename))), ' :: '].concat(args));
                }
                else {
                    console.error.apply(console, [_this.styler(_this.filename), ' [ERROR] '].concat(args));
                }
            }
            return args[args.length - 1];
        };
        /* OBJECT INSPECTION */
        this.inspector = (function () { return ({
            silly: function (obj) {
                if (env_var_helpers_1.isSilly)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
            verbose: function (obj) {
                if (env_var_helpers_1.isVerbose)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
            debug: function (obj) {
                if (env_var_helpers_1.isDebug)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
            info: function (obj) {
                if (env_var_helpers_1.isInfo)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
            warn: function (obj) {
                if (env_var_helpers_1.isWarn)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
            error: function (obj) {
                if (env_var_helpers_1.isError)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
            wtf: function (obj) {
                if (env_var_helpers_1.isWtf)
                    return _showInspectRes(obj, _this.styler, _this.filename, _this.inspectFn);
            },
        }); })();
        // Set the file name
        this.filename = filename;
        // Define new 'global' inspectFn if one was given; use fallback otherwise.
        if (inspectFn)
            Log.inspectFn = inspectFn;
        this.inspectFn = Log.inspectFn || (function (obj) { return obj; });
        // Set the styler function based on the given value of the style prop.
        if (typeof style === 'undefined' || style == null)
            this.styler = isomorphic_styles_1.isoStyles.a;
        else if (typeof style === 'string')
            this.styler = isomorphic_styles_1.isoStyles[style];
        else
            this.styler = style;
    }
    return Log;
}());
exports.Log = Log;
/******************************************** FACTORY *********************************************/
/**
 * @export Use to construct a new Log object & return it. [NOTE: PRIMARY EXPORT]
 *
 * @param {string} fileName Name of current file (to include before each message this logger emits)
 * @param {Function|string} style String-wrapping function OR string matching 1 of isoStyles' keys
 *
 * @return {Log & Function} Log instance. Also runs as standalone function (delegates to this.info)
 */
exports.logFactory = function (filename, style, inspector) {
    var log = new Log(filename, style, inspector);
    return Object.assign(log.info.bind(log), log, { inspect: log.inspector.info.bind(log) });
};
//# sourceMappingURL=shared.js.map