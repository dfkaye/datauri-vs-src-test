datauri-vs-src-test
===================

quick html that loads jquery files first, then loads codebase.js

view this page live at https://rawgithub.com/dfkaye/datauri-vs-src-test/master/index.html

buttons let you re-load the codebase.js as src url or as dataURI.

results indicate total time for each type of script request.

clear cache before each button test

leave in cache to see any diffs in http  vs cache-only lookup times.

looks like src wins over dataURI.
