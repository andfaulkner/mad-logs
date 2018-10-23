----
mad-logs
========
*   Colourful, obtrusive, Typescript-friendly logs for the browser console and NodeJS.
    *   Completely isomorphic
*   As with Winston, lets you alter the amount of text shown based on current log level:
    *   Automatic handling of any of the following LOG_LEVEL environment variable values:
        *   silly, verbose, debug, info, warn, error, wtf
*   Factory for file-specific logging: logFactory
*   Over 45 separate styles to keep log output different from file-to-file for easier debugging


----------------------------------------------------------------------------------------------------
Installation
------------

    npm install --save mad-logs

...or...

    yarn add mad-logs


----------------------------------------------------------------------------------------------------
Usage (browser, commonJS)
-------------------------
Import the library 

    // my-fun-file.ts
    import {logFactory, Styles} from 'mad-logs';

Build a logger with the log factory

    const log = logFactory(`my-fun-file.tsx`, Styles.angryBird);

Do some mad, mad logging!

    log.silly('display me on the browser console, but only if the log level is set to "silly"');

    log.verbose(
        'display me on the browser console, but only if the log level is "verbose" ' +
        'or higher (verbose or silly mode)'
    );

    log.info(
        'display me on the browser console, but only if the log level is "info" ' +
        'or higher (info, verbose, or silly)'
    );

    log.warn(
        'display me on the browser console, but only if the log level is "warn" ' +
        'or higher (warn, info, verbose, or silly)'
    );

    log.error(
        'display this on the browser console as an error message, but only if the ' +
        'log level is "error" or higher (error, warn, info, verbose, or silly)'
    );

    log.wtf(
        'Also display this on the browser console, as an error message'
    );

    const result =
        log.silly(
            'Log return value of myFunction(). Pass result thru & assign it to var "result"',
             myFunction()
         );
    // result now contains the return value of myFunction()


### Details (on above)
*   'my-fun-file.js' is a placeholder for the name of the current file
    *   This appears in each log line, as part of the "tag"
*   logMarkers.maceWindu << replace with any item in the log marker styles list (see below)
*   All log instance functions return the last value they were passed.
*   TODO let users make their own log markers

### Available log "marker" styles
*   none
*   angryBird
*   aquarium
*   arrow
*   backAndForth
*   barbells
*   bracelet
*   brainwave
*   cantTouch
*   cartoonSwearing
*   checkmate
*   cult
*   dirtRoad
*   escherBarbieLego
*   farmerBrown
*   fountain
*   fresh
*   grasslands
*   hatBlock
*   hotPursuit
*   joy
*   kingRageBlock
*   lakeLouise
*   lucky
*   maceWindu
*   mechanicalAtFists
*   moProblems
*   mrsPotatoVHS
*   neverEnough
*   nightmare
*   pipeDream
*   ohMy
*   potOfGold
*   probeArcade
*   rainbowLeaf
*   rockIsDead
*   seafoamSalad
*   smokeyHatesChristmas
*   springy
*   swimmers
*   tangerines
*   theBird
*   theHeist
*   vendetta
*   xmlHell
*   zebra

### Log marker usage
*   When first "constructing" the log factory, define the log marker as the second argument (as seen above)
    *   if not given, it uses the logMarkers.none style


----------------------------------------------------------------------------------------------------
NodeJS-specific logging
-----------------------
*   Deprecated - please don't use it
    *   This will be removed in an upcoming version of mad-logs
*   shared/root logging is now isomorphic, so it's no longer needed
