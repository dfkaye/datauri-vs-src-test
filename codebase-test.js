;(function() {
  
  //codebase-test.js
  // unsexy vanilla js
  
  var scriptUrl = document.location.href;
  scriptUrl = scriptUrl.substring(0, scriptUrl.lastIndexOf('/') + 1);
  scriptUrl += 'codebase.js';
  
  var scriptText = window.codebase.toString();
  var newFunction = Function(scriptText);
    
  // dataURI defined globally in codebase-dataURI.js
  // codebase defined globally in codebase.js      
  var strategies = {
    'dataURI' : dataURI,
    'scriptUrl' : scriptUrl,
    'scriptText' : scriptText,
    'newFunction' : newFunction
  };
       
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
    var script = document.createElement('script');
    
    script.id ='testScript';

    if (method === 'newFunction') {
      
      newFunction();
      profile(start, method);
      
    } else if (method === 'scriptText') {
      // script text is not applied until attached to document
      parentNode.appendChild(script);      
      script.text = src;
      profile(start, method);

    } else {

      // script load handler must be defined before defining src attribute
      script.onload = script.onreadystatechange = function () {
        if (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onload = script.onreadystatechange = null
          profile(start, method)
        }
      }
    
      // IE won't load src if script is already attached...
      script.src = src;
      parentNode.appendChild(script);
    }
  }
  
  function profile(start, method) {
    
    window.codebase();
    
    var end = +new Date();
    var results = document.getElementById(method + 'Results');
    
    results.innerHTML += (method + ' took ' + ((end - start) / 1000) + ' seconds.<br/>')
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
