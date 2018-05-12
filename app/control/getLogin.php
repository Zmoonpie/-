<?php
header('Access-Control-Allow-Origin:*');  
header('Content-Type: application/json');
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');  
header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');  
header('Access-Control-Max-Age: 315360000');
require_once './config.php';
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $sql=mysql_query("select username,id from user WHERE isLogin=1")or die('sql错误');
    $data = array();
    while ($row = mysql_fetch_array($sql)) {
        $data[] = $row;
    }
    echo json_encode($data);
    mysql_close();
}


 





?>