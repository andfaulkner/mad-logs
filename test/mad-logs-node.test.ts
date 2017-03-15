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

    it('returns an object with a set of log functions, that is itself a function', function() {
        const log = nodeLogFactory(TAG);
        console.log(`log:`, log);
        console.log(log);
        log('things!');
        expect(log).to.be.a('function');
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
        expect(log.always).to.be.a('function');

        expect(log.sillyError).to.be.a('function');
        expect(log.verboseError).to.be.a('function');
        expect(log.debugError).to.be.a('function');
        expect(log.infoError).to.be.a('function');
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
        expect(log2.always('Logged from always')).to.be.undefined;

        expect(log2.sillyError('Logged from silly')).to.be.undefined;
        expect(log2.verboseError('Logged from verbose')).to.be.undefined;
        expect(log2.debugError('Logged from debug')).to.be.undefined;
        expect(log2.infoError('Logged from info')).to.be.undefined;
    });

    it('has thru function attached to all log functions', function() {
        const log3 = nodeLogFactory(TAG);
        expect(log3.blankWrap.thru).to.be.a('function');
        expect(log3.blankWrap2.thru).to.be.a('function');
        expect(log3.blankWrap3.thru).to.be.a('function');
        expect(log3.silly.thru).to.be.a('function');
        expect(log3.verbose.thru).to.be.a('function');
        expect(log3.debug.thru).to.be.a('function');
        expect(log3.info.thru).to.be.a('function');
        expect(log3.error.thru).to.be.a('function');
        expect(log3.warn.thru).to.be.a('function');
        expect(log3.wtf.thru).to.be.a('function');
        expect(log3.always.thru).to.be.a('function');

        expect(log3.sillyError.thru).to.be.a('function');
        expect(log3.verboseError.thru).to.be.a('function');
        expect(log3.debugError.thru).to.be.a('function');
        expect(log3.infoError.thru).to.be.a('function');
    });

    it('thru function on all log functions passes returned value thru if 1 arg given', function() {
        const log4 = nodeLogFactory(TAG);
        expect(log4.blankWrap.thru('grrrr')).to.eql('grrrr');
        expect(log4.blankWrap2.thru('grrrr')).to.eql('grrrr');
        expect(log4.blankWrap3.thru('grrrr')).to.eql('grrrr');
        expect(log4.silly.thru('grrrr')).to.eql('grrrr');
        expect(log4.verbose.thru('grrrr')).to.eql('grrrr');
        expect(log4.debug.thru('grrrr')).to.eql('grrrr');
        expect(log4.info.thru('grrrr')).to.eql('grrrr');
        expect(log4.error.thru('grrrr')).to.eql('grrrr');
        expect(log4.warn.thru('grrrr')).to.eql('grrrr');
        expect(log4.wtf.thru('grrrr')).to.eql('grrrr');
        expect(log4.always.thru('grrrr')).to.eql('grrrr');

        expect(log4.sillyError.thru('grrrr')).to.eql('grrrr');
        expect(log4.verboseError.thru('grrrr')).to.eql('grrrr');
        expect(log4.debugError.thru('grrrr')).to.eql('grrrr');
        expect(log4.infoError.thru('grrrr')).to.eql('grrrr');
    });

    // tslint:disable-next-line
    it('thru function on all log functions returns output containing arg 2, if 2 args given', function() {
        const log5 = nodeLogFactory(TAG);
        expect(log5.blankWrap.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.blankWrap2.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.blankWrap3.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.silly.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.verbose.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.debug.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.info.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.error.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.warn.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.wtf.thru('my_tag', 'should_return_this')).to.eql('should_return_this');

        expect(log5.sillyError.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.verboseError.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.debugError.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
        expect(log5.infoError.thru('my_tag', 'should_return_this')).to.eql('should_return_this');
    });
});

// Restore original process.argv
process.argv = Object.assign({}, oldProcArgs);
