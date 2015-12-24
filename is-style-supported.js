/*
 * isStyleSupported
 * Detect support for CSS properties and their assignable values
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */

(function (window, document) {
    'use strict';

    var el = document.createElement('div'),
    prefixes = ['Webkit', 'Moz', 'O', 'ms'],
    camelRe = /-([a-z]|[0-9])/ig,
    length,
    support,
    camel,
    capitalized,
    prefixed,
    checkNativeSupport;

    // Test the different native APIs for CSS support
    if ('CSS' in window && window.CSS.supports) {
        // Check the standard method first
        checkNativeSupport = window.CSS.supports;
    } else if (window.supportsCSS) {
        // Check for Opera's native method
        checkNativeSupport = window.supportsCSS;
    } else {
        // Native API doesn't exist
        checkNativeSupport = function checkNative() {
            return false;
        };
    }

    // Convert CSS notation (kebab-case) to DOM notation (camelCase)
    function toCamelCase(prop) {
        return prop.replace(camelRe, function replaceChar(all, char) {
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
    window.isStyleSupported = function isStyleSupported(prop, value) {
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

})(window, window.document);
