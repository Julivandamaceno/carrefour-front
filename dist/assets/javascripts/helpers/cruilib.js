(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (window) {
  var CRUI = function () {
    var crui = {};

    function CORE(dom, selector) {
      var i = void 0;
      var len = dom ? dom.length : 0;

      for (i = 0; i < len; i++) {
        this[i] = dom[i];
      }

      this.length = len;
      this.selector = selector || '';
    }

    function elements(selector) {
      return [].slice.call(selector);
    }

    function normalizeNodes(items) {
      var nodes = [];

      items.map(function (item) {
        nodes.push(item[0]);
      });

      return nodes;
    }

    crui.init = function (selector) {
      var dom = void 0;

      if (!selector) {
        return new CORE();
      } else if (typeof selector == 'string') {
        selector = selector.trim();

        dom = document.querySelectorAll(selector);
      } else if (selector instanceof NodeList) {
        dom = normalizeNodes([selector]);
      } else if (selector instanceof Node) {
        dom = [selector];
      }

      return new CORE(dom, selector);
    };

    var $ = function $(selector) {
      return crui.init(selector);
    };

    $.fn = CORE.prototype = {
      splice: [].splice,
      length: 0,
      addClass: function addClass(name) {
        elements(this).map(function (elem) {
          elem.classList.add(name);
        });

        return this;
      },
      removeClass: function removeClass(name) {
        elements(this).map(function (elem) {
          elem.classList.remove(name);
        });

        return this;
      },
      hide: function hide() {
        elements(this).map(function (elem) {
          elem.style.display = 'none';
        });

        return this;
      },
      show: function show() {
        elements(this).map(function (elem) {
          elem.style.display = 'block';
        });

        return this;
      },
      hasClass: function hasClass(val) {
        return this[0].classList.contains(val);
      },
      val: function val(_val) {
        if (_val) {
          return this[0].value = _val;
        }

        return this[0].value;
      },
      toggle: function toggle() {
        if (this[0].style.display === 'none') {
          return this[0].style.display = 'block';
        }{
          return this[0].style.display = 'none';
        }
      }
    };

    return $;
  }();

  window.crui = CRUI;

  ;(function ($) {
    $.fn.click = function (callback) {
      if (!callback) {
        return this[0].click();
      }

      return [].slice.call(this).map(function (elem) {
        elem.addEventListener('click', function (e) {
          callback.call(elem, e);
        });
      });
    };
  })(CRUI);

  ;(function ($) {
    $.fn.on = function (opts, context) {
      var _this = this;

      return $(context).click(function (e) {
        if (e.target && e.target.matches(_this.selector)) {
          opts.click.call(e.target, e);
        }
      });
    };
  })(CRUI);

  return CRUI;
})(window);

},{}]},{},[1]);
