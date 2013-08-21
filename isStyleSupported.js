/*
 * isStyleSupported
 * Provides a reliable means of determining support for CSS styles and values
 * @param {String} style The style you wish to test support for in camel case
 * @param {String} value The value of the style you wish to test support for (optional)
 * @return {Boolean} True or false based on results of the test
 */
 
(function(win){
	"use strict";
			
	//Define global function
	win.isStyleSupported = ('CSS' in win && 'supports' in win.CSS) || ('supportsCSS' in win) ? 
		//Use the native implementation when available
		function(style, value){
			//Test for the standard method
			if(win.CSS && win.CSS.supports){
				return win.CSS.supports(style, value);	
			}
			//Must be Opera, use their version
			return win.supportsCSS(style, value);
		//Create a closure for the polyfill	
		} : (function(){
			//Define a test element 
			var el = win.document.createElement('div'),
			//Create an array of vendor prefixes
			prefixes = ['Webkit', 'Moz', 'O', 'ms'], 
			//Create a regular expression to turn camel cased string into css format
			hypenateRe = /([a-z])([A-Z])/g, 
			//Create the cache
			cache = {},
			//Define common variables
			length, 
			support, 
			css, 
			key, 
			capitalized;
			//Create the function
			return function(style, value){
				//If no value is supplied we use "inherit" as all styles support it
				value = arguments.length === 2 ? value : 'inherit';
				//Create a key for caching purposes
				key = style + ':' + value;
				//Check the cache
				if(key in cache){
					//If a value is found in the cache, return it
					return cache[key];	
				}
				//Support starts false, it needs to be proven
				support = false;
				//Create the hypenated version of the style propertty to be used inline
				css = style.replace(hypenateRe, '$1-$2').toLowerCase();
				//Create a capitalized version of the style property to be combined with the vendor prefixes
				capitalized = style.charAt(0).toUpperCase() + style.slice(1);
				//First determine support for the style
				support = (typeof el.style[style] === 'string');
				//Add the style and value inline to the test element
				el.style.cssText = css+':'+value;
				//Check to see if the style and value exists
				support = support && (el.style[style] !== '');
				//Cache the length of prefixes for the while loop
				length = prefixes.length;
				//Loop the prefixes while support is yet to be determined
				while(!support && length--){
					//Create a vendor prefixed version of the style property
					style = prefixes[length] + capitalized;
					//First determine support for the style
					support = (typeof el.style[style] === 'string');
					//Add the vendor prefixed style and value inline
					el.style.cssText = '-'+prefixes[length].toLowerCase()+'-'+css+':'+value;
					//Check to see if the style and value exists
					support = support && (el.style[style] !== '');
				}
				//Cache and return the result
				return cache[key] = support;	
			}
		})();
		
})(this);
