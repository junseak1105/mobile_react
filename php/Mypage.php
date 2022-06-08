<?php
// $host="jhk.n-e.kr"; //자신이 사용하는 호스트 ip로 입력해도됌
// $user="dsu_mobile_prj";      
// $pass="mobile_prj_jhk";       
// $dbname= "mobile_classprj"; //자신이 지금 사용하는 dbname 모르면 show databases; 확인
// $dbport="3306";

include("db.php");

mysqli_query($conn, "set session character_set_connection=utf8;");
mysqli_query($conn, "set session character_set_results=utf8;");
mysqli_query($conn, "set session character_set_client=utf8;");

$arr = array();
$json = file_get_contents('php://input');

$userID = $_GET["userID"];
$sql = "SELECT * FROM member where userID = '$userID';";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}

$responseJson = json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
echo $responseJson;
?>