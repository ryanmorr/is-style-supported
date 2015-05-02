describe('isStyleSupported', function(){
    'use strict';

    var expect = chai.expect, 
    hasStandardSupports =  'CSS' in window && 'supports' in window.CSS,
    hasOperaSupports = 'supportsCSS' in window,
    hasNativeSupports = hasStandardSupports || hasOperaSupports;

    function testAssertions(assertions){
        assertions();
        if(hasNativeSupports){
            if(hasStandardSupports){
                var ref = window.CSS.supports; 
                window.CSS.supports = undefined;
            }else if(hasOperaSupports){
                var ref = window.supportsCSS;
                window.supportsCSS = undefined;
            }
            assertions();
            if(hasStandardSupports){
                window.CSS.supports = ref; 
            }else if(hasOperaSupports){
                window.supportsCSS = ref;
            }
        }
    }

    it('should return true for supported properties', function(){
        var props = [
            'background',
            'border',
            'display',
            'font-size',
            'margin',
            'padding'
        ];
        testAssertions(function(){
            props.forEach(function(prop){
                expect(isStyleSupported(prop)).to.equal(true);
            });
        });
    });

    it('should return false for unsupported properties', function(){
        var props = [
            'foo',
            'bar',
            'foo-bar'
        ];
        testAssertions(function(){
            props.forEach(function(prop){
                expect(isStyleSupported(prop)).to.equal(false);
            });
        });
    });

    it('should return true for supported properties and values', function(){
        var styles = [
            'display: block',
            'display: inline',
            'margin: 5px',
            'padding: 5em'
        ];
        testAssertions(function(){
            styles.forEach(function(style){
                var parts = style.split(/\s*:\s*/), prop = parts[0], value = parts[1];
                expect(isStyleSupported(prop, value)).to.equal(true);
            });
        });
    });

    it('should return false for unsupported properties and values', function(){
        var styles = [
            'display: foo',
            'font-size: bar',
            'margin: 5foo',
            'padding: 3bar'
        ];
        testAssertions(function(){
            styles.forEach(function(style){
                var parts = style.split(/\s*:\s*/), prop = parts[0], value = parts[1];
                expect(isStyleSupported(prop, value)).to.equal(false);
            });
        });
    });

});