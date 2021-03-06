import Closest from './closest';

(function(window) {
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

    function normalizeNodes(items) {
      let nodes = [];

      items.map((item) => {
        nodes.push(item[0]);
      });

      return nodes;
    }

    crui.init = function(selector) {
      let dom;

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

    let $ = (selector) => {
      return crui.init(selector);
    };

    $.fn = CORE.prototype = {
      splice: [].splice,
      length: 0,
      parent: function () {
        return elements(this).map((elem) => {
          return elem.parentNode;
        });
      },
      find: function (selector) {
        this[0].querySelectorAll(selector);

        return this;
      },
      closest: function (selector) {
        return elements(this).map((elem) => {
          if ('closest' in document.body) {
            return elem.closest(selector);
          }

          return Closest.get(elem, selector);
        });
      },
      addClass: function (name) {
        elements(this).map((elem) => {
          elem.classList.add(name);
        });

        return this;
      },
      removeClass: function (name) {
        elements(this).map((elem) => {
          elem.classList.remove(name);
        });

        return this;
      },
      hide: function () {
        elements(this).map((elem) => {
          elem.style.display = 'none';
        });

        return this;
      },
      show: function () {
        elements(this).map((elem) => {
          elem.style.display = 'block';
        });

        return this;
      },
      hasClass: function (val) {
        return this[0].classList.contains(val);
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
      },
      toggleClass: function (name) {
        if ($(this[0]).hasClass(name)) {
          $(this[0]).removeClass(name)
        }else {
          $(this[0]).addClass(name)
        }

        return this;
      }
    };

    return $;
  }());

  window.crui = CRUI;

  ;(function($) {
    function selectorMatches(el, selector) {
      var p = Element.prototype;
      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };

      return f.call(el, selector);
    }

    $.fn.click = function (callback) {
      if (!callback) {
        return this[0].click();
      }

      return [].slice.call(this).map((elem) => {
        elem.addEventListener('click', (e) => {
          callback.call(elem, e);
        });
      });
    };

    $.fn.on = function (opts, context) {
      return $(context).click((e) => {
        if (e.target && selectorMatches(e.target, this.selector)) {
          opts.click.call(e.target, e);
        }
      });
    };
  }(CRUI));

  ;(function($) {
    $.fn.html = function (html) {
      if (!html) {
        return this[0].innerHTML;
      }

      [].slice.call(this).map((elem) => {
        elem.innerHTML = html;
      });

      return this;
    }
  }(CRUI));

  return CRUI;
}(window))