<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');
//include('db.php');
$host="jhk.n-e.kr"; //자신이 사용하는 호스트 ip로 입력해도됌
$user="dsu_mobile_prj";      
$pass="mobile_prj_jhk";       
$dbname= "mobile_classprj"; //자신이 지금 사용하는 dbname 모르면 show databases; 확인
$dbport="3306";

// $table = $_GET["table"];
// $co_code = $_GET["co_code"];
$userID = $_GET["userID"];

$conn=mysqli_connect($host,$user,$pass,$dbname,$dbport);
$arr = array();
$json = file_get_contents('php://input');

$obj = json_decode($json, true);
$data = $obj['data'];
// $userID='test1';
$userID='test10';
// $userID='test100';

$sql = "SELECT classtime FROM timetable where member_userID = '$userID'";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}

//$responseJson = json_encode($arr,JSON_UNESCAPED_SLASHES);
echo str_replace('\\', '', json_encode(array('results' => $arr),JSON_UNESCAPED_SLASHES+JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE));
//echo $responseJson;
?>