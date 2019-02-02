import isStyleSupported from '../src/is-style-supported';

describe('isStyleSupported', () => {
    const hasNativeSupports = 'CSS' in window && 'supports' in window.CSS;

    function testAssertions(assertions) {
        let ref;
        if (hasNativeSupports) {
            ref = window.CSS.supports;
            window.CSS.supports = undefined;
        }
        assertions();
        if (hasNativeSupports) {
            window.CSS.supports = ref;
        }
    }

    it('should return true for supported properties', () => {
        const props = [
            'background',
            'border',
            'display',
            'font-size',
            'margin',
            'padding'
        ];
        testAssertions(() => {
            props.forEach((prop) => {
                expect(isStyleSupported(prop)).to.equal(true);
            });
        });
    });

    it('should return false for unsupported properties', () => {
        const props = [
            'foo',
            'bar',
            'foo-bar'
        ];
        testAssertions(() => {
            props.forEach((prop) => {
                expect(isStyleSupported(prop)).to.equal(false);
            });
        });
    });

    it('should return true for supported properties and values', () => {
        const styles = [
            'display: block',
            'display: inline',
            'margin: 5px',
            'padding: 5em'
        ];
        testAssertions(() => {
            styles.forEach((style) => {
                const parts = style.split(/\s*:\s*/);
                const prop = parts[0];
                const value = parts[1];
                expect(isStyleSupported(prop, value)).to.equal(true);
            });
        });
    });

    it('should return false for unsupported properties and values', () => {
        const styles = [
            'display: foo',
            'font-size: bar',
            'margin: 5foo',
            'padding: 3bar'
        ];
        testAssertions(() => {
            styles.forEach((style) => {
                const parts = style.split(/\s*:\s*/);
                const prop = parts[0];
                const value = parts[1];
                expect(isStyleSupported(prop, value)).to.equal(false);
            });
        });
    });
});
