<?php
header('Access-Control-Allow-Origin:*');
header('Content-Type: application/json');
header('Access-Control-Request-Method: *');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, PATCH');
header('Access-Control-Allow-Headers:X-Requested-With, content-type, Authorization');
header('Access-Control-Max-Age: 315360000');
require_once './config.php';
$id=$_GET['id'];
$yonghu=$_GET['yonghu'];
$xitong=$_GET['xitong'];

if($_SERVER['REQUEST_METHOD'] == "GET"){
 if($id==1){
         $sql1=mysql_query("select id from user WHERE operation=1")or die('sql错误');
          $data1 = array();
             while ($row1 = mysql_fetch_array($sql1)) {
                 $data1[] = $row1;
             }
        $id=($data1[0]['id']);
        }

    $flag=true;
    $search=mysql_query("select yonghu from reply WHERE yonghu='$yonghu' and parentId='$id'");
    if(mysql_affected_rows()>0){
     $sql=mysql_query("update reply set xitong='$xitong'  WHERE yonghu='$yonghu' and parentId='$id'") or die('编辑失败'.mysql_error());
    }else{
    $sql=mysql_query("insert into reply (yonghu,xitong,parentId,count) VALUES ( '$yonghu' ,'$xitong','$id',0)") or die('新增失败'.mysql_error());
    }
    if(mysql_error()){
    $flag=false;
    }

    $result=array(
    'returnValue'=>mysql_affected_rows(),
    'errorMessage'=>mysql_error(),
    'flag'=>$flag
    );
    echo json_encode($result);
    mysql_close();
}