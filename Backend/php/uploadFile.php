<?php
include("headers.php");
# 檢查檔案是否上傳成功
if ($_FILES['image']['error'] === UPLOAD_ERR_OK){
//   echo '檔案名稱: ' . $_FILES['image']['name'] . '<br/>';
//   echo '檔案類型: ' . $_FILES['image']['type'] . '<br/>';
//   echo '檔案大小: ' . ($_FILES['image']['size'] / 1024) . ' KB<br/>';
//   echo '暫存名稱: ' . $_FILES['image']['tmp_name'] . '<br/>';
//   printf("uniqid(): %s\r\n", uniqid());
  # 檢查檔案是否已經存在
  if (file_exists('../img/' . $_FILES['image']['name'])){
    // echo '檔案已存在。<br/>';
  } else {
    $file = $_FILES['image']['tmp_name'];
    $uuid = uniqid();
    $dest = '../img/' .$uuid . $_FILES['image']['name'];

    $response = array('message'=> '', 'success' => true, 'imageLink' => './img/'.$uuid . $_FILES['image']['name']);
    # 將檔案移至指定位置
    move_uploaded_file($file, $dest);
    echo json_encode($response);

  }
} else {
//   echo '錯誤代碼：' . $_FILES['image']['error'] . '<br/>';

    $response = array('message'=> '錯誤代碼：'.$_FILES['image']['error'], 'success' => false, 'fileName' => null);
    echo json_encode($response);
}
?>