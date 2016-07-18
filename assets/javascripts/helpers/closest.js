class Closest {
  static get (elem, selector) {
    let firstChar = selector.charAt(0);
    let supports = 'classList' in document.documentElement;
    let attribute, value;

    if (firstChar === '[') {
        selector = selector.substr( 1, selector.length - 2 );
        attribute = selector.split( '=' );

        if ( attribute.length > 1 ) {
            value = true;
            attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
        }
    }

    for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
        if (firstChar === '.') {
            if (supports) {
                if (elem.classList.contains(selector.substr(1))) {
                    return elem;
                }
            } else {
                if (new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className)) {
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
                    if (elem.getAttribute( attribute[0] ) === attribute[1]) {
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
}

export default Closest;