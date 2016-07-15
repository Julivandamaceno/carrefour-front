(function(fn, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() { 
      return factory(fn);
    });
  }else {
    factory(fn);
  }
}(window, function(window) {
  let CRUI = (function() {
    let crui = {};

    function CORE(dom, selector) {
      let i;
      let len = dom ? dom.length : 0;

      for (i = 0; i < len; i++) {
        this[i] = dom[i];
      }

      this.length = len;
      this.selector = selector || '';
    }

    function elements(selector) {
      return [].slice.call(selector);
    }

    crui.init = function(selector) {
      let dom;

      if (!selector) {
        return new CORE();
      } else if (typeof selector == 'string') {
        selector = selector.trim();

        dom = document.querySelectorAll(selector);
      }

      return new CORE(dom, selector);
    };

    CORE.prototype = {
      splice: [].splice,
      length: 0,
      addClass: function (name) {
        return elements(this).map((elem) => {
          elem.classList.add(name);
        });
      },
      removeClass: function (name) {
        return elements(this).map((elem) => {
          elem.classList.remove(name);
        });
      },
      hide: function () {
        return elements(this).map((elem) => {
          elem.style.display = 'none';
        });
      },
      show: function () {
        return elements(this).map((elem) => {
          elem.style.display = 'block';
        });
      },
      val: function (val) {
        if (val) {
          return this[0].value = val;
        }

        return this[0].value;
      },
      toggle: function () {
        if (this[0].style.display === 'none') {
          return this[0].style.display = 'block'
        } {
          return this[0].style.display = 'none';
        }
      }
    };

    return (selector) => {
      return crui.init(selector);
    };

  }());

  window.crui = CRUI;

  return CRUI;
}));