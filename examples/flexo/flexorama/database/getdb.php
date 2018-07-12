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

// $sql = "
//     INSERT INTO plots (positionX, positionY, owner, color) 
//     VALUES ('0', '666', 'Kenny', 'Black');
// ";

// 

// $result = mysqli_query($conn, $sql);

$sql = "SELECT * FROM plots;";
$result = mysqli_query($conn, $sql);
$resultCheck = mysqli_num_rows($result);

if($resultCheck > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        echo $row['owner']."<br>";
    }
} else {
    echo "No results";
}


/*
$sql = "SELECT positionX, positionY, owner, color FROM plots";
if(mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)) {
		echo(
			"Position X:".$row['positionX'].
			"Position Y:".$row['positionY'].
			"Owner:".$row['owner'].
			"Color:".$row['color']
		);
	}
} else {
	echo("<br>mysqli_num_rows($result) =< 0");
}
*/

?>
