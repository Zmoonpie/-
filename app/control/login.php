<?php
 header('Access-Control-Allow-Origin:*');  
 header('Content-Type: application/json');
 header('Access-Control-Request-Method: *');
 header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');  
 header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');  
 header('Access-Control-Max-Age: 315360000');
require_once "./config.php";

$username = $_GET['username'];
$password = $_GET['password'];
if($_SERVER['REQUEST_METHOD'] == "GET"){
	$query=mysql_query("select username,password from user WHERE username='$username' AND password='$password' ") or die('sql错误'.mysql_error());
	if (mysql_fetch_array($query)) {
		$sql=mysql_query("update user set isLogin=1 WHERE username='$username'");
        $res=array('flag'=>true,'name'=>$username);
        echo json_encode($res);
	}else{
        $res=array('flag'=>false,'errorMessage'=>'密码错误');
		echo json_encode($res);
	}
	mysql_close();
}
?>