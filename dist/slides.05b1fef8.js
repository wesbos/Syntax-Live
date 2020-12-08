// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"slides.js":[function(require,module,exports) {
/*
  Google HTML5 slides template

  Authors: Luke Mahé (code)
           Marcin Wichary (code and design)

           Dominic Mazzoni (browser compatibility)
           Charles Chen (ChromeVox support)

  URL: http://code.google.com/p/html5slides/
*/
// var PERMANENT_URL_PREFIX = 'http://localhost/demos/talks/snow/';
var PERMANENT_URL_PREFIX = window.location.origin + window.location.pathname; // var PERMANENT_URL_PREFIX = window.location.href.split('/index.html')[0] + '/'

var SLIDE_CLASSES = ['far-past', 'past', 'current', 'next', 'far-next'];
var PM_TOUCH_SENSITIVITY = 15;
var curSlide;
/* ---------------------------------------------------------------------- */

/* classList polyfill by Eli Grey
 * (http://purl.eligrey.com/github/classList.js/blob/master/classList.js) */

if (typeof document !== 'undefined' && !('classList' in document.createElement('a'))) {
  (function (view) {
    var classListProp = 'classList',
        protoProp = 'prototype',
        elemCtrProto = (view.HTMLElement || view.Element)[protoProp],
        objCtr = Object;
    strTrim = String[protoProp].trim || function () {
      return this.replace(/^\s+|\s+$/g, '');
    }, arrIndexOf = Array[protoProp].indexOf || function (item) {
      for (var i = 0, len = this.length; i < len; i++) {
        if (i in this && this[i] === item) {
          return i;
        }
      }

      return -1;
    }, // Vendors: please allow content code to instantiate DOMExceptions
    DOMEx = function DOMEx(type, message) {
      this.name = type;
      this.code = DOMException[type];
      this.message = message;
    }, checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
      if (token === '') {
        throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
      }

      if (/\s/.test(token)) {
        throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
      }

      return arrIndexOf.call(classList, token);
    }, ClassList = function ClassList(elem) {
      var trimmedClasses = strTrim.call(elem.className),
          classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];

      for (var i = 0, len = classes.length; i < len; i++) {
        this.push(classes[i]);
      }

      this._updateClassName = function () {
        elem.className = this.toString();
      };
    }, classListProto = ClassList[protoProp] = [], classListGetter = function classListGetter() {
      return new ClassList(this);
    }; // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.

    DOMEx[protoProp] = Error[protoProp];

    classListProto.item = function (i) {
      return this[i] || null;
    };

    classListProto.contains = function (token) {
      token += '';
      return checkTokenAndGetIndex(this, token) !== -1;
    };

    classListProto.add = function (token) {
      token += '';

      if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);

        this._updateClassName();
      }
    };

    classListProto.remove = function (token) {
      token += '';
      var index = checkTokenAndGetIndex(this, token);

      if (index !== -1) {
        this.splice(index, 1);

        this._updateClassName();
      }
    };

    classListProto.toggle = function (token) {
      token += '';

      if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
      } else {
        this.remove(token);
      }
    };

    classListProto.toString = function () {
      return this.join(' ');
    };

    if (objCtr.defineProperty) {
      var classListPropDesc = {
        get: classListGetter,
        enumerable: true,
        configurable: true
      };

      try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
      } catch (ex) {
        // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7ff5ec54) {
          classListPropDesc.enumerable = false;
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
      }
    } else if (objCtr[protoProp].__defineGetter__) {
      elemCtrProto.__defineGetter__(classListProp, classListGetter);
    }
  })(self);
}
/* ---------------------------------------------------------------------- */

/* Slide movement */


function getSlideEl(no) {
  if (no < 0 || no >= slideEls.length) {
    return null;
  }

  return slideEls[no];
}

function updateSlideClass(slideNo, className) {
  var el = getSlideEl(slideNo);

  if (!el) {
    return;
  }

  if (className) {
    el.classList.add(className);
  }

  for (var i in SLIDE_CLASSES) {
    if (className != SLIDE_CLASSES[i]) {
      el.classList.remove(SLIDE_CLASSES[i]);
    }
  }
}

function updateSlides() {
  for (var i = 0; i < slideEls.length; i++) {
    switch (i) {
      case curSlide - 2:
        updateSlideClass(i, 'far-past');
        break;

      case curSlide - 1:
        updateSlideClass(i, 'past');
        break;

      case curSlide:
        updateSlideClass(i, 'current');
        break;

      case curSlide + 1:
        updateSlideClass(i, 'next');
        break;

      case curSlide + 2:
        updateSlideClass(i, 'far-next');
        break;

      default:
        updateSlideClass(i);
        break;
    }
  }

  triggerLeaveEvent(curSlide - 1);
  triggerEnterEvent(curSlide);
  window.setTimeout(function () {
    // Hide after the slide
    disableSlideFrames(curSlide - 2);
  }, 301);
  enableSlideFrames(curSlide - 1);
  enableSlideFrames(curSlide + 2);

  if (isChromeVoxActive()) {
    speakAndSyncToNode(slideEls[curSlide]);
  }

  updateHash();
}

