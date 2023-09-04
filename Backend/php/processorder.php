<?php
include("database.php");
include("headers.php");
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getorderno') {
        // =====================select Orders.Finished, order_list.OrderID and the result will be group by order_list.OrderID===
        $result = $conn->query("");
        // =====================================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'processfinishorder') {
        $orderId = $_POST['orderno'];
        // ===================get Orders by order id==============================================================
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
    if ($req == 'processorder') {
        $orderno = $_POST['orderno'];
        // =======================================================================================================
        $result = $conn->query("SELECT DATE_FORMAT(Orders.Date, '%Y %m %d') as Date, Orders.Price as Order_Price, order_list.ProductID, Products.Name, Products.Description, Products.ImageURL, Products.Price FROM Orders, order_list, Products WHERE order_list.OrderID='$orderno' AND Orders.ID=order_list.OrderID AND order_list.ProductID=Products.ID GROUP by order_list.ProductID");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'updateorder') {
        $orderId = $_POST['orderno'];
        // ===========update Orders's Finished to True by order id================================================
        $conn->query("");
        // =======================================================================================================
    }
    if ($req == 'updateprofit') {
        $userId = $_POST['userno'];
        $profit = $_POST['profit'];
        // ===========update Seller's Profit by user id ==========================================================
        $conn->query("");
        // =======================================================================================================
    }
    if ($req == 'getsalesamount') {
        $orderId = $_POST['orderno'];
        // =====================get order_list's ProductID and Amount by orderId, and result will be group by ProductID=
        $result = $conn->query("");
        // =============================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'updatesalesamount') {
        $productID = $_POST['productID'];
        $amount = $_POST['amount'];
        // ===========update Products's Sales_volume and Inventory by product id==================================
        $conn->query("");
        // =======================================================================================================
        
        // ===========update Products's Available to Fasle, if Inventory == 0 ===================================
        $conn->query("");
        // =======================================================================================================
    }
}
