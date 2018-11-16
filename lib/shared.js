"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/************************************** THIRD-PARTY MODULES ***************************************/
var env_var_helpers_1 = require("env-var-helpers");
var isomorphic_styles_1 = require("./src/isomorphic-styles");
exports.Styles = isomorphic_styles_1.isoStyles;
var detect_node_1 = __importDefault(require("detect-node"));
/**************************************** HELPERS & CONFIG ****************************************/
var bookend = "\n***************\n";
/**
 * Basic function to run the inspect function against the given object
 * Both logs & returns the inspect result
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
    var tagObj = styler(_this.filename);
    console.log.apply(console, [bookend]
        .concat(Array.isArray(tagObj) ? tagObj : [tagObj])
        .concat(' :: \n${output}${bookend}'));
};
/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object
 *
 * Logs differently between node.js & browser when given the same styles
 * Avoids need for separate browser & node modules
 */
var Log = /** @class */ (function () {
    /* INITIALIZATION */
    // TODO make setting global inspectFn separate from instantiation
    /**
     * Constructor for Log object
     *
     * Provide [fileName], [style] item from Style object, and optionally
     * [inspectFn] function to set as new global inspector of all Log objects
     *
     * @param {string} fileName Current file name, to include before each
     *                          message this logger emits
     * @param {Function|string} style String-wrapping function OR 1 of
     *                                isoStyles' keys (string)
     *                                If `none` given, pass to console.log with
     *                                fileName wrapped by [] & no styles
     * @param {Function?} inspectFn {OPTIONAL} If given, becomes new global
     *                              inspector for all Log objects
     *                              Uses a fallback inspect (passthrough)
     *                              function if none provided
     *                              Allows DI of node's inspect without having
     *                              browser issues
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
                var tagObj = _this.styler(_this.filename);
                console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
                return args[args.length - 1];
            }
        };
        this.verbose = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isVerbose) {
                var tagObj = _this.styler(_this.filename);
                console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
                return args[args.length - 1];
            }
        };
        this.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isDebug) {
                var tagObj = _this.styler(_this.filename);
                console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
                return args[args.length - 1];
            }
        };
        this.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isInfo) {
                var tagObj = _this.styler(_this.filename);
                console.log.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
                return args[args.length - 1];
            }
        };
        this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isWarn) {
                var tagObj = _this.styler(_this.filename);
                console.warn.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat(args));
                return args[args.length - 1];
            }
        };
        this.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (env_var_helpers_1.isError) {
                if (detect_node_1.default) {
                    var bgRed = isomorphic_styles_1.nodeStyling.bgRed, white = isomorphic_styles_1.nodeStyling.white, bold = isomorphic_styles_1.nodeStyling.bold;
                    console.error.apply(console, [bgRed(white(bold("[ERROR] " + _this.filename))), ' :: '].concat(args));
                }
                else {
                    var tagObj = _this.styler(_this.filename);
                    console.error.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj]).concat([' [ERROR] ']).concat(args));
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
                if (detect_node_1.default) {
                    var bgRed = isomorphic_styles_1.nodeStyling.bgRed, white = isomorphic_styles_1.nodeStyling.white, bold = isomorphic_styles_1.nodeStyling.bold;
                    console.error.apply(console, [bgRed(white(bold("[ERROR] " + _this.filename))), ' :: '].concat(args));
                }
                else {
                    var tagObj = _this.styler(_this.filename);
                    console.error.apply(console, (Array.isArray(tagObj) ? tagObj : [tagObj])
                        .concat([' [WTF ERROR] '])
                        .concat(args));
                }
            }
            return args[args.length - 1];
        };
        /**
         * Object inspection
         *
         * Inspect object at any given level
         * Both logs and shows inspect result
         */
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
        // Define new 'global' inspectFn if one was given; use fallback otherwise
        if (inspectFn)
            Log.inspectFn = inspectFn;
        this.inspectFn = Log.inspectFn || (function (obj) { return obj; });
        // Set the styler function based on the given value of the style prop
        if (typeof style === 'undefined' || style == null)
            this.styler = isomorphic_styles_1.isoStyles.none;
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
 * Use to construct a new Log object & return it
 *
 * @param {string} fileName Name of current file (to include before each message
 *                          this logger emits)
 * @param {Function|string} style String-wrapping function OR string matching 1
 *                                of isoStyles' keys
 * @return {Log & Function} Log instance
 *                          Also runs as standalone function (delegates to this.info)
 */
exports.logFactory = function (filename, style, inspector) {
    var log = new Log(filename, style, inspector);
    return Object.assign(log.info.bind(log), log, { inspect: log.inspector.info.bind(log) });
};
//# sourceMappingURL=shared.js.map