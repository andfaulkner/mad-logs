/// <reference path="./node_modules/@types/node/index.d.ts" />
"use strict";
/************************************** THIRD-PARTY IMPORTS ***************************************/
// import * as moment from 'moment';
var lodash = require("lodash");
var repl = require("repl");
var path = require("path");
var app_root_path_1 = require("app-root-path");
/****************************************** CONFIG REPL *******************************************/
// const { padLeft } = madUtils;
var kotlin = require('kotlin');
var packageJson = require('./package.json');
var defineProperty = Object.defineProperty;
exports.defPropConfig = {
    // Configuration for a global value that cannot be reassigned in the repl.
    immutable: function (lib) { return ({
        configurable: false,
        enumerable: true,
        writable: false,
        value: lib
    }); },
    // Configuration for a global value that can be reassigned in the repl.
    mutable: function (lib) { return ({
        configurable: true,
        enumerable: true,
        writable: true,
        value: lib
    }); },
};
exports.r = repl.start({ useColors: true });
// Add REPL history file
var historyFile = path.join(app_root_path_1.path, '.node_history');
require('repl.history')(exports.r, historyFile);
// Add IN_REPL property to repl environment. Acts as identifier that REPL is currently running.
defineProperty(exports.r.context.process.env, 'IN_REPL', exports.defPropConfig.immutable(true));
/********************************** REPL NODE ENVIRONMENT SETUP ***********************************/
// util.inspect.defaultOptions.colors = true;
// util.inspect.defaultOptions.depth = 10;
// util.inspect.defaultOptions.breakLength = 100;
// util.inspect.defaultOptions.showHidden = true;
/************************************** CONFIG REPL CONTEXT ***************************************/
// import { cat, cd, ls, pwd, inspect, getArgs } from './script/repl-setup';
// import { SKIP_VAR_DISPLAY } from './script/repl-setup';
/****************************************** REPL HELPERS ******************************************/
/**
 * Bind given properties to the repl context, with the given values.
 * Display as list on repl load, with descriptions for each specified in descriptions prop.
 * @param {Object} activeRepl Started repl (through repl.start()).
 * @param {Object} ctxProps Bind each given value to its corresponding key.
 *                 e.g. { _: lodash, _m: madUtils, Promise: bluebird }
 * @param {Object} descriptions Optional matching descriptions to display beside prop w/ given key.
 *                 e.g.: { _: 'lodash alias', bluebird: 'promises library' }
 * @example bindPropsToRepl(repl.start(), { _: lodash, projData }, { _: 'Util lib' });
 */
exports.bindPropsToRepl = function (ctxProps, descriptions) {
    console.log("\n\nWelcome to the Javelinscript REPL!");
    console.log("Custom properties bound to the top-level context:");
    // Iterate through the given context properties.
    for (var _i = 0, _a = lodash.toPairs(ctxProps); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], val = _b[1];
        // Add current prop's value to repl context. Mutable if requested, immutable otherwise.
        if (typeof val === 'object' && val.val && val.mutable) {
            defineProperty(exports.r.context, key, exports.defPropConfig.mutable(val.val));
        }
        else {
            defineProperty(exports.r.context, key, exports.defPropConfig.immutable(val));
        }
        // Display prop and (if defined) prop description on repl boot.
        if (descriptions[key]) {
            console.log(" * " + key + ": " + descriptions[key]);
            // If prop description provided, bind it to the object in the context.
            defineProperty(val, "__repl_description__", exports.defPropConfig.immutable(descriptions[key]));
        }
        else {
            console.log(" * " + key);
        }
    }
    console.log("> ");
};
/***************************************** PROPS TO BIND ******************************************/
/**
 * Properties to bind to repl context (available at top level in repl).
 */
var ctxProps = {
    // Helper libraries
    // bluebird,
    lodash: lodash,
    // moment,
    kotlin: kotlin,
    // madUtils,
    _: lodash,
    // _m: madUtils,
    // Logging & object info-related
    // inspect, getArgs,
    // Navigation, filesystem helpers
    // cd, cat,
    // ls:  { val: ls, mutable: true },
    // pwd: { val: pwd, mutable: true },
    // package.json content
    packageJson: packageJson,
};
/**
 * Extra descriptions for bound properties.
 */
var descriptions = {
    _: 'lodash alias',
    _m: 'mad-utils alias',
};
// Attach props to REPL (repl is in repl setup)
exports.bindPropsToRepl(ctxProps, descriptions);
// console.log(`r.context:`, r.context);
//# sourceMappingURL=mad-logs-repl.js.map