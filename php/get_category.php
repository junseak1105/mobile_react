
<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

$table = $_GET["table"];
$co_code = $_GET["co_code"];


$arr = array();
$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$data = $obj['data'];

$sql = "SELECT favor_ca_code as id, favor_ca_name as name FROM $table where co_code = '$co_code' order by favor_ca_name";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}

$responseJson = json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
echo $responseJson;
?>