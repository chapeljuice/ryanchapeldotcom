<?php
    if ( !isset( $_POST['submit'] ) ) {
        // this page should not be accessed directly. you need to submit the form.
        echo 'Nope. You need to submit the form, silly!';
    }

    if ( IsInjected( $from ) ) {
        echo 'Bad email value!';
        exit;
    }

    $to = "chaprtc@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $subject = "RCDC :: " . $firstName . " " . $lastName . " sent you a message!";
    $subject2 = "Copy of your message to ryan chapel dot com";
    $message = "Hey Ryan! \n\n" . $firstName . " " . $lastName . " wrote you the following on ryan chapel dot com:" . "\n\n \"" . $_POST['message'] . "\"";
    $message2 = $firstName . ", Here's a copy of your message: \n\n \"" . $_POST['message'] . "\"";

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender

    header('Location: thanks.html');

    // function to validate against any email injection attempts
    function IsInjected( $str ) {
        $injections = array( '(\n+)',
                      '(\r+)',
                      '(\t+)',
                      '(%0A+)',
                      '(%0D+)',
                      '(%08+)',
                      '(%09+)' );
        $inject = join( '|', $injections );
        $inject = '/$inject/i';

        if( preg_match( $inject, $str ) ) {
            return true;
        } else {
            return false;
        }
    }
?> 