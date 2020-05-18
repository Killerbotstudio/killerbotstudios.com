<?php

$servername = "";
$server_username = "root";
$server_password = "1234";
$dbName = "database";


$username = $_POST["usernamePost"];//"default";
$email = $_POST["emailPost"];//"default";
$password = $_POST["passwordPost"];//"default";

//Make connection

$conn = new mysqli($servername,$server_username,$server_password,$dbName);
//Check connection
if(!$conn){
  die("Connection Faield. ".mysqli_connect_error());
}
else echo ("Connection Success");



$sql = "INSERT INTO usersTable (username,email,password)
VALUES('".$username."','".$email."','".$password."')";

if(!result) echo"there was an error";
else echo "Everything ok.";



 ?>
