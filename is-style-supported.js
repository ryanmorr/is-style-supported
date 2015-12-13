/*
 * isStyleSupported
 * Detect support for CSS properties and their assignable values
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */

(function (win) {
    'use strict';

    var el = win.document.createElement('div'),
    prefixes = ['Webkit', 'Moz', 'O', 'ms'],
    camelRe = /-([a-z]|[0-9])/ig,
    length,
    support,
    camel,
    capitalized,
    prefixed,
    checkNativeSupport;

    // Test the different native APIs for CSS support
    if ('CSS' in win && win.CSS.supports) {
        // Check the standard method first
        checkNativeSupport = win.CSS.supports;
    } else if (win.supportsCSS) {
        // Check for Opera's native method
        checkNativeSupport = win.supportsCSS;
    } else {
        // Native API doesn't exist
        checkNativeSupport = function noop() {
            return false;
        };
    }

    // Convert CSS notation (kebab-case) to DOM notation (camelCase)
    function toCamelCase(prop) {
        return prop.replace(camelRe, function (all, char) {
            return (char + '').toUpperCase();
        });
    }

    // Determine support by actually applying the property/value
    // as CSS to the test element and checking if the property
    // exists in the style object
    function canSetProperty(prop, camel, value) {
        var support = camel in el.style;
        if (value === 'inherit') {
            return support;
        }

        el.style.cssText = prop + ':' + value;
        return support && el.style[camel] !== '';
    }

    // Define `isStyleSupported` globally
    win.isStyleSupported = function isStyleSupported(prop, value) {
        // If no value is supplied, use "inherit"
        value = arguments.length === 2 ? value : 'inherit';

        // Check native methods first
        support = checkNativeSupport(prop, value);
        if (support) {
            return true;
        }

        camel = toCamelCase(prop);
        capitalized = camel.charAt(0).toUpperCase() + camel.slice(1);

        // Check if the property/value can be applied to an element
        support = canSetProperty(prop, camel, value);
        length = prefixes.length;
        while (!support && length--) {
            // We repeat the previous steps here, this time trying
            // each vendor prefix to determine support
            prefixed = '-' + prefixes[length].toLowerCase() + '-' + prop;
            support = checkNativeSupport(prefixed, value);
            if (!support) {
                camel = prefixes[length] + capitalized;
                support = canSetProperty(prefixed, camel, value);
            }
        }

        return support;
    };

})(window);
