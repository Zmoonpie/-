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
    $countSql=mysql_query("select pageView from wenzhang WHERE id='$id'");
    $row=mysql_fetch_row($countSql);

    $pageView=$row[0]+1;
    $sql=mysql_query("update wenzhang set pageView='$pageView' WHERE id='$id'") or die('编辑失败'.mysql_error());
        echo mysql_affected_rows();
        mysql_close();
}