<?php
include("database.php");
include("headers.php");
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getcoupon') {
        $userno = $_POST['userno'];
        // ======================get coupon by BuyerID and it is not used ========================================
        $result = $conn->query("");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == "purchaseshoppingcart") {
        $userno = $_POST['userno'];
        $total = $_POST['total'];
        $couponid = $_POST['couponid'];
        $row = json_decode($_POST['productIDs'], true); // 購物車資料由前端傳入
        date_default_timezone_set('Asia/Taipei');
        $date = date('Y-m-d');
        if ($couponid == "") {
            // =====================insert a new record into Orders (hint: couponid's value is NULL)===================================================
            $result = $conn->query("");
            // ========================================================================================================================================
        } else {
            // ====================insert a new record into Orders=====================================================================================
            $result = $conn->query("");
            // ========================================================================================================================================
        }
        // 找出 Orders 中最大的 ID ===========
        $orderno = $conn->query("SELECT ID FROM Orders WHERE ID=(SELECT MAX(CAST(ID as SIGNED)) FROM Orders)")->fetch_assoc()['ID'];
        for ($i = 0; $i < count($row); $i++) {
            $productID = $row[$i]['id'];// 購物車資料由前端傳入quantity
            $quantity = $row[$i]['quantity'];
            // ======================insert a new record into order_list (hint: use $orderno、$productID、$quantity)=================================================================================
            $rowitem = $conn->query("");
            // =======================================================================================================
        }
        echo json_encode(array("result" => $_POST['productIDs']));
        $conn->close();
    }
    if ($req == "updatecoupon") { // not use
        $couponid = $_POST['couponid'];
        // =====================i forget use in front=============================================================
        $result = $conn->query("UPDATE Coupon SET Used=1 WHERE ID='$couponid'");
        // =======================================================================================================
        while (($row_result = $result->fetch_assoc()) !== null) {
            $row[] = $row_result;
        }
        echo json_encode(array("amount" => $row[0]["Amount"]));
        $conn->close();
    }
}
