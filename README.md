# isStyleSupported

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> Feature test support for CSS properties and their assignable values

## Install

Download the [development](http://github.com/ryanmorr/is-style-supported/raw/master/dist/is-style-supported.js) or [minified](http://github.com/ryanmorr/is-style-supported/raw/master/dist/is-style-supported.min.js) version, or install via NPM:

``` sh
npm install @ryanmorr/is-style-supported
```

## Usage

Provide a style property as the first argument in standard CSS notation (kebab-case/hyphenated). You can use the optional second argument to determine support for the property's assignable value as well.

```javascript
import isStyleSupported from '@ryanmorr/is-style-supported';

// Feature test CSS animations
isStyleSupported('animation-name');

// Feature test the flexbox layout module
isStyleSupported('display', 'flex');
```

Please note, you will not be required to provide vendor prefixes for properties, that is done internally. However, this is not the case for property values which may require a vendor prefix depending on the value you wish to test.

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/is-style-supported
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fis-style-supported.svg
[build-url]: https://travis-ci.org/ryanmorr/is-style-supported
[build-image]: https://travis-ci.org/ryanmorr/is-style-supported.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE
