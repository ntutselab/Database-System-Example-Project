<?php
include("database.php");
include("headers.php");
session_start();
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'login') {
        $email = $_POST['email'];
        $password = $_POST['password'];
        // =======================================================================================================
        $result = $conn->query("SELECT * FROM Users WHERE Email='$email' AND Password='$password'");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            $msg = 'success';
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            $_SESSION['userno'] = $row[0]["ID"];
            $useId = $_SESSION['userno'];
            // =======================================================================================================
            if ($conn->query("SELECT * FROM seller WHERE id='$useId'")->num_rows > 0) {
            // =======================================================================================================
                $_SESSION['userrole'] = "seller";
            } else {
                $_SESSION['userrole'] = "buyer";
            }
        } else {
            $msg = 'failed';
            $result = null;
        }
        $conn->close();
        echo json_encode(array('msg' => $msg, 'userrole' => $_SESSION['userrole']));
    }
    if ($req == 'checkuserrole') {
        if (isset($_SESSION['userrole'])) {
            echo json_encode(array('userrole' => $_SESSION['userrole']));
        } else {
            echo json_encode(array('userrole' => 'unknown'));
        }
    }
    if ($req == 'logout') {
        if (isset($_SESSION['userrole'])) {
            unset($_SESSION['userrole']);
            unset($_SESSION['userno']);
            echo json_encode(array('msg' => 'success'));
        } else {
            echo json_encode(array('msg' => 'failed'));
        }
    }
    if ($req == 'getuserno') {
        if (isset($_SESSION['userno'])) {
            echo json_encode(array('userno' => $_SESSION['userno']));
        }
    }
    if ($req == 'getwallet') {
        $useId = $_SESSION['userno'];
        // =======================================================================================================
        $result = $conn->query("SELECT Wallet FROM buyer WHERE id='$useId'");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
        }
        $conn->close();
        echo json_encode(array('wallet' => $row[0]["Wallet"]));
    }
    if ($req == 'getprofit') {
        $useId = $_SESSION['userno'];
        // =======================================================================================================
        $result = $conn->query("SELECT Profit FROM seller WHERE id='$useId'");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
        }
        $conn->close();
        echo json_encode(array('profit' => $row[0]["Profit"]));
    }
    if ($req == 'deposit') {
        $useId = $_SESSION['userno'];
        // =======================================================================================================
        $result = $conn->query("SELECT Wallet FROM buyer WHERE id='$useId'");
        // =======================================================================================================
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
        }
        $wallet = $row[0]["Wallet"];
        $value = $_POST['value'];
        $total = $wallet+$value;
        $useId = $_SESSION['userno'];
        // =======================================================================================================
        $result = $conn->query("UPDATE buyer SET Wallet = $total WHERE id='$useId'");
        // =======================================================================================================
        $conn->close();
    }
    if ($req == 'updatewallet') {
        $wallet = $_POST['wallet'];
        $useId = $_SESSION['userno'];
        // =======================================================================================================
        $result = $conn->query("UPDATE buyer SET Wallet = $wallet WHERE id='$useId'");
        // =======================================================================================================
        $conn->close();
    }
}
