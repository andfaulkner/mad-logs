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
