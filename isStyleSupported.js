/*
 * isStyleSupported
 * Detect support for CSS styles and assignable values
 * @param {String} style
 * @param {String} value
 * @return {Boolean}
 */

(function(win){
    'use strict';
    
    // Define a test element 
    var el = win.document.createElement('div'),
    // Create an array of vendor prefixes
    prefixes = ['Webkit', 'Moz', 'O', 'ms'], 
    // Create a regular expression to make hypenated strings camel cased
    camelRe = /-([a-z]|[0-9])/ig,
    // Create the cache
    cache = {},
    // Define common variables
    key, 
    length, 
    support, 
    camel,
    capitalized,
    prefixed;
    
    // Function to convert css notation (hypenated) to DOM notation (camel cased)
    function toCamelCase(style){
        return style.replace(camelRe, function(all, letter){
            return (letter + '').toUpperCase();                                             
        });
    }
    
    // Encapsulate the different native APIs in a function
    function supports(style, value){
        // Check for the standard native method first
        if('CSS' in win && 'supports' in win.CSS){
            return win.CSS.supports(style, value);  
        }
        // Check for Opera's native method
        if('supportsCSS' in win){
            return win.supportsCSS(style, value);
        }
        return false;
    }
        
    // Define the function globally
    win.isStyleSupported = function(style, value){
        // If no value is supplied, use "inherit" as all styles support it
        value = arguments.length === 2 ? value : 'inherit';
        // Create a key for caching purposes
        key = style+':'+value;
        // Check the cache
        if(key in cache){
            // If the key is found in the cache, return the cached result
            return cache[key];  
        }
        // Check native method first
        support = supports(style, value);
        // If the native method has determined positive support, skip the rest
        if(!support){
            // Create a camel cased version of the style property for DOM interaction
            camel = toCamelCase(style);
            // Create a capitalized version of the style property to be combined with the vendor prefixes
            capitalized = camel.charAt(0).toUpperCase() + camel.slice(1);       
            // Add the style and value inline to the test element
            el.style.cssText = style+':'+value;
            // Check to see if the style and value exists
            support = camel in el.style && el.style[camel] !== '';
            // Cache the length of prefixes for the while loop
            length = prefixes.length;
            // Loop the prefixes while support is yet to be determined
            while(!support && length--){
                // Create a vendor prefixed version of the style property in CSS notation (hypenated)
                prefixed = '-'+prefixes[length].toLowerCase()+'-'+style;
                // Check native method first
                support = supports(prefixed, value);
                // If the native method has determined positive support, skip the rest
                if(!support){
                    // Create a vendor prefixed version of the style property in camel case format
                    camel = prefixes[length] + capitalized;
                    // Add the vendor prefixed style and value inline
                    el.style.cssText = prefixed+':'+value;
                    // Check to see if the style and value exists
                    support = camel in el.style && el.style[camel] !== '';
                }
            }
        }
        // Cache and return the result
        return cache[key] = support;    
    };
        
})(this);