<?php //echo "hola";die;
$servername = "10.0.10.18";
$database = "ciram_ciram";
$username = "ciram_test";
$pass = "test2024";
$port="3306";
// Create connection
$conn = mysqli_connect($servername, $username, $pass, $database, $port);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
//mysqli_close($conn);
?>