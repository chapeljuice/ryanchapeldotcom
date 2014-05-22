// ------------------- //
// scripts for         //
// ryan chapel dot com //
// ------------------- //

( function () {

	'use strict';

	var rcdc = {

		// variables to be used later
		yPosition: '',
		browserWidth: ''


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

})();