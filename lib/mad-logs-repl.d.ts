/// <reference path="../node_modules/@types/node/index.d.ts" />
/// <reference types="node" />
import * as repl from 'repl';
export declare const defPropConfig: {
    immutable: (lib: any) => {
        configurable: boolean;
        enumerable: boolean;
        writable: boolean;
        value: any;
    };
    mutable: (lib: any) => {
        configurable: boolean;
        enumerable: boolean;
        writable: boolean;
        value: any;
    };
};
export declare const r: repl.REPLServer;
/********************************** REPL NODE ENVIRONMENT SETUP ***********************************/
/************************************** CONFIG REPL CONTEXT ***************************************/
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
export declare const bindPropsToRepl: (ctxProps: Object, descriptions: {
    [key: string]: string;
}) => void;
