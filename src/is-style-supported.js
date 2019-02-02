/*
 * Common varilables
 */
const el = document.createElement('div');
const prefixes = ['Webkit', 'Moz', 'O', 'ms'];
const camelRe = /-([a-z]|[0-9])/ig;

/*
 * Convert kebab-case to camel-case
 *
 * @param {String} prop
 * @return {String}
 */
function toCamelCase(prop) {
    return prop.replace(camelRe, (all, char) => (char + '').toUpperCase());
}

/*
 * Check the native `CSS.supports`
 * method if it exists
 *
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */
function checkNativeSupport(prop, value) {
    if (CSS && CSS.supports) {
        return CSS.supports(prop, value);
    }
    return false;
}

/*
 * Determine support by applying the
 * property/value to the test element
 * and checking if the property exists
 * in the style object
 *
 * @param {String} prop
 * @param {String} camel
 * @param {String} value
 * @return {Boolean}
 */
function canSetProperty(prop, camel, value) {
    const support = camel in el.style;
    if (value === 'inherit') {
        return support;
    }
    el.style.cssText = prop + ':' + value;
    return support && el.style[camel] !== '';
}

/*
 * Detect support for CSS properties and
 * their assignable values
 *
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */
export default function isStyleSupported(prop, value) {
    value = arguments.length === 2 ? value : 'inherit';
    let support = checkNativeSupport(prop, value);
    if (support) {
        return true;
    }
    let camel = toCamelCase(prop);
    const capitalized = camel.charAt(0).toUpperCase() + camel.slice(1);
    support = canSetProperty(prop, camel, value);
    let length = prefixes.length;
    while (!support && length--) {
        const prefixed = '-' + prefixes[length].toLowerCase() + '-' + prop;
        support = checkNativeSupport(prefixed, value);
        if (!support) {
            camel = prefixes[length] + capitalized;
            support = canSetProperty(prefixed, camel, value);
        }
    }
    return support;
}
