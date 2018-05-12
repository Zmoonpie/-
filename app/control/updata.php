<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');
header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');
header('Access-Control-Max-Age: 315360000');
require_once './config.php';
  $imgname = $_FILES['file']['name'];
    $tmp = $_FILES['file']['tmp_name'];
    $filepath = 'photo/';
    if(move_uploaded_file($tmp,$filepath.$imgname.".png")){
        echo ("http://127.0.0.1/testdemo/app/control/".$filepath."/".$imgname);
    }else{
        echo "上传失败";
    }