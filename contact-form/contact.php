<?php
/**
 * CONFIGURE ERRTAAANG HERE
 */

 // an email that will be in the "From" field of the email
 $from = 'Demo contact form <demo@domain.com>';

 // an email that will recive the email with the output of the form
 $sendTo = 'Demo contact form <demo@domain.com>';

 //subject of the email we are reciving
 $subject 'New message from contact form';

 // form names and their respective translations
 // array variable name => Text to appear in the mail!
 $fields = array(
                'name' => 'Name', 
                'surname' => 'Surname',
                'phone' => 'Phone',
                'email' => 'Email'
                'message' => 'Message'
 );

 //message displaying that everything is okey and sound!
 $okMessage = 'Thank you for submitting! We will probably never reply since this is a test';

 //Error message if something goes wrong
 $errorMessage = 'ERRRRRRRRR, something went wrong my guy... Pls try again l8r h8r ;)'

 //turning off debugging since this is a exam and i had to learn PHP myself.... MIKE!
 error_reporting(E_ALL & ~ E_NOTICE);

 /*
  * La oss gjøre litt sånn sending a! aka lets do the sending 
  */
  try
  {

      if count($_POST) == 0) throw new \Exception('Form is empty');
      $emailText = "You have a new message from your contact form \n============\n";

      foreach ($_POST as $key => $value) {
          //if the field exsists in the $fields array, include it in the mail :)
          if(isset($fields[$key])){
              $emailText .= "$fields[$key]: $value\n";
          }
      }

      //All of the neccessary headers for the mail yuhhh
      $headers = array('Content-Type: text/plain; charset="UTF-8";',
                        'From ' .$from,
                        'Reply-To: ' .$from,
                        'Return-Path: ' .$from
    );

    //Send the mail!
    mail($sendTo, $subject, $emailText, implode("\n", $headers));
    $reponseArray = array('type' => 'success', 'message' => $okMessage);
    
  }
  catch (\Exception $e)
  {
      $reponseArray = array('type' => 'danger', 'message' => $errorMessage);
  }

  // if requested by the AJAX request, this retuns a JSON respone
  if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
}

//else: just display the message
else {
    echo $responseArray['message'];
}