<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');
header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');
header('Access-Control-Max-Age: 315360000');
require_once './config.php';
$id=$_GET['id'];
if($_SERVER['REQUEST_METHOD'] == "GET"){
    $sql=mysql_query("select * from toupiao WHERE parentId='$id'") or die('新增失败'.mysql_error());
    $data = array();
    while ($row = mysql_fetch_array($sql)) {
        $data[] = $row;
    }
    echo json_encode($data);
    mysql_close();
}