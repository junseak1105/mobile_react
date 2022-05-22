<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

// $table = $_GET["table"];
// $co_code = $_GET["co_code"];
$userID = $_GET["userID"];

$arr = array();
$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$data = $obj['data'];

$sql = "SELECT classtime FROM timetable where member_userID = '$userID'";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}

//$responseJson = json_encode($arr,JSON_UNESCAPED_SLASHES);
echo str_replace('\\', '', json_encode(array('results' => $arr),JSON_UNESCAPED_SLASHES+JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE));
//echo $responseJson;
?>