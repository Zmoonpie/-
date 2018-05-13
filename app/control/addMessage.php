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
$wzID=$data->wzID;
$message=$data->message ;
$time=date('y-m-d h:i:s',time());
$name=$data->name;

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $sql=mysql_query("insert into message (id,wzID,message,name,time) VALUES ( '$id' ,'$wzID','$message','$name','$time')") or die('新增失败'.mysql_error());
    echo mysql_affected_rows();
    mysql_close();
}