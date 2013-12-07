# isStyleSupported

Method that provides a reliable means of detecting support for CSS styles and their assignable values in JavaScript utilizing native implementations when available. Please refer to [http://www.ryanmorr.com/detecting-css-style-support](http://www.ryanmorr.com/detecting-css-style-support) to read more.

## Usage

To use the method, simply provide a style property as the first argument in standard CSS notation (hyphenated). You can use the optional second argument to determine support for the style's value as well. 

```javascript
// Feature test CSS animations
isStyleSupported('animation-name');

// Feature test the flexbox layout module
isStyleSupported('display', 'flex');
```
    
Please note, you will not be required to provide vendor prefixes for properties, that is done internally. However, this is not the case for property values which may require a vendor prefix depending on the value you wish to test. For example:

## Tests

Included is a test file that feature tests the browser's level of support for various CSS3 styles and their assignable value. Open `test.html` in your browser to view. See a working example at [http://ryanmorr.com/demos/is-style-supported/](http://ryanmorr.com/demos/is-style-supported/).

## Browser Support

Chrome, Firefox, Opera, Safari, Internet Explorer 7+

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
