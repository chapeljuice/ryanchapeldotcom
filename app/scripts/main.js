// ------------------- //
// scripts for         //
// ryan chapel dot com //
// ------------------- //

( function () {

	'use strict';

	$( document ).scroll( function () {
			
		// set a couple variables to be used later
		var yPosition = $( this ).scrollTop();
		var browserWidth = window.getComputedStyle( document.querySelector( 'body' ), ':after' ).getPropertyValue( 'content' );

		// do the following only when the browser size is 'large'
		if ( browserWidth !== 'large' ) {

			// add the 'scrolled' class to the header when user scrolls
			if ( yPosition > 0 ) {
				$( 'header' )
					.addClass( 'scrolled' );
			} else {
				$( 'header' )
					.removeClass( 'scrolled' );
			}
		}

	});

})();