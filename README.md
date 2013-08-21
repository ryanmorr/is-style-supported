## isStyleSupported

Method that provides a reliable means of determining support for CSS styles and values in JavaScript utilizing native implementations (CSS.supports) when available. Please visit the [blog post](ryanmorr.com/detecting-css-style-support) to read more.

## Example

To use the method, simply provide a style as the first argument in camel cased format. You can use the optional second argument to determine support for the style's value as well.

	isStyleSupported('animation-name');
	
	isStyleSupported('display', 'flex');
	
The method will return true/false based on the browser's support for the style declaration.		

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
