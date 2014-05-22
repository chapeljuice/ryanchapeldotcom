// ------------------- //
// form scripts for    //
// ryan chapel dot com //
// ------------------- //
( function () {

	'use strict';

	$( 'document' ).ready( function () {

		$( '.radio.one input' ).on( 'change', function () {

			$( this )
				.next( 'label' )
				.children( 'i' )
				.toggleClass( 'fa-check fa-square-o' )
				.parent()
				.siblings( 'label' )
				.children( 'i' )
				.toggleClass( 'fa-check fa-square-o' );

		});

		$( '.radio.two input' ).on( 'change', function () {

			$( this )
				.next( 'label' )
				.children( 'i' )
				.toggleClass( 'fa-check-square fa-square-o' );

		});

	});

})();