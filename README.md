----
# mad-logs

*   Colourful, obtrusive, Typescript-friendly logs for the browser console and NodeJS.
*   As with Winston, lets you alter the amount of text shown based on current log level:
    *   automatic handling of any of the following LOG_LEVEL environment variable values:
        *   silly, verbose, debug, info, warn, error, wtf
            *   ...via scoped functions within the log object instance.
    *   in Node, comes with special error-specific level-scoped log functions:
        *   sillyError, verboseError, debugError, infoError
*   Factories for file-specific logging: logFactory and nodeLogFactory
        *   in Node, also has sub-factory for function level-specific logging: fileLogInstance.fn
*   Automatic tag building.

*   In the browser, provides over 25 styles to ensure logs of different types stay differentiable from one another at a glance.


---
## Installation

    yarn add mad-logs

...or...

    npm install --save mad-logs


----

## Usage (browser, commonJS)
Import the library 

    // my-fun-file.ts
    import { logFactory, logMarkers } from 'mad-logs';

    // my-fun-file.js
    const madLogs = require('mad-logs');
    const logMarkers = madLogs.logMarkers;
    const logFactory = madLogs.logFactory;

Build a logger with the log factory

    const log = logFactory()('my-fun-file.js', logMarkers.maceWindu);

*   You can also explicitly set the object's log level when constructing it:

    ```javascript
    const log = logFactory({ logLevel: "debug" })('my-fun-file.ts', logMarkers.maceWindu);
    ```

*   If not explicitly set, logLevel defaults to the global environment value of process.env.LOG_LEVEL.
    *   e.g. the value set with:

        ```bash
            LOG_LEVEL=verbose node some-process.js
        ```

Do some mad, mad logging!

    log('display me on the browser console!');
        // => displays "display me on the browser console!" preceded by a purple lightsaber
        // returns 'display me on the browser console!'

    log.silly('display me on the browser console, but only if the log level is set to "silly"');

    log.verbose('display me on the browser console, but only if the log level is "verbose" ' +
                'or higher (verbose or silly mode)');

    log.info('display me on the browser console, but only if the log level is "info" ' +
             'or higher (info, verbose, or silly)');

    log.warn('display me on the browser console, but only if the log level is "warn" ' +
             'or higher (warn, info, verbose, or silly)');

    log.error('display this on the browser console as an error message, but only if the ' +
              'log level is "error" or higher (error, warn, info, verbose, or silly)');

    log.wtf('Also display this on the browser console, as an error message');

    const funcRes =
        log.silly('Log return value of myFunction(). Pass result thru & assign it to var "funcRes"',
                  myFunction());
    // resultOfFunction now contains the return value of myFunction()

    // my-fun-static-file.ts
    import { logFactory, logMarkers } from 'mad-logs';


### Details (on above)
*   { logLevel: someLevel } defines the logLevel for the current context. Logs only display if they are "higher" than this level
*   'my-fun-file.js' is a placeholder for the name of the current file. This appears in each log line, as part of the "tag"
*   logMarkers.maceWindu << replace with any item in the log marker styles list (see below)
    *   or make your own log markers (Details on this coming soon)
*   All log instance functions return the last value they were passed.


### Invoking the log factory with default or environment config:
If process.env.LOG_LEVEL is set (which you should - passing config objects in all the time is annoying and poorly encapsulated),
or if you like the default level of 'info', you can construct the log object for a file like this:

    const log = madLogs.logFactory()('my-fun-file.js', logMarkers.maceWindu);

This is what you should be doing - it's a good idea to set process.env.LOG_LEVEL in a configuration file that gets activated on app launch.
//  TODO provide more details on this pattern

### Available log "marker" styles
*   angryBird
*   aquarium
*   arrow
*   backAndForth
*   barbells
*   bracelet
*   brainwave
*   cartoonSwearing
*   checkmate
*   cult
*   default
*   dirtRoad
*   escherBarbieLego
*   farmerBrown
*   grasslands
*   hatBlock
*   hotPursuit
*   joy
*   lakeLouise
*   lispyKatana
*   maceWindu
*   mechanicalAtFists
*   moProblems
*   nightmare
*   pipeDream
*   potOfGold
*   probeArcade
*   rainbowLeaf
*   rockIsDead
*   swimmers
*   smokeyHatesChristmas
*   springy
*   tangerines
*   theBird
*   theHeist
*   vendetta
*   xmlHell
*   zebra

### Log marker usage
*   When first "constructing" the log factory, define the log marker as the second argument (as seen above)
    *   if not given, it uses the logMarkers.default style.


----

## NodeJS-specific logging

*   Note that you can still use the main mad-logs module in Node, there just may be some formatting oddness.
    *   ...however, it's not optimized for Node. Some styles work quite well, others don't. Efficacy also varies between terminals.
    *   The NodeJS-specific logging sub-module should always work in every terminal environment, under all circumstances (it uses terminal colour codes rather than CSS styling)
        *   Uses the famous colors.js module for styling - which can also be imported through this library for convenience.


### buildFileTag
*   Construct a styled tag for inclusion at the beginning of console logs.
*   Intended for use in all manual logs in a specific file, and for passing to nodeLogFactory (see below).


