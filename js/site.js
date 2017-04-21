$(function() {

	// Form

	$(".form .form__input input, .form .form__input textarea").on("change, keyup", function(){
		formChange();
	});

	function formChange() {
		var c = 0;
		$fields = $(".form .form__input input, .form .form__input textarea");
		$fields.each(function(){
			if ($(this).val()) {
				c++;
			}
		});
		var prog_num = Math.round(c / $fields.length * 10).toFixed(1) * 10;
		$(".form .form__action .form__progress span").text(prog_num + "% done");
		$(".form .form__action .form__progress").css("width", prog_num + "%");
		if (c != 0) {
			$(".form").addClass("form--on");
		} else {
			$(".form").removeClass("form--on");
		}
		if (c == $fields.length) {
			$(".form").addClass("form--done");
		} else {
			$(".form").removeClass("form--done");
		}
		
	}

	$("form.form").on("submit", function(event){
		$.ajax({
		    url: "https://formspree.io/hello@sigur.io", 
		    method: "POST",
		    headers: {"Accept": "application/json"},
		    data: {
		    	name: $("#form-name").val(),
		    	organization: $("#form-organization").val(),
		    	title: $("#form-title").val(),
		    	email: $("#form-email").val(),
		    	statement: $("#form-statement").val(),
		    	deadline: $("#form-date").val(),
		    	budget: $("#form-name").val()
		    },
		    dataType: "json"
		}).done(function(data){
			$("body").addClass("form--sent");
		});
		event.preventDefault();
		return false;
	});

	$(".form .form__input input").on("invalid", function(event){
		$(event.target).focus();
		return false;
	});

	// Menu button

	$(".menu .menu__button").on("click", function(event){
		$(".menu-list").toggleClass("menu-list--on");
		event.preventDefault();
	});

	// Menu state

	function menuState(){

		$menu = $(".menu");

		$(".section").each(function(){
			var section = $(this).attr("class").split(" ");
			if (isOnElement($(this), ".menu")) {
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