function buildNextItem() {
  var toBuild = slideEls[curSlide].querySelectorAll('.to-build');

  if (!toBuild.length) {
    return false;
  }

  toBuild[0].classList.remove('to-build');

  if (isChromeVoxActive()) {
    speakAndSyncToNode(toBuild[0]);
  }

  return true;
}

function prevSlide() {
  if (curSlide > 0) {
    curSlide--;
    updateSlides();
  }
}

function nextSlide() {
  if (buildNextItem()) {
    return;
  }

  if (curSlide < slideEls.length - 1) {
    curSlide++;
    updateSlides();
  }
}

function triggerEnterEvent(no) {
  var el = getSlideEl(no);

  if (!el) {
    return;
  }

  var onEnter = el.getAttribute('onslideenter');

  if (onEnter) {
    new Function(onEnter).call(el);
  }

  var evt = document.createEvent('Event');
  evt.initEvent('slideenter', true, true);
  evt.slideNumber = no + 1; // Make it readable

  el.dispatchEvent(evt);
}

function triggerLeaveEvent(no) {
  var el = getSlideEl(no);

  if (!el) {
    return;
  }

  var onLeave = el.getAttribute('onslideleave');

  if (onLeave) {
    new Function(onLeave).call(el);
  }

  var evt = document.createEvent('Event');
  evt.initEvent('slideleave', true, true);
  evt.slideNumber = no + 1; // Make it readable

  el.dispatchEvent(evt);
}
/* Touch events */


function handleTouchStart(event) {
  if (event.touches.length == 1) {
    touchDX = 0;
    touchDY = 0;
    touchStartX = event.touches[0].pageX;
    touchStartY = event.touches[0].pageY;
    document.body.addEventListener('touchmove', handleTouchMove, true);
    document.body.addEventListener('touchend', handleTouchEnd, true);
  }
}

function handleTouchMove(event) {
  if (event.touches.length > 1) {
    cancelTouch();
  } else {
    touchDX = event.touches[0].pageX - touchStartX;
    touchDY = event.touches[0].pageY - touchStartY;
  }
}

