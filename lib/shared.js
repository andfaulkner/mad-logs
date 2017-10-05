"use strict";
/************************************** THIRD-PARTY MODULES ***************************************/
var env_var_helpers_1 = require("env-var-helpers");
var isomorphic_styles_1 = require("./src/isomorphic-styles");
exports.Styles = isomorphic_styles_1.isoStyles;
var isNode = require("detect-node");
// WIP
/******************************************* LOG OBJECT *******************************************/
/**
 * Isomorphic Log object. Logs differently between Node and Browser.
 */
var Log = (function () {
    function Log(filename, style) {
        this.filename = filename;
        if (typeof style === 'undefined' || style == null)
            this.styler = isomorphic_styles_1.isoStyles.a;
        else if (typeof style === 'string')
            this.styler = isomorphic_styles_1.isoStyles[style];
        else
            this.styler = style;
    }
    Object.defineProperty(Log, Symbol.species, {
        get: function () { return Array; },
        enumerable: true,
        configurable: true
    });
    Log.prototype.silly = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isSilly) {
            console.log.apply(console, [this.styler(this.filename)].concat(args));
            return args[0];
        }
    };
    Log.prototype.verbose = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isVerbose) {
            console.log.apply(console, [this.styler(this.filename)].concat(args));
            return args[0];
        }
    };
    Log.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isDebug) {
            console.log.apply(console, [this.styler(this.filename)].concat(args));
            return args[0];
        }
    };
    Log.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isInfo) {
            console.log.apply(console, [this.styler(this.filename)].concat(args));
            return args[0];
        }
    };
    Log.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isWarn) {
            console.log.apply(console, [this.styler(this.filename)].concat(args));
            return args[0];
        }
    };
    Log.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isError) {
            if (isNode) {
                var bgRed = isomorphic_styles_1.nodeStyling.bgRed, white = isomorphic_styles_1.nodeStyling.white, bold = isomorphic_styles_1.nodeStyling.bold;
                console.error.apply(console, [bgRed(white(bold("[ERROR] " + this.filename))), ' :: '].concat(args));
            }
            else {
                console.error.apply(console, [this.styler(this.filename), ' [ERROR] '].concat(args));
            }
        }
        return args[args.length - 1];
    };
    Log.prototype.wtf = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (env_var_helpers_1.isError) {
            if (isNode) {
                var bgRed = isomorphic_styles_1.nodeStyling.bgRed, white = isomorphic_styles_1.nodeStyling.white, bold = isomorphic_styles_1.nodeStyling.bold;
                console.error.apply(console, [bgRed(white(bold("[ERROR] " + this.filename))), ' :: '].concat(args));
            }
            else {
                console.error.apply(console, [this.styler(this.filename), ' [ERROR] '].concat(args));
            }
        }
        return args[args.length - 1];
    };
    return Log;
}());
exports.Log = Log;
/**
 * Construct new Log object & return it.
 */
exports.logFactory = function (filename, style) {
    var log = new Log(filename, style);
    Object.assign(function () {
    }, log);
};
//# sourceMappingURL=shared.js.map