/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/node/index.d.ts" />


// ensure environment knows testing is occurring
process.env.mocha === true;

// Store original process.argv
const oldProcArgs = Object.assign({}, process.argv);

/************************************** THIRD-PARTY IMPORTS ***************************************/
// Testing modules
import 'mocha';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { stderr, stdout }  from 'test-console';

// Utility modules
import * as fs from 'fs';
import * as path from 'path';
import { inspect as nodeInspect } from 'util';

// spawn other apps
import { spawn, spawnSync, fork } from 'child_process';
const spawnSyncOpts = { detached: true, env: process.env, stdio: 'inherit' };

/******************************************** LOGGING *********************************************/
import { buildFileTag } from '../index';
import * as colors from 'colors';

const TAG = buildFileTag('mad-logs-node.test.ts', colors.bgMagenta.white);

/************************************ IMPORT FILE TO BE TESTED ************************************/
import { inspect, nodeLogFactory } from '../node-log';

/********************************************* TESTS **********************************************/
describe('inspect', function() {
    it('exists', function() {
        expect(inspect).to.exist;
    });
});

describe('nodeLogFactory', function() {
    it('exists', function() {
        expect(nodeLogFactory).to.exist;
    });
    it('returns an object with a set of log functions', function() {
        const log = nodeLogFactory(TAG);
        expect(log.blankWrap).to.be.a('function');
        expect(log.blankWrap2).to.be.a('function');
        expect(log.blankWrap3).to.be.a('function');
        expect(log.silly).to.be.a('function');
        expect(log.verbose).to.be.a('function');
        expect(log.debug).to.be.a('function');
        expect(log.info).to.be.a('function');
        expect(log.error).to.be.a('function');
        expect(log.warn).to.be.a('function');
        expect(log.wtf).to.be.a('function');
        expect(log.inspect).to.be.a('function');
    });
    it('returns void from all functions on instance, except inspect', function() {
        const log2 = nodeLogFactory(TAG);
        expect(log2.blankWrap('Logged from blankWrap')).to.be.undefined;
        expect(log2.blankWrap2('Logged from blankWrap2')).to.be.undefined;
        expect(log2.blankWrap3('Logged from blankWrap3')).to.be.undefined;
        expect(log2.silly('Logged from silly')).to.be.undefined;
        expect(log2.verbose('Logged from verbose')).to.be.undefined;
        expect(log2.debug('Logged from debug')).to.be.undefined;
        expect(log2.info('Logged from info')).to.be.undefined;
        expect(log2.error('Logged from error')).to.be.undefined;
        expect(log2.warn('Logged from warn')).to.be.undefined;
        expect(log2.wtf('Logged from wtf')).to.be.undefined;
    });
});

// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
