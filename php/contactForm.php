<?php 

if (isset($_POST['submit'])){
    $name = $_POST['Fisrt name'];
    $name = $_POST['Last name'];
    $mailFrom = $_POST['mail'];
    $message = $_POST['Message'];
    $question = $_POST['Question'];

    $mailTo = "chuli";
    $headers = "From: ". $mailFrom;
    $txt = "You have recieved an e-mail from". $name. "\n\n". $message;
    $qst = "You have recieved an e-mail from". $name. "\n\n". $question;

    mail( $mailTo, $txt , $qst,  $headers);
    header("Loaction: index.php?mailsend");
    header("Location: contactForm.php?status=success");
    
    
}
$content="From: $name";
$recipient = "dan@example.com";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
echo "<p style=' color: green; text-align: center;'>Message Sent!</p>";