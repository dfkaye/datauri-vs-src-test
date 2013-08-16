;(function() {
  
  // codebase-test.js
  // unsexy vanilla js
  
  var scriptUrl = document.location.href;
  scriptUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);
  scriptUrl += 'codebase.js';
  
  var scriptText = window.codebase.toString();
  var newFunction = Function(scriptText + '; window.codebase = codebase;');
    
  // dataURI defined globally in codebase-dataURI.js
  // codebase defined globally in codebase.js      
  var strategies = {
    'dataURI' : dataURI,
    'scriptUrl' : scriptUrl,
    'scriptText' : scriptText,
    'newFunction' : newFunction
  };
  
  // result data
  var timings = {};

  // user actions     
  var buttons = document.getElementsByTagName('button');
  
  for (var i = 0; i < buttons.length; ++i) {
  
    var btn = buttons[i];
    
    if (btn.addEventListener) {
      btn.addEventListener('click', onBtnClick, false);
    } else if (btn.attachEvent) {
      btn.attachEvent('onclick', onBtnClick, false);
    } else {
      btn.onclick = onBtnClick;
    }
  }

  function onBtnClick(e) {
  
    var target = e.target || e.srcElement || this;
    var method = target.getAttribute('data-method');
    var src;
    
    if (method == 'removeScript') {
      removeScript()
    } else {
      src = strategies[method];
      createScript(src, method);
    }
  }
  
  function createScript(src, method) {
  
    var start = +new Date();
    var parentNode = removeScript();
    var script;
    
    // newFunction doesn't need a new script element
    if (method == 'newFunction') {

      src();
      profile(start, method);
      
      return;
    }
    
    // attach script src to new script element as src or text
    script = document.createElement('script');
    script.id ='testScript';

    if (method == 'scriptText') {
      // script text is not applied if script is not attached to document
      // similar to style element
      parentNode.appendChild(script);      
      script.text = src;
      profile(start, method);

    } else {

      // script load handler must be defined before defining src attribute
      // due to preemptive loading (particularly in IE)
      script.onload = script.onreadystatechange = function () {
        if (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onload = script.onreadystatechange = null
          profile(start, method)
        }
      }
    
      // ... and IE won't load src if script is already attached...
      script.src = src;
      parentNode.appendChild(script);
    }
  }
  
  function profile(start, method) {
    
    // if anything failed to load, this throws an error
    // don't catch it, just let it happen so we're forced to re-visit
    window.codebase();
    
    var end = +new Date();
    var time = Number((end - start) / 1000).toPrecision(3;

    
    !!timings[method] || (timings[method] = []);
    timings[method].push(time);
    
    var data = timings[method];
    var length = data.length;
    var total = 0;
    
    for (var i = 0; i < length; ++i) {
      total += data[i];
    }

    !!console && console.log(timings[method]);
    !!console && console.log(total / length);
    
    document.getElementById(method + 'Results').innerHTML += (length + ':  ' + time + ' s<br/>');
    document.getElementById(method + 'Avg').innerHTML = 'Avg: ' + Number(total / length).toPrecision(3) + ' s';
  }
  
  function removeScript() {
  
    var testScript = document.getElementById('testScript');
    var parentNode;
    
    window.codebase = null;

    if (!testScript ) {
      return document.getElementsByTagName('head')[0];
    }
    
    parentNode = testScript.parentNode;
            
    parentNode.removeChild(testScript);
    
    return parentNode;
  }

}());
