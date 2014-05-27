// ------------------- //
// scripts for         //
// ryan chapel dot com //
// ------------------- //

( function () {

	'use strict';

	var rcdc = {

		// variables to be used later
		yPosition: '',
		browserWidth: '',
		timeout: '',

		specialList: function() {
			rcdc.timeout = window.setTimeout( function() {

				// make special-list special
				$( '.special-list li i' )
					.removeClass( 'fa-star-o' )
					.addClass( 'fa-star yes' );

			}, 1000 );
		}

	};

	$( document ).scroll( function () {
			
		// set the scrolled position
		rcdc.yPosition = $( this ).scrollTop();

		// set the browser width
		rcdc.browserWidth = window.getComputedStyle( document.querySelector( 'body' ), ':after' ).getPropertyValue( 'content' );

		// do the following only when the browser size is 'large'
		if ( rcdc.browserWidth !== 'large' ) {

			// add the 'scrolled' class to the header when user scrolls
			if ( rcdc.yPosition > 0 ) {
				$( 'header' )
					.addClass( 'scrolled' );
			} else {
				$( 'header' )
					.removeClass( 'scrolled' );
			}
		}

	});

	$( document ).ready( function () {

		// initialiize all the things
		rcdc.specialList();

	});

})();