function handleTouchEnd(event) {
  var dx = Math.abs(touchDX);
  var dy = Math.abs(touchDY);

  if (dx > PM_TOUCH_SENSITIVITY && dy < dx * 2 / 3) {
    if (touchDX > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }

  cancelTouch();
}

function cancelTouch() {
  document.body.removeEventListener('touchmove', handleTouchMove, true);
  document.body.removeEventListener('touchend', handleTouchEnd, true);
}
/* Preloading frames */


function disableSlideFrames(no) {
  var el = getSlideEl(no);

  if (!el) {
    return;
  }

  var frames = el.getElementsByTagName('iframe');

  for (var i = 0, frame; frame = frames[i]; i++) {
    disableFrame(frame);
  }
}

function enableSlideFrames(no) {
  var el = getSlideEl(no);

  if (!el) {
    return;
  }

  var frames = el.getElementsByTagName('iframe');

  for (var i = 0, frame; frame = frames[i]; i++) {
    enableFrame(frame);
  }
}

function disableFrame(frame) {
  frame.src = 'about:blank';
}

function enableFrame(frame) {
  var src = frame._src;

  if (frame.src != src && src != 'about:blank') {
    frame.src = src;
  }
}

function setupFrames() {
  var frames = document.querySelectorAll('iframe');

  for (var i = 0, frame; frame = frames[i]; i++) {
    frame._src = frame.src;
    disableFrame(frame);
  }

  enableSlideFrames(curSlide);
  enableSlideFrames(curSlide + 1);
  enableSlideFrames(curSlide + 2);
}

function setupInteraction() {
  /* Clicking and tapping */
  var el = document.createElement('div');
  el.className = 'slide-area';
  el.id = 'prev-slide-area';
  el.addEventListener('click', prevSlide, false);
  document.querySelector('section.slides').appendChild(el);
  var el = document.createElement('div');
  el.className = 'slide-area';
  el.id = 'next-slide-area';
  el.addEventListener('click', nextSlide, false);
  document.querySelector('section.slides').appendChild(el);
  /* Swiping */

  document.body.addEventListener('touchstart', handleTouchStart, false);
}
/* ChromeVox support */


function isChromeVoxActive() {
  if (typeof cvox == 'undefined') {
    return false;
  }

  return true;
}

function speakAndSyncToNode(node) {
  if (!isChromeVoxActive()) {
    return;
  }

  cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
  cvox.ChromeVox.navigationManager.syncToNode(node);
  cvox.ChromeVoxUserCommands.finishNavCommand('');
  var target = node;

  while (target.firstChild) {
    target = target.firstChild;
  }

  cvox.ChromeVox.navigationManager.syncToNode(target);
}

function speakNextItem() {
  if (!isChromeVoxActive()) {
    return;
  }

  cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
  cvox.ChromeVox.navigationManager.next(true);

  if (!cvox.DomUtil.isDescendantOfNode(cvox.ChromeVox.navigationManager.getCurrentNode(), slideEls[curSlide])) {
    var target = slideEls[curSlide];

    while (target.firstChild) {
      target = target.firstChild;
    }

    cvox.ChromeVox.navigationManager.syncToNode(target);
    cvox.ChromeVox.navigationManager.next(true);
  }

  cvox.ChromeVoxUserCommands.finishNavCommand('');
}

function speakPrevItem() {
  if (!isChromeVoxActive()) {
    return;
  }

  cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
  cvox.ChromeVox.navigationManager.previous(true);

  if (!cvox.DomUtil.isDescendantOfNode(cvox.ChromeVox.navigationManager.getCurrentNode(), slideEls[curSlide])) {
    var target = slideEls[curSlide];

    while (target.lastChild) {
      target = target.lastChild;
    }

    cvox.ChromeVox.navigationManager.syncToNode(target);
    cvox.ChromeVox.navigationManager.previous(true);
  }

  cvox.ChromeVoxUserCommands.finishNavCommand('');
}
/* Hash functions */


function getCurSlideFromHash() {
  var slideNo = parseInt(location.hash.substr(1));

  if (slideNo) {
    curSlide = slideNo - 1;
  } else {
    curSlide = 0;
  }
}

function updateHash() {
  location.replace("#".concat(curSlide + 1));
}
/* Event listeners */


function handleBodyKeyDown(event) {
  switch (event.keyCode) {
    case 39: // right arrow

    case 13: // Enter

    case 32: // space

    case 34:
      // PgDn
      nextSlide();
      event.preventDefault();
      break;

    case 37: // left arrow

    case 8: // Backspace

    case 33:
      // PgUp
      prevSlide();
      event.preventDefault();
      break;

    case 40:
      // down arrow
      if (isChromeVoxActive()) {
        speakNextItem();
      } else {
        nextSlide();
      }

      event.preventDefault();
      break;

    case 38:
      // up arrow
      if (isChromeVoxActive()) {
        speakPrevItem();
      } else {
        prevSlide();
      }

      event.preventDefault();
      break;
  }
}

function addEventListeners() {
  document.addEventListener('keydown', handleBodyKeyDown, false);
}
/* Initialization */


function addPrettify() {
  return;
  var els = document.querySelectorAll('pre');

  for (var i = 0, el; el = els[i]; i++) {
    if (!el.classList.contains('noprettyprint')) {
      el.classList.add('prettyprint');
    }
  }

  var el = document.createElement('script');
  el.type = 'text/javascript';
  el.src = "".concat(PERMANENT_URL_PREFIX, "prettify.js");

  el.onload = function () {// prettyPrint(); don't need it!
  };

  document.body.appendChild(el);
}

function addFontStyle() {
  return; // NONONONON

  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = 'http://fonts.googleapis.com/css?family=' + 'Open+Sans:regular,semibold,italic,italicsemibold|Droid+Sans+Mono';
  document.body.appendChild(el);
}

function addGeneralStyle() {
  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = "".concat(PERMANENT_URL_PREFIX, "styles.css");
  document.body.appendChild(el);
  var el = document.createElement('meta');
  el.name = 'viewport';
  el.content = 'width=1100,height=750';
  document.querySelector('head').appendChild(el);
  var el = document.createElement('meta');
  el.name = 'apple-mobile-web-app-capable';
  el.content = 'yes';
  document.querySelector('head').appendChild(el);
}

function makeBuildLists() {
  for (var i = curSlide, slide; slide = slideEls[i]; i++) {
    var items = slide.querySelectorAll('.build > *');

    for (var j = 0, item; item = items[j]; j++) {
      if (item.classList) {
        item.classList.add('to-build');
      }
    }
  }
}

function handleDomLoaded() {
  slideEls = document.querySelectorAll('section.slides > article');
  setupFrames();
  addFontStyle(); // addGeneralStyle(); do it myself

  addPrettify();
  addEventListeners();
  updateSlides();
  setupInteraction();
  makeBuildLists();
  document.body.classList.add('loaded');
}

function initialize() {
  getCurSlideFromHash();

  if (window._DEBUG) {
    PERMANENT_URL_PREFIX = '../';
  }

  if (window._DCL) {
    handleDomLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', handleDomLoaded, false);
  }
} // If ?debug exists then load the script relative instead of absolute


if (!window._DEBUG && document.location.href.indexOf('?debug') !== -1) {
  document.addEventListener('DOMContentLoaded', function () {
    // Avoid missing the DomContentLoaded event
    window['_DCL'] = true;
  }, false);
  window._DEBUG = true;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = '../slides.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s); // Remove this script

  s.parentNode.removeChild(s);
} else {
  initialize();
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51915" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","slides.js"], null)
//# sourceMappingURL=/slides.05b1fef8.js.map