/*!
 * jQuery FinderBox Plugin 1.0.0
 * https://github.com/stefanocudini/jquery-finderbox
 *
 * Copyright 2012, Stefano Cudini - stefano.cudini@gmail.com
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function($) {
    $.fn.extend({
        finderbox: function(options) {	//plugin name
 
            var defaults = {
            	container: $(this).next(),	//element/selector within which to seek
            	child: '.finderbox-box',	//element searched
            	//childExclude: '.finderbox-exc',	//TODO ever excluded elements
            	childKey: '.finderbox-key',	//element for key search into element searched
            	initial: true,	//search initial text or inside text
                searchText: 'Search...',	//text into search box
                hideClass: 'finderbox-hide',	//class applied to non matched elements
                timeReset: 400	//resetting time after finderbox input blur
            };
            var options = $.extend(defaults, options);
         
            return this.each(function() {
            
                var targetFind$ = $( options.container ),
                	tf;//timer

				$(this)
				.on('keyup', function(e) {
				
					if(e.keyCode==27)//esc
						$(this).blur();

					var t = $(this).val();

					if(t.length<1)
						targetFind$.children(options.child+'.'+options.hideClass).removeClass(options.hideClass);
						//$(this).trigger('blur');
					else
					{
						var regFilter = new RegExp("^[.]$|[|]",'g'),//remove | 
							t = t.replace(regFilter,' '),	//sanitize t value
							I = options.initial ? '^' : '',
							reg = new RegExp(I + t,'i');
						
						targetFind$.find(options.childKey).map(function() {
							
							return reg.test( $(this).text() ) ? false : this;

						})
						.parent(options.child).addClass(options.hideClass);
					}
					$(this).prev('em').text( targetFind$.children(options.child).not('.'+options.hideClass).length );
				})
				.on('blur', function() {
					
					tf = setTimeout(function() {
						
						targetFind$.children(options.child+'.'+options.hideClass).removeClass(options.hideClass);
						
						$(this).prev('em').text( targetFind$.children(options.child).length );
						
					}, options.timeReset);
					
					$(this).val(options.searchText);
				})
				.on('click',function() {
				
					$(this).val('').focus();
				})
				.val(options.searchText);
				//TODO USE ATTRIBUTE PLACEHOLDER OF HTML5
            });
        }
    });
})(jQuery);

