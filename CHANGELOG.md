10.3.2
======
Upgrade mad-utils to v0.62.0
Upgrade env-var-helpers to v5.0.0 (breaking change, vastly different output)

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
