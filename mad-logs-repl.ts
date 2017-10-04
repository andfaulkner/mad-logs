/// <reference path="./node_modules/@types/node/index.d.ts" />

declare function require(name: string);

/************************************** THIRD-PARTY IMPORTS ***************************************/
// import * as moment from 'moment';
import * as lodash from 'lodash';
// import * as madUtils from 'mad-utils/lib/node';
// import * as bluebird from 'bluebird';
import * as util from 'util';

import * as repl from 'repl';
import * as path from 'path';
import * as fs from 'fs';
import { path as rootPath } from 'app-root-path';

/**************************************** PROJECT IMPORTS *****************************************/
import { Log as SharedLog } from './shared';
import { nodeLogFactory } from './node';

/****************************************** CONFIG REPL *******************************************/
// const { padLeft } = madUtils;
const kotlin = require('kotlin');
const packageJson = require('./package.json');
const { defineProperty } = Object;

export const defPropConfig = {
    // Configuration for a global value that cannot be reassigned in the repl.
    immutable: (lib: any) => ({
        configurable: false,
        enumerable: true,
        writable: false,
        value: lib
    }),
    // Configuration for a global value that can be reassigned in the repl.
    mutable: (lib: any) => ({
        configurable: true,
        enumerable: true,
        writable: true,
        value: lib
    }),
};


export const r = repl.start({ useColors: true });

// Add REPL history file
const historyFile = path.join(rootPath, '.node_history');
require('repl.history')(r, historyFile);

// Add IN_REPL property to repl environment. Acts as identifier that REPL is currently running.
defineProperty(r.context.process.env, 'IN_REPL', defPropConfig.immutable(true));


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
export const bindPropsToRepl = (ctxProps: Object, descriptions: {[key: string]: string}) => {
    console.log(`\n\nWelcome to the Javelinscript REPL!`);
    console.log(`Custom properties bound to the top-level context:`);

    // Iterate through the given context properties.
    for (let [key, val] of lodash.toPairs(ctxProps)) {

        // Add current prop's value to repl context. Mutable if requested, immutable otherwise.
        if (typeof val === 'object' && val.val && val.mutable) {
            defineProperty(r.context, key, defPropConfig.mutable(val.val));
        } else {
            defineProperty(r.context, key, defPropConfig.immutable(val));
        }

        // Display prop and (if defined) prop description on repl boot.
        if (descriptions[key]) {
            console.log(` * ${key}: ${descriptions[key]}`);
            // If prop description provided, bind it to the object in the context.
            defineProperty(val, `__repl_description__`, defPropConfig.immutable(descriptions[key]));
        } else {
            console.log(` * ${key}`);
        }
    }
    console.log(`> `);
};


/***************************************** PROPS TO BIND ******************************************/
/**
 * Properties to bind to repl context (available at top level in repl).
 */
const ctxProps = {
    // Helper libraries
    // bluebird,
    lodash,
    // moment,
    kotlin,
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
    packageJson,

    // *** Bind mad-logs parts to REPL global scope ***

};

/**
 * Extra descriptions for bound properties.
 */
const descriptions = {
    _:                     'lodash alias',
    _m:                    'mad-utils alias',
};

// Attach props to REPL (repl is in repl setup)
bindPropsToRepl(ctxProps, descriptions);

// console.log(`r.context:`, r.context);
