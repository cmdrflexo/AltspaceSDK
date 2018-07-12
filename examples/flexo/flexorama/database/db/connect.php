<?php

$serverName = "localhost";
$userName = "id6453412_flexo";
$password = "HaveYourWayWithItMyDatabasePlzBeKind";
$dbName = "id6453412_flexorama_plots";

$conn = new mysqli(
    $serverName, 
    $userName, 
    $password, 
    $dbName
) or die("Unable to connect");

?>