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
$message=$data->message ;

if($_SERVER['REQUEST_METHOD'] == "POST"){
 if($id==1){
         $sql1=mysql_query("select id from user WHERE operation=1")or die('sql错误');
          $data1 = array();
             while ($row1 = mysql_fetch_array($sql1)) {
                 $data1[] = $row1;
             }
        $id=($data1[0]['id']);
        }
    $sql=mysql_query("insert into tsMessage (parentID,message,date) VALUES ( '$id' ,'$message',NOW())") or die('新增失败'.mysql_error());
    echo mysql_affected_rows();
    mysql_close();
}