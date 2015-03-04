/*
 * isStyleSupported
 * Detect support for CSS properties and their assignable values
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */

(function(win){
    'use strict';
    
    var el = win.document.createElement('div'),
    prefixes = ['Webkit', 'Moz', 'O', 'ms'], 
    camelRe = /-([a-z]|[0-9])/ig,
    length, 
    support, 
    camel,
    capitalized,
    prefixed;
    
    // Convert CSS notation (kebal-case) to DOM notation (camel-case)
    function toCamelCase(prop){
        return prop.replace(camelRe, function(all, letter){
            return (letter + '').toUpperCase();                                             
        });
    }
    
    // Test the different native APIs for style support
    function nativeSupports(prop, value){
        // Check the standard method first
        if('CSS' in win && 'supports' in win.CSS){
            return win.CSS.supports(prop, value);  
        }
        // Check for Opera's native method
        if('supportsCSS' in win){
            return win.supportsCSS(prop, value);
        }
        return false;
    }
        
    win.isStyleSupported = function(prop, value){
        // If no value is supplied, use "inherit"
        value = arguments.length === 2 ? value : 'inherit';
        // Check native methods first
        support = nativeSupports(prop, value);
        if(!support){
            camel = toCamelCase(prop);
            capitalized = camel.charAt(0).toUpperCase() + camel.slice(1);       
            // Add the unprefixed property and value as CSS test to the 
            // test element and determine support based on whether the
            // property exists in the style object
            el.style.cssText = prop + ':' + value;
            support = camel in el.style && el.style[camel] !== '';
            length = prefixes.length;
            while(!support && length--){
                // We repeat the previous steps here, this time trying 
                // each vendor prefix to determine support
                prefixed = '-'+prefixes[length].toLowerCase()+'-'+prop;
                support = nativeSupports(prefixed, value);
                if(!support){
                    camel = prefixes[length] + capitalized;
                    el.style.cssText = prefixed + ':' + value;
                    support = camel in el.style && el.style[camel] !== '';
                }
            }
        }
        return support;    
    };
        
})(this);