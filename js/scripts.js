///////////////
//  rcdc js  //
///////////////

(function () {

  'use-strict';

  // easy jquery-esque selectors
  var $ = function( el ) {
    return document.querySelectorAll( el )[0];
  };

  var rcdc = {

    // --- variables --- //

    // store the lastFM data in an easy to access variable
    lastFMData: '',

    // set/store scroll position
    scrollPosition: 0,
    ticking: false,

    // --- functions --- //

    getLastFMData: function () {

      // create new XHR request
      var xhrF = new XMLHttpRequest(),

        // url of the data
        url = '//ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=chapeljuice&period=1month&limit=6&api_key=8ce7719aeb6e33d3e8311dca1301bf78&format=json';

      // check the ready state
      xhrF.onreadystatechange = function () {
        if ( xhrF.readyState == 4 ) {

          // check the status of the results response
          if ( ( xhrF.status >= 200 && xhrF.status < 300 ) || xhrF.status == 304 ) {

            // parse the response
            rcdc.lastFMData = JSON.parse( xhrF.responseText );

            // temp variables for creating the album list items
            var createAlbumListItem = [];
            var createAlbumListItemAnchor = [];

            // for every album in the response...
            for ( var i = 0; i < rcdc.lastFMData.topalbums.album.length; i++ ) {

              // ...create the album anchor element
              createAlbumListItemAnchor[i] = document.createElement( 'a' );
              createAlbumListItemAnchor[i].href = rcdc.lastFMData.topalbums.album[i].url;
              createAlbumListItemAnchor[i].setAttribute( 'target', '_blank' );
              createAlbumListItemAnchor[i].innerHTML = '<span class="album-name">' + rcdc.lastFMData.topalbums.album[i].name + '</span> by <span class="artist-name">' + rcdc.lastFMData.topalbums.album[i].artist.name + '</span>';

              // ...create the parent list item element
              createAlbumListItem[i] = document.createElement( 'li' );
              createAlbumListItem[i].id = 'album-' + ( i + 1 );

              // ...then insert that parent list into the DOM
              $( '.lastfm-album-list' ).appendChild( createAlbumListItem[i] );

              // ...then finally insert the anchor tags into the list item
              document.getElementById( 'album-' + ( i + 1 ) ).appendChild( createAlbumListItemAnchor[i] );

            }

            $( '.music' ).classList.remove( 'hide' );

          }

        }
      };

      // prepare the request to get the list results
      xhrF.open( 'get', url, true);
      xhrF.send( null );

    },

    // class tester
    hasClass: function ( element, cls ) {
      return ( ' ' + element.className + ' ' ).indexOf( ' ' + cls + ' ' ) > -1;
    },

    // when the user scrolls, do this stuff
    onScroll: function () {

      rcdc.ticking = false;

      rcdc.scrollPosition = window.scrollY;


      if ( rcdc.scrollPosition > 0 ) {
        // show the top link
        $( '.back-to-top' ).classList.remove( 'hide' );
        $( '.back-to-top' ).classList.add( 'show' );
      } else {
        // hide the top link
        $( '.back-to-top' ).classList.add( 'hide' );
        $( '.back-to-top' ).classList.remove( 'show' );
      }

      if ( matchMedia( '(min-width: 1000px)' ).matches ) {

        if ( rcdc.scrollPosition > 0 ) {
          // show menu icon
          $( '.menu' ).classList.remove( 'hide' );
          $( '.menu' ).classList.add( 'show' );
          // hide menu
          $( '.main-menu' ).classList.add( 'hide' );
          $( '.main-menu' ).classList.remove( 'show' );
        } else {
          // hide menu icon
          $( '.menu' ).classList.add( 'hide' );
          $( '.menu' ).classList.remove( 'show' );
          // show menu
          $( '.main-menu' ).classList.remove( 'hide' );
          $( '.main-menu' ).classList.add( 'show' );
        }

      }

      rcdc.requestTick();
    },

    // helper function for better performance with requestAnimationFrame()
    requestTick: function () {

      if( !rcdc.ticking ) {
        requestAnimationFrame( rcdc.onScroll );
      }
      rcdc.ticking = true;
    },

    // toggle the menu open / closed
    toggleMenu: function () {
      if ( rcdc.hasClass( $( 'body' ), 'open-menu' ) ) {
        $( 'body' ).classList.remove( 'open-menu' );
        $( '.tiny' ).classList.remove( 'vanish' );
      } else {
        $( 'body' ).classList.add( 'open-menu' );
        $( '.tiny' ).classList.add( 'vanish' );
      }
    },

    // init function
    init: function () {

      // make LastFM call
      rcdc.getLastFMData();

      // listen to user scrolling and call the onScroll function
      window.addEventListener( 'scroll', rcdc.onScroll, false );

      // --- events --- //

      // make menu open / close
      $( '.menu-icon' ).addEventListener( 'click', rcdc.toggleMenu, false );

      // close the menu when the user clicks on a menu item
      window.onhashchange = rcdc.toggleMenu;

      // scroll to the top
      $( '.back-to-top' ).addEventListener( 'click', function () {
        window.scroll( 0, 0 );
      }, false );

    }

  };


  // --- function calls --- //

  // start everything off
  window.addEventListener( 'load', rcdc.init );

})();