#### buildFileTag Usage

(filename: string, colourizer?: Function | number, rpadSize?: string = 20): string

*   filename: tag to stylize 
*   colourizer: either:
        1)   a colors.js function or a chain of composed colors.js functions, set up to apply all styles in the chain to any string passed to the filename argument
        2)   a number, in which case this number is used as the right padding length. In this case, any value passed to rpadSize is ignored.
*   rpadSize: (optional) align all logs up to this length. Works like lodash's padLeft, or ES7's String.prototype.padEnd.

Examples:

    import { buildFileTag, colors } from 'mad-logs/lib/node';
    // note: colors import required if you want to apply styles.
    It's literally the npm module 'colors', re-exported as a convenience.

    const TAG = buildFileTagString('current-file.ts', colors.black.bgGreen.bold, 25);

    //...
    if (process.env.LOG_LEVEL === 'verbose') {
        console.log(`${TAG} Connecting to postgres...`);
    }
    // Output: [current-file]           Connecting to postgres...
    //        |
    //        |<--terminal edge here {not included in actual output}


### NodeJS log factory (nodeLogFactory):

`(TAG: string): MadLogInstance`

*   TAG: Identifier for files to include in all log outputs from the constructed
*   Returns object containing functions: 

    *   Log - including file tag - if LOG_LEVEL is silly:
    
    `silly: (..args: string[]): void;`
    

    *   Log - including file tag - if LOG_LEVEL is silly or verbose:
    
    `verbose: (..args: string[]): void;`
    

    *   Log - including file tag - if LOG_LEVEL is silly, verbose, or info:
    
    `info: (..args: string[]): void;`
    

    *   Log - including file tag - if LOG_LEVEL is silly, verbose, info, or warn:
    
    `warn: (..args: string[]): void;`
    

    *   Log - including file tag - if LOG_LEVEL is silly, verbose, info, warn, or error:
    
    `error: (..args: string[]): void;`
    

    *   Log - including file tag - if LOG_LEVEL is silly, verbose, info, warn, error, or wtf:
    
    `wtf: (..args: string[]): void;`
    

    *   Log an error - including file tag - if LOG_LEVEL is silly:
    
    `sillyError: (..args: string[]): void;`
    

    *   Log an error - including file tag - if LOG_LEVEL is silly or verbose:
    
    `verboseError: (..args: string[]): void;`
    

    *   Log an error - including file tag - if LOG_LEVEL is silly verbose, or info:
    
    `infoError: (..args: string[]): void;`
    

    *   Build object identical to the one containing it, minus the fn method, where the function name is added to the output string of all logging methods:
    
    `fn: (fnName: string): MadLogInstanceNoFn;`


    *   Convert object into human-readable string, and log it if LOG_LEVEL is info, verbose, silly:
    
    `inspect: (obj: any) => string`
    

*   All logging methods in the above object then also contain:
    *   a 'thru' object that does passthrough logging (see below)
    *   an 'inspect' object that inspects an object if the given LOG_LEVEL is met (see below)


#### NodeJS log factory import syntax:

`import { nodeLogFactory } from 'mad-logs/lib/node'`

*   Kept in a separate file to avoid browser <-> Node incompatibilities


#### NodeJS log factory usage examples: file log construction:

    // my-fun-node-file.ts

    import { nodeLogFactory, buildFileTag, colors } from 'mad-logs/lib/node'
    const TAG = buildFileTag('my-fun-node-file.ts', colors.black.bgWhite);

    /**
     * Instantiate the nodeLogFactory object. This binds the string passed to nodeLogFactory.
     * The string will be displayed before each item is logged using this object.
     */
    const log = nodeLogFactory(TAG);

    //
    // Log all the things!
    // Note that output text below would be black with a white background for all examples below,
    // because of the TAG set above
    //

    /**
     * Output if environent var LOG_LEVEL equals silly. Otherwise, no output is displayed.
     */
    log.silly('Displaying because LOG_LEVEL=silly! Yay! O_o');
        // {Logs}    :: 'my-fun-node-file.ts  Displaying because LOG_LEVEL=silly! Yay! O_o'
        //               \_________________/
        //                 |<-- this part is styled, making its separation from the message clear
        //
        // {Returns} :: undefined

    /**
     * Outputs if environent var LOG_LEVEL is silly, verbose, or info (the default).
     * If LOG_LEVEL is wtf, error, or warn, nothing is displayed here.
     */
    log.info('Show me!');
        // {Logs}    :: 'my-fun-node-file.ts  Show me!'
        // {Returns} :: undefined

