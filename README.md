script.src={datauri-vs-src} vs script.text
==========================================

Quick test loads jquery files first, then loads codebase.js 

Attempts to determine and compare load times between using script.src = URL vs. script.src = dataURIString.

[ 31 JUL 2013 ] - added script.text = scriptText test.

View this page live at 
[https://rawgithub.com/dfkaye/datauri-vs-src-test/master/index.html](https://rawgithub.com/dfkaye/datauri-vs-src-test/master/index.html)

Buttons let you re-load the codebase.js as src url or as dataURI, or as script.text.

Results indicate total time for each type of script request.

*Clear cache before each button test*

Leave in cache to see any diffs in http vs cache-only lookup times.

__Results__

So far, looks like src wins over dataURI.

[ 31 JUL 2013 ] - looks like src and scriptText are w/in 20ms; both win over dataURI.

[ 24 JUL 2013 ] - dataURI performance and power consumption on mobile poorer than URL fetch - 
see [data-uris are slow on mobile](http://www.mobify.com/blog/data-uris-are-slow-on-mobile/)

__Discussion__

The point of all this is to ferret out performance gains in time-to-first-byte and time-to-load.

Using dataURI means the script source is larger than the original.
Using script.text means you have to transform or encode or stringify the actual script source file.
Using script.src means you don't have to stringify the script file.

Both text and dataURI mean more bytes in the initial page load if they're inlined.
But if they reside as vars inside a src-referenced script, the html initial payload isn't so bloated.

__Next Question__

[ 31 JUL 2013] - How do we use browsers' built-in lookahead + prefetch capabilities effectively to 
load additional scripts as strings, such as in a build map file with each script url containing the
stringified version of the source?


