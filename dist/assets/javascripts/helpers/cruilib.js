(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Closest = function () {
    function Closest() {
        _classCallCheck(this, Closest);
    }

    _createClass(Closest, null, [{
        key: 'get',
        value: function get(elem, selector) {
            var firstChar = selector.charAt(0);
            var supports = 'classList' in document.documentElement;
            var attribute = void 0,
                value = void 0;

            if (firstChar === '[') {
                selector = selector.substr(1, selector.length - 2);
                attribute = selector.split('=');

                if (attribute.length > 1) {
                    value = true;
                    attribute[1] = attribute[1].replace(/"/g, '').replace(/'/g, '');
                }
            }

            for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
                if (firstChar === '.') {
                    if (supports) {
                        if (elem.classList.contains(selector.substr(1))) {
                            return elem;
                        }
                    } else {
                        if (new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test(elem.className)) {
                            return elem;
                        }
                    }
                }

                if (firstChar === '#') {
                    if (elem.id === selector.substr(1)) {
                        return elem;
                    }
                }

                if (firstChar === '[') {
                    if (elem.hasAttribute(attribute[0])) {
                        if (value) {
                            if (elem.getAttribute(attribute[0]) === attribute[1]) {
                                return elem;
                            }
                        } else {
                            return elem;
                        }
                    }
                }

                if (elem.tagName.toLowerCase() === selector) {
                    return elem;
                }
            }

            return null;
        }
    }]);

    return Closest;
}();

exports.default = Closest;

},{}],2:[function(require,module,exports){
'use strict';

var _closest = require('./closest');

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      parent: function parent() {
        return elements(this).map(function (elem) {
          return elem.parentNode;
        });
      },
      closest: function closest(selector) {
        return elements(this).map(function (elem) {
          if ('closest' in document.body) {
            return elem.closest(selector);
          }

          return _closest2.default.get(elem, selector);
        });
      },
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

    $.fn.on = function (opts, context) {
      var _this = this;

      return $(context).click(function (e) {
        if (e.target && e.target.matches(_this.selector)) {
          opts.click.call(e.target, e);
        }
      });
    };
  })(CRUI);

  ;(function ($) {
    $.fn.html = function (html) {
      if (!html) {
        return this[0].innerHTML;
      }

      return [].slice.call(this).map(function (elem) {
        elem.innerHTML = html;
      });
    };
  })(CRUI);

  return CRUI;
})(window);

},{"./closest":1}]},{},[2]);
