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
        testAssertions(function(){
            expect(isStyleSupported('background')).to.equal(true);
            expect(isStyleSupported('border')).to.equal(true);
            expect(isStyleSupported('display')).to.equal(true);
            expect(isStyleSupported('font-size')).to.equal(true);
            expect(isStyleSupported('margin')).to.equal(true);
            expect(isStyleSupported('padding')).to.equal(true);
        });
    });

    it('should return false for unsupported properties', function(){
        testAssertions(function(){
            expect(isStyleSupported('foo')).to.equal(false);
            expect(isStyleSupported('bar')).to.equal(false);
            expect(isStyleSupported('foo-bar')).to.equal(false);
        });
    });

    it('should return true for supported properties and values', function(){
        testAssertions(function(){
            expect(isStyleSupported('display', 'block')).to.equal(true);
            expect(isStyleSupported('display', 'inline')).to.equal(true);
            expect(isStyleSupported('margin', '5px')).to.equal(true);
            expect(isStyleSupported('padding', '5em')).to.equal(true);
        });
    });

    it('should return false for unsupported properties and values', function(){
        testAssertions(function(){
            expect(isStyleSupported('display', 'foo')).to.equal(false);
            expect(isStyleSupported('font-size', 'bar')).to.equal(false);
            expect(isStyleSupported('margin', '5foo')).to.equal(false);
            expect(isStyleSupported('padding', '3bar')).to.equal(false);
        });
    });

});