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
    echo "1: Connection failed"; //error code #1 : connection failed
    exit();
}

$username = $_POST["name"];
$password = $_POST["password"];

//check if name exists

$namecheckquery = "SELECT Users FROM DOCEPlayers WHERE Users='".$username."';";
$namecheck = mysqli_query($con, $namecheckquery) or die ("3: Name check query failed"); //error code #3 : name check query failed

if(mysqli_num_rows($namecheck)>0){
  echo "3: Name already exists"; //error code #3 : name exists cannot register
  exit();
}

//add user to the table

//encryption beware that method should be call in login aswell
//$salt = "\$5\$rounds=100\$"."diceselector".$username>"\$";
//$hash = crypt($password,$salt);
//$insertuserquery = "INSERT INTO players (username, hash, salt) VALUES ('".$username."','".$salt"');";

$insertuserquery = "INSERT INTO DOCEPlayers (Users,Password) VALUES ('".$username."','".$password."');";
mysqli_query($con, $insertuserquery) or die ("4: Insert player query failed"); //error code #4 : insert query failed


echo("0");


?>