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

    if($id==1){
         $sql1=mysql_query("select id from user WHERE operation=1")or die('sql错误');
          $data1 = array();
             while ($row1 = mysql_fetch_array($sql1)) {
                 $data1[] = $row1;
             }
        $id=($data1[0]['id']);
        }
    $sql=mysql_query("select * from reply WHERE parentId='$id' ORDER BY id DESC");
    $data = array();
    while ($row = mysql_fetch_array($sql)) {
        $data[] = $row;
    }
    echo json_encode($data);
    mysql_close();
}

?>