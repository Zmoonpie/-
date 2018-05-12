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
$pageView=$data->pageView;

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $sql=mysql_query("insert into wenzhang (title,content,date,parentId,pageView) VALUES ( '$title' ,'$content',NOW(),'$id','$pageView')") or die('新增失败'.mysql_error());
    echo mysql_affected_rows();
    mysql_close();
}