<?php
include("database.php");
include("headers.php");
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'checkOrderRecord') {
        $userno = $_POST['userno'];
        // ====================get all orders by buy buyer id=====================================================
        $orders = $conn->query("");
        // =======================================================================================================
        if ($orders->num_rows > 0) {
            while (($row_result = $orders->fetch_assoc()) !== null) {
                if ($row_result['CouponID'] != NULL) {
                    $couponId = $row_result['CouponID'];
                    // =========get all coupon's amount by coupon id==========================================================
                    $amount = $conn->query("");
                    // =======================================================================================================
                    $amount = $amount->fetch_assoc()['Amount'];
                } else {
                    $amount = 0;
                }
                $row_result["Coupon_Amount"] = $amount;
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'getOrderlist') {
        $orderId = $_POST['orderno'];
        // =======================================================================================================
        $result = $conn->query("SELECT Products.Id, Name, Price, Description, ImageURL, order_list.Amount FROM order_list, Products WHERE order_list.OrderID='$orderId' AND order_list.ProductID=Products.id");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
}
