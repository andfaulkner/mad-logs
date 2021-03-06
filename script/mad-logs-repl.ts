/// <reference path="../node_modules/@types/node/index.d.ts" />
declare function require(name: string);

/************************************** THIRD-PARTY IMPORTS ***************************************/
import lodash from 'lodash';
import util from 'util';
import repl from 'repl';
import path from 'path';
import fs from 'fs';
import {path as rootPath} from 'app-root-path';
import isNode from 'detect-node';

/********************************** REPL NODE ENVIRONMENT SETUP ***********************************/
util.inspect.defaultOptions.colors = true;
util.inspect.defaultOptions.depth = 10;
util.inspect.defaultOptions.breakLength = 100;
util.inspect.defaultOptions.showHidden = true;

/**************************************** PROJECT IMPORTS *****************************************/
import {Log as SharedLog, Styles as SharedStyles, logFactory as sharedLogFactory} from '../shared';
import {nodeLogFactory} from '../node';

const madLogs = {
    shared: {Log: SharedLog, Styles: SharedStyles, logFactory: sharedLogFactory},
    node: {nodeLogFactory},
};

/****************************************** CONFIG REPL *******************************************/
const packageJson = require('../package.json');
const {defineProperty} = Object;

export const defPropConfig = {
    // Configuration for a global value that cannot be reassigned in the repl
    immutable: (lib: any) => ({
        configurable: false,
        enumerable: true,
        writable: false,
        value: lib,
    }),
    // Configuration for a global value that can be reassigned in the repl
    mutable: (lib: any) => ({
        configurable: true,
        enumerable: true,
        writable: true,
        value: lib,
    }),
};

/**
 * Run when inspect is called in the repl
 */
export const inspect = (...args) => {
    (console.log as any)(
        ...args.map(arg => {
            if (typeof arg === `function`) return arg.toString();
            return util.inspect(arg);
        })
    );
    return util.inspect(args[0]);
};

/****************************************** CREATE REPL *******************************************/
export const r = repl.start({useColors: true});

// Add REPL history file
const historyFile = path.join(rootPath, `/script/.node_history`);
require('repl.history')(r, historyFile);

// Add IN_REPL property to repl environment
// Acts as identifier that REPL is currently running
defineProperty(r.context.process.env, `IN_REPL`, defPropConfig.immutable(true));

/****************************************** REPL HELPERS ******************************************/
/**
 * Bind given properties to the repl context, with the given values
 * Display as list on repl load, with descriptions for each specified in
 * descriptions prop
 *
 * Example:
 *     bindPropsToRepl(repl.start(), {_: lodash, projData}, {_: `Util lib`});
 *
 * @param {Object} activeRepl Started repl (through repl.start())
 * @param {Object} ctxProps Bind each given value to its corresponding key
 *                 e.g. {_: lodash, _m: madUtils, Promise: bluebird}
 * @param {Object} descriptions Optional matching descriptions to display
 *                              beside prop with given key
 *                 e.g.: {_: `lodash alias`, bluebird: `promises library`}
 */
export const bindPropsToRepl = (ctxProps: Object, descriptions: {[key: string]: string}) => {
    console.log(`\n\nWelcome to the mad-logs REPL!`);
    console.log(`Custom properties bound to the top-level context:`);

    // Iterate through the given context properties
    for (let [key, val] of lodash.toPairs(ctxProps)) {
        // Add current prop's value to repl context
        // Mutable if requested, immutable otherwise
        if (typeof val === `object` && val.val && val.mutable) {
            defineProperty(r.context, key, defPropConfig.mutable(val.val));
        } else {
            defineProperty(r.context, key, defPropConfig.immutable(val));
        }

        // Display prop and (if defined) prop description on repl boot
        if (descriptions[key]) {
            console.log(` * ${key}: ${descriptions[key]}`);
            // If prop description given, bind it to the object in the context
            defineProperty(val, `__repl_description__`, defPropConfig.immutable(descriptions[key]));
        } else {
            console.log(` * ${key}`);
        }
    }
    console.log(`> `);
};

/***************************************** PROPS TO BIND ******************************************/
/**
 * Properties to bind to repl context (available at top level in repl)
 */
const ctxProps = {
    // Helper libraries
    // bluebird,
    lodash,
    // madUtils,
    _: lodash,
    // _m: madUtils,

    // Are we in Node?
    isNode,

    // Logging & object info-related
    inspect,

    // package.json content
    packageJson,

    // Import mad-logs modules
    madLogs,
};

/**
 * Extra descriptions for bound properties
 */
const descriptions = {
    _: `lodash alias`,
    madLogs:
        `Contains mad-logs shared & Node modules. Children: shared, node. ` +
        `Under shared, Styles contains collection of styles usable in Node ` +
        `or the browser, logFactory is a logger constructor, Log is the whole log module.` +
        `\nExample use:
        const {logFactory, Styles} = madLogs.shared;
        const log = logFactory('banner-carousel-container.tsx', Styles.ohMy);
        log.info('Hello mad-logs!');`,
    SharedLog: `Log module for use in both node & the browser`,
    SharedStyles: `Collection of styles usable in both Node & the browser`,
    sharedLogFactory: `Constructor for shared logger`,
    nodeLogFactory: `Factory to build a node-specific logger`,
};

// Attach props to REPL (repl is in repl setup)
bindPropsToRepl(ctxProps, descriptions);
