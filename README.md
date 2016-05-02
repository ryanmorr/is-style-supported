# isStyleSupported

Method that provides a reliable means of detecting support for CSS styles and their assignable values in JavaScript utilizing native implementations when available. Please refer to the [blog post](http://www.ryanmorr.com/detecting-css-style-support) to read more, or view a [working example](http://ryanmorr.github.io/demos/is-style-supported/).

## Usage

To use the method, simply provide a style property as the first argument in standard CSS notation (kebab-case/hyphenated). You can use the optional second argument to determine support for the property's assignable value as well. 

```javascript
// Feature test CSS animations
isStyleSupported('animation-name');

// Feature test the flexbox layout module
isStyleSupported('display', 'flex');
```

Please note, you will not be required to provide vendor prefixes for properties, that is done internally. However, this is not the case for property values which may require a vendor prefix depending on the value you wish to test.

## Browser Support

* Chrome *
* Firefox *
* Opera *
* Safari *
* Internet Explorer 7+
* Android *
* iOS *

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
