datauri-vs-src-test
===================

Quick test html that loads jquery files first, then loads codebase.js 

Attempts to determine and compare load times between using script.src = URL vs. script.src = dataURIString.

View this page live at https://rawgithub.com/dfkaye/datauri-vs-src-test/master/index.html

Buttons let you re-load the codebase.js as src url or as dataURI.

Results indicate total time for each type of script request.

*clear cache before each button test*

Leave in cache to see any diffs in http vs cache-only lookup times.

So far, looks like src wins over dataURI.

Update 24 JUL 2013 - dataURI performance and power consumption on mobile poorer than URL fetch - 
see [data-uris are slow on mobile](http://www.mobify.com/blog/data-uris-are-slow-on-mobile/)
