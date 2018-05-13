<?php
 
 header('Access-Control-Allow-Origin:*');  
 header('Content-Type: application/json');
 header('Access-Control-Request-Method: *');
 header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');  
 header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');  
 header('Access-Control-Max-Age: 315360000');
require_once "./config.php";
$id = $_GET['id'];
if($_SERVER['REQUEST_METHOD'] == "GET"){
    if($id==1){
    $sql1=mysql_query("update user set operation=0 WHERE operation=1") or die('编辑失败'.mysql_error());
    }
    $sql=mysql_query("update user set isLogin=0 WHERE id='$id'");
    echo mysql_affected_rows();
	mysql_close();
}
?>