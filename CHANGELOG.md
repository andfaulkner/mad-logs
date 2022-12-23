12.0.0
======
-   Remove dependency on colors module
    -   Switch to @colors/colors
-   Minor type fixes
-   Switch most (but not all) titles to cleaner "------" format, from "======" format.
-   Update package build node version to v16.16.0



----------------------------------------------------------------------------------------------------
11.4.0
======
Fix isomorphic style objects to instead act as conditional strings w different vals for node & browser.
- Note that changes in v11.3.0 are broken until this is fixed.

11.3.0
======
Make all styles work with browser dark mode (add background colours to them).

Upgrade Typescript to v3.3.3.
Remove yarn, replace with new npm version.

11.2.0
======
-   Restore broken typings on Style object

11.1.1
======
Add white bg to cartoonSwearing style (to work w Chrome devtools dark mode)

Fix padding in seafoamSalad theme
*   Adds left & right padding, so emoji no longer crosses green border

Working interpolation in inspector outputs (in shared module)
*   e.g. log.inspector.info
    *   Doesn't show '${output}${bookend}' at the end out the output anymore
        *   Interpolates correctly instead

11.1.0
======
Convert to use TS esModuleInterop mode

Remove transpiled output from codebase

Fix Swimmers style to work in Chrome devtools dark mode

11.0.0 [HUGE BREAKING CHANGES]
==============================
Default export now proxies to shared module - build log with:

    import {logFactory, Styles} from 'mad-logs/lib/shared';
    const log = logFactory(`input-util-components.tsx`, Styles.angryBird);

...instead of:

    import {logFactory, madLogMarkers} from 'mad-logs';
    const log = logFactory()(`input-util-components.tsx`, madLogMarkers.angryBird);

Imports no longer available:
*   `madLogMarkers` (replaced with `Styles`, but it works differently)
*   `LogOpts`
*   `AppConf`
*   `MadLog` (replaced with `Log` e.g. `import {Log} from 'mad-logs';`)
*   `logValues`
*   `buildFileTag` (however, node variant still has it, for now)

Shared module exports `LogLevels` type

Total removal of original non-isomorphic mad-log module

Styles (shared):
*   Remove braces from almost all Node log outputs
*   Style `lucky` background colour changed to yellow
*   New fountain style

Internal:
*   Slightly cleaner tests
*   Expanded docs
*   REPL moved to script dir
*   Cleaner code throughout

----------------------------------------------------------------------------------------------------
10.3.6
======
Fix documentation to be more IDE-friendly

10.3.4
======
Remove semicolon at end of file names in browser console in shared module

10.3.3 [BREAKING CHANGES]
=========================
Upgrade mad-utils to v0.62.0
Upgrade env-var-helpers to v5.0.1 (breaking change, vastly different output)

10.2.0
======
Remove trailing semicolons from browser styles

10.1.12
=======
Add 'seafoamSalad' style

10.1.11
=======
Add 'fresh' style

10.1.10
=======
Improve cantTouch style in Node (Fix emoji spacing, add 'stop' emoji)

Fix moProblems style spacing in Node/isomorphic

Add new isomorphic/browser/node styles:
    *   neverEnough 
    *   ohMy

10.1.9
======
Add new cantTouch style

10.1.8
======
Added isomorphic styles:
    *   xmlHell
    *   cartoonSwearing
    *   default (alias to 'none')

More consistent comment docs

10.1.7
======
Add space to end of all isomorphic styles

Ran prettier on (most) JS & TS files + general cleanups

Cleaned up index.ts

Remove & uninstall modules:
    *   lodash.isfunction
    *   lodash.partial

10.1.6
======
Added isomorphic styles:
    *   barbells
    *   brainwave

Improves/fixes isomorphic style:
    *   moProblems (removes unneeded extra chars)

10.1.5
======
Improves/fixes (and adds emojis to) isomorphic styles:
    *   rockIsDead

Added isomorphic styles:
    *   checkmate
    *   dirtRoad
    *   farmerBrown
    *   grasslands
    *   hotPursuit

10.1.4
======
Improves/fixes (and adds emojis to) isomorphic styles:
    *   angryBird
    *   bracelet
    *   cult
    *   hatBlock
    *   joy
    *   lucky
    *   rainbowLeaf
    *   springy
    *   tangerines
    *   theBird

Remove spaces before file names for multiple styles

10.1.3
======
Added isomorphic styles:
    *   kingRageBlock
    *   lakeLouise
    *   mechanicalAtFists

Improves/fixes isormophic styles:
    *   aquarium
    *   pipeDream
    *   probeArcade
    *   smokeyHatesChristmas

10.1.2
======
Fix "underline" wrapper for isomorphic styles

Fix "rainbow" wrapper for isomorphic styles

Add moProblems isomorphic style

Visible filename & added emojis in Node for smokeyHatesChristmas isomorphic style

10.1.1
======
Prettier run on shared module

Added isomorphic styles:
    *   nightmare
    *   pipeDream
    *   zebra
    *   mrsPotatoVHS

Fix potOfGold style (more readable, added 💰 emojis)

Reorganized styles (alphabetical)

Unit tests for (approximately) 15 more isomorphic styles

10.1.0
======
Added isomorphic styles:
    *   springy
    *   swimmers
    *   tangerines
    *   theBird
    *   vendetta

Create new "rainbow" type string modifier

Change rainbowLeaf isomorphic style to use "rainbow" modifier for filename string in node 

10.0.0
======
Tooling / build
    *   Add prettier
    *   Update tslint
    *   Add .gitattributes
    *   tsconfig - skips lib checks

Added isomorphic styles:
    *   isoStyles.none
        *   For producing unstyled text (note: still wraps the file name in '[' and ']  ')
    *   isoStyles.angryBird
    *   isoStyles.arrow
    *   isoStyles.backAndForth
    *   isoStyles.escherBarbieLego
    *   isoStyles.maceWindu

Default style for isomorphic export set to isoStyles.none (only when no style specified)

Breaking changes
----------------
mad-logs/lib/shared: Remove letter-named isomorphic styles from isoStyles object
    *   Removed isoStyles.a
    *   Removed isoStyles.b
    *   ...
    *   Removed isoStyles.l


----------------------------------------------------------------------------------------------------
9.1.2
=====
Upgraded modules to latest:
- lodash
- mocha
- nodemon
- prettier
- sinon
- ts-node
- env-var-helpers
- @types/lodash

9.1.1
=====
Added isomorphic styles 'kingRageBlock' and 'mrsPotatoVHS'
New unit testing helper for rapidly testing browser styles
