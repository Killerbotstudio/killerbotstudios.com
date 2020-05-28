<?php

$dbservername = "localhost";
$dbusername = "siggy_unity";
$dbpassword = "Q0DURoUkkntl";
$dbname = "siggy_docedb";

//$con = mysqli_connect($dbservername, $dbusername, $dbpassword, $dbname);
$con = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);


//check that connection happened
if(mysqli_connect_errno())
{
   echo "1: Connection failed" . myqli_connect_error(); //error code #1 : connection failed
   exit();
}

$username = $_POST["name"];
$password = $_POST["password"];


//check if name exists

$namecheckquery = "SELECT Users, Password FROM DOCEPlayers WHERE Users='".$username."';";
$namecheck = mysqli_query($con, $namecheckquery) or die ("2: Name check query failed"); //error code #2 : name check query failed

if(mysqli_num_rows($namecheck) != 1)
{
    echo "5: There's no users with that ID"; // error code #5 : number of names matching != 1;
    exit();
}

// get login info from query
$existinginfo = mysqli_fetch_assoc($namecheck);

//$salt = $existinginfo["salt"];
//$hash = $existinginfo["hash"];
//$loginhash = crypt($password, $salt);

$userpassword = $existinginfo["Password"];
//if($hash != $loginhash)
if($userpassword != $password)
{
  echo "6: Incorrect password"; //error code #6 : password does not hash to match table
  exit();
}
echo "0"; // no errors

?>
