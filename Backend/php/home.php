<?php
include("database.php");
include("headers.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getproductdata') {
        $category = $_POST['category'];
        if ($category == "all") {
            // =============================select all product and it is available ===================================
            $result = $conn->query("");
            // =======================================================================================================
        } else {
            // =============================select products by category and it is available========================
            $result = $conn->query("");
            // =======================================================================================================
        }
        if ($result->num_rows > 0) {
            $msg = 'success';
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
        }
        $conn->close();
        echo json_encode(array('msg' => $msg, 'data' => $row));
    }
}
else if ($_SERVER['REQUEST_METHOD'] == "GET") {
    $req = $_GET['request'];
    if ($req == 'getproductcategories') {
        // =================================get categories (hint: group by products.Category)=====================
        $result = $conn->query("");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            $msg = 'success';
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result['Category'];
            }
        }
        echo json_encode(array('msg' => 'success', 'categories' => $row));
    }
}
