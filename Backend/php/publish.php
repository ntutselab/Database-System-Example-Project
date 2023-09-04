<?php
include("database.php");
include("headers.php");
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'publish') {
        $name = $_POST['name'];
        $price = $_POST['price'];
        $category = $_POST['category'];
        $description = $_POST['description'];
        $inventory = $_POST['inventory'];
        $link = $_POST['link'];
        // ===============insert a new date into Products 
        // (hint: use $price、'0'、$inventory、'$category'、'$name'、'$description'、'$link'、TRUE)===================================================
        if ($conn->query("") === TRUE) {
        // ==========================================================================================================================================================================================
            $msg = 'success';
        } else {
            $msg = 'failed';
        }
        $conn->close();
        echo json_encode(array('msg' => $msg));
    }
}
