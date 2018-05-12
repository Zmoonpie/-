<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');
header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');
header('Access-Control-Max-Age: 315360000');
require_once './config.php';
$xmldata=$GLOBALS['HTTP_RAW_POST_DATA'];
$data=json_decode($xmldata);
$id=$data->id;
$title=$data->title ;
$content=$data->content ;


if($_SERVER['REQUEST_METHOD'] == "POST"){
    $sql=mysql_query("update wenzhang set title='$title',content='$content' WHERE id='$id'") or die('编辑失败'.mysql_error());
    echo mysql_affected_rows();
    mysql_close();
}