Script loading performance tests
================================

Attempts to determine and compare load times between dynamic script loading strategies:

+ <code>script.src = url</code>
+ <code>script.src = dataURI</code>
+ <code>script.text = code</code> (added 1 Aug 2013)
+ <code>Function(code)</code> (added 2 Aug 2013)

Test page loads jquery files first, then loads codebase.js 

View the test page live on rawgithub.com (thanks again, to Ryan Grove ~ @rgrove) at 
[https://rawgithub.com/dfkaye/datauri-vs-src-test/master/index.html](https://rawgithub.com/dfkaye/datauri-vs-src-test/master/index.html)

Buttons let you re-load the codebase.js using the various strategies.


__Results__

Results indicate total time in milliseconds for each type of strategy (clean, get, run, end), plus average times.

[ 1 AUG 2013 ] 

Originally this test covered only the src attribute, comparing URL vs dataURI performance, the URL 
pointing to a static CDN domain.  In that setup, URL generally outperformed the dataURI across 
browsers - except for Internet Explorer (8-10) which processed the dataURI even faster than Chrome.

After adding the <code>script.text</code> strategy, the scripts needed to be modified so that all create > exec >
profile sequences were fair.  That meant moving the remote script to this repo and wrapping the entire 
script body in a function that could be called externally by any of the three strategies.  This gives 
more control over the source, and, apparently, prevents script caching in the browser, due to the 
proxying done by rawgithub.

Results of the 3 scripted dom element strategies now mimic an empty cache (so it's first-hit comparison only).  
The <code>script.text = code</code> strategy wins for all but IE where text vs URL are within 20ms (ymmv).  
The <code>script.src = url</code> strategy performs worst - except in IE again - but previously, when hitting 
the static CDN, <code>script.src</code> performed *best* - except in IE).  

The <code>script.src = dataURI</code> strategy performed a bit faster than <code>script.src = url</code> - 
except that it was __quite crash prone__ in Chrome and Firefox, and often performed orders of magnitude worse in 
Firefox on the first hit.

[ 2 AUG 2013 ]

Added <code>Function(code)</code> strategy to compare performance vs. scripting dom elements.

[ 15 AUG 2013 ] 

Added averages in display.

<table>
  <thead>
    <tr>
      <th></th>
      <th>Chrome 28</th>
      <th>Firefox 22</th>
      <th>Opera 12</th>
      <th>IE 10</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>src URL</th>
      <td>600ms</td>
      <td>600ms</td>
      <td>520ms</td>
      <td>200ms (amazing)</td>      
    </tr>  
    <tr>
      <th>dataURI</th>
      <td>100ms (crash prone)</td>
      <td>125ms (crash prone)</td>
      <td>185ms</td>
      <td>250ms</td>      
    </tr>    
    <tr>
      <th>script.text</th>
      <td>40ms</td>
      <td>80ms</td>
      <td>44ms</td>
      <td>185ms</td>      
    </tr>    
    <tr>
      <th>Function(code)</th>
      <td>25ms (100ms first time)</td>
      <td>28ms</td>
      <td>26ms</td>
      <td>25ms</td>      
    </tr>    
  </tbody>
</table>


__Discussion__

The point of all this had been to ferret out performance gains in time-to-first-byte and time-to-load.

[2 AUG 2013 ] - However, the <code>Function(code)</code> strategy appears to have best performance 
across the board, barely ahead of <code>script.text = code</code>.  In Chrome, the *first* invocation 
of <code>Function(code)</code> __always__ took 100+ ms.  Tobie Langel was right. Lazy evaluation reduces 
startup latency: [Lazy evaluation of CommonJS modules](http://calendar.perfplanet.com/2011/lazy-evaluation-of-commonjs-modules/)

Using <code>dataURI</code> means the script string is *larger* than the original source.

Using <code>script.text</code> and <code>Function(code)</code> means you have to transform or encode 
or stringify the actual script source file.

Using <code>script.src</code> means you don't have to stringify the script file but you're then subject to 
request latency over the network.

Both <code>script.text</code> and <code>dataURI</code> mean more bytes in the initial page load if they're inlined.
But if they reside as vars or map entries in a src-referenced script, then the initial html payload isn't so bloated.

[ 24 JUL 2013 ] - dataURI performance and power consumption on mobile poorer than URL fetch - 
see [data-uris are slow on mobile](http://www.mobify.com/blog/data-uris-are-slow-on-mobile/)

__[1 AUG 2013 ]__
Setting <code>window.codebase = null;</code> in the removeScript() function revealed that script should be 
attached to the DOM *before* <code>script.text = code</code> assignment ~ __order matters!__


__Next Up__

[ 31 JUL 2013] - explore browsers' built-in lookahead + prefetch capabilities effectively to 
load additional scripts as strings, such as in a build map file with each script url containing the
stringified version of the source *(this will probably be in its own repo).*
