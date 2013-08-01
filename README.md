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

[ 1 AUG 2013 ] 

Originally this test covered only the src attribute, comparing URL vs dataURI performance, the URL 
pointing to a static CDN domain.  In that setup, URL generally outperformed the dataURI across 
browsers - except for Internet Explorer (8-10) which processed the dataURI even faster than Chrome.

After adding the script.text strategy, the scripts needed to be modified so that all create > exec >
profile sequences were fair.  That meant moving the remote script to this repo and wrapping the entire 
script body in a function that could be called externally by any of the three strategies.  This gives 
more control over the source, and, apparently, prevents script caching in the browser, due to the 
proxying done by rawgithub.

Results of the 3 strategies now mimic an empty cache (so it's first-hit comparison only).  Script.text 
wins for all but IE where text vs URL are within 20ms (ymmv).  URL performs worst except in IE again.  
(Previously, when hitting the static CDN, URL performed *best* - except in IE).  Using dataURI performed 
a bit faster than URL, but was quite crash prone in Chrome and Firefox.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Chrome </th>
      <th>Firefox 22</th>
      <th>Opera 12</th>
      <th>IE 10</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>script.text</th>
      <td>80ms</td>
      <td>40ms</td>
      <td>30ms</td>
      <td>200ms</td>      
    </tr>
    <tr>
      <th>dataURI</th>
      <td>200ms</td>
      <td>200ms</td>
      <td>200ms</td>
      <td>200ms</td>      
    </tr>    
    <tr>
      <th>src URL</th>
      <td>500ms</td>
      <td>500ms</td>
      <td>500ms</td>
      <td>200ms</td>      
    </tr>
  </body>
</table>


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


