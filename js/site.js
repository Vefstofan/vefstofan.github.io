$(function() {

	function menuState(){

		$menu = $(".menu");

		$(".section").each(function(){
			var section = $(this).attr("class").split(" ");
			if (isOnElement($(this), ".menu")) {
				console.log(section[1]);
				$menu.alterClass("inview__*");
				$menu.addClass("inview__" + section[1]);
			}
		});

	}


	$(window).on("scroll", function() {

		menuState();

	});

	// Helpers

	$.fn.alterClass = function ( removals, additions ) {
		
		var self = this;
		
		if ( removals.indexOf( '*' ) === -1 ) {
			// Use native jQuery methods if there is no wildcard matching
			self.removeClass( removals );
			return !additions ? self : self.addClass( additions );
		}

		var patt = new RegExp( '\\s' + 
				removals.
					replace( /\*/g, '[A-Za-z0-9-_]+' ).
					split( ' ' ).
					join( '\\s|\\s' ) + 
				'\\s', 'g' );

		self.each( function ( i, it ) {
			var cn = ' ' + it.className + ' ';
			while ( patt.test( cn ) ) {
				cn = cn.replace( patt, ' ' );
			}
			it.className = $.trim( cn );
		});

		return !additions ? self : self.addClass( additions );
	};

});

function isOnElement(elm, targ) {
    $elm = $(elm);
    $targ = $(targ);
    var target = {};
    target.top = $targ.offset().top + ($targ.height()/2);
    var bounds = {};
    bounds.top = $elm.offset().top;
    bounds.bottom = bounds.top + $elm.outerHeight();
    return ((bounds.top <= target.top) && (bounds.bottom >= target.top));
};
