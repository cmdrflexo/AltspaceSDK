<?php
    header('Access-Control-Allow-Origin: *');
    
    if(isset($_POST["name"]) === true && empty($_POST["name"]) === false) {
        require "../db/connect.php";

        $sql = "SELECT * FROM plots";// WHERE owner = ".$_POST["name"];

        $query = mysqli_query($conn, $sql);

        while($row = mysqli_fetch_assoc($query)) {
            if($row["owner"] == $_POST["name"])
                echo $row['color'];
        }
    }

    if(isset($_POST["kitten"]) === true && empty($_POST["kitten"]) === false) {
        echo "KITTEN";
    }
?>