### NodeJS logging usage examples: pass-through logging (assumes constructed log object):

    /**
     * Assume LOG_LEVEL=silly, debug, or verbose.
     */
    log.warn.thru(() => 'yay return value!');
        // {Logs}    :: 'my-fun-node-file.ts  yay return value!'
        // {Returns} :: 'yay return value!'

    /**
     * Assume LOG_LEVEL=silly, debug, or verbose.
     */
    log.verbose.thru((() => 'yay a verbose return value! Woot!')());
        // {Logs}    :: 'my-fun-node-file.ts  yay a verbose return value! Woot!'
        // {Returns} :: 'yay a verbose return value! Woot!'

    /** 
     * Assume LOG_LEVEL=error, warn, info, debug, verbose, or silly.
     */
    log.error.thru('bringDaFunk', (function bringDaFunk() { return 'bowChicaChicaBow' })());
        // {Logs}    :: 'my-fun-node-file.ts  bringDaFunk : bowChicaChicaBow'
        // {Returns} :: 'yay a verbose return value! Woot!'

    /** 
     * Assume LOG_LEVEL=silly, verbose, or debug.
     */
    log.debug.thru('funktasticString', 'boom-chi-boom-ba-boom-chi');
        // {Logs}    :: 'my-fun-node-file.ts  funktasticString : boom-chi-boom-ba-boom-chi'
        // {Returns} :: 'yay a verbose return value! Woot!'

### NodeJS inspect logging: log.inspect
*   Log (and return) human-readable deep-nested versions of objects.

log.inspect method signatures:

    `(obj: Object) => string`

    *   Convert 'obj' to a human-readable string, and return it.
    *   If LOG_LEVEL is info or higher, log the object before returning it, including use of the log instance's currently defined tag.
        *   If (when logging it) obj has key 'name', includes its associated value in the identifying message shown before the inspected object string.


    `(message: string, obj: Object) => string`

    *   Will log the value in 'message' before the inspected object.
    *   The return value will not include this message - just the 'inspected' object.

The higher the log level, the more deeply the object's properties are logged, where:

*   LOG_LEVEL=wtf displays only one level. e.g.:

    ```
    log.inspect(`{ k1: 'v1', k2: 'v2', k3: { nk1: 'nv1' }}`);
    // => {Logs} :: `ValueOfTag: { k1: 'v1', k2: 'v2', k3: [Object object]}`
    ```

*   LOG_LEVEL=info displays 5 levels. e.g.:

    ```
    log.inspect(`{ k1: 'v1', k2: 'v2', k3: { nk1: 'nv1' }}`);
    // => {Logs} :: `ValueOfTag: { k1: 'v1', k2: 'v2', k3: { nk1: 'nv1' }}`
    ```

*   LOG_LEVEL=silly displays 10 levels.

Examples:

    const myObject = {
        a: 'asdf',
        b: 'oooo',
        c: {
            k1: 'V'
        };
    };

    const myNamedObject = {
        name: 'yogi'
        bearType: 'grizzly',
    };

    // Assume LOG_LEVEL=silly, verbose, debug, or inspect.
    log.inspect(myObject);
        // => {Logs}    :: `my-fun-node-file.ts ~> { a: 'asdf', b: 'oooo', c: { k1: 'V' } }`
        // => {Returns} :: `{ a: 'asdf', b: 'oooo', c: { k1: 'V' } }`

    // Assume LOG_LEVEL=silly, verbose, debug, or inspect.
    log.inspect('My Object:', myObject);
        // => {Logs}    ::  `my-fun-node-file.ts ~> My Object: { a: 'asdf', b: 'oooo', c: { k1: 'V' } }`
        // => {Returns} ::  `{ a: 'asdf', b: 'oooo', c: { k1: 'V' } }`

    // Assume LOG_LEVEL=silly, verbose, debug, or inspect.
    log.inspect('My Object:', myObject);
        // => {Logs}    ::  `my-fun-node-file.ts ~> My Object: { a: 'asdf', b: 'oooo', c: { k1: 'V' } }`
        // => {Returns} ::  `{ a: 'asdf', b: 'oooo', c: { k1: 'V' } }`

    log.inspect(myNamedObject);
        // => {Logs}    ::  `my-fun-node-file.ts ~> yogi: { a: 'asdf', b: 'oooo', c: { k1: 'V' } }`
        // => {Returns} ::  `{ a: 'asdf', b: 'oooo', c: { k1: 'V' } }`

    // Assume LOG_LEVEL=wtf
    log.inspect('My Object:', myObject);
        // [[ Does not log anything ]]
        // => {Returns} ::  `{ a: 'asdf', b: 'oooo', c: [Object] }`

### NodeJS function-scoped logs: someFileScopedLogInstance.fn('fnName')
*   Essentially returns new instance of log from a file-scoped instance of a log, which automatically contains the given name of the function in the logged output string.

Examples:

    // Assume LOG_LEVEL of verbose.

    import { nodeLogFactory, buildFileTag, colors } from 'mad-logs/lib/node';

    const TAG = buildFileTag('fun-node-file.ts', colors.black.bgWhite);
    const log = nodeLogFactory(TAG);

    function someFunction() {
        const fnLog = log.fn('someFunction');

        fnLog.info('message');
        // => {Logs} ::  `fun-node-file.ts :: someFunction :: message`

        log.info('message');
        // => {Logs} ::  `fun-node-file.ts  message`
    }

### Convenience: exports colors module from Node mad-logs submodule

    import { colors } from 'mad-logs/lib/node';

*   Works exactly like the standard 'colors' module we all know and love.
    *   (Yep, it's *that* colors)
