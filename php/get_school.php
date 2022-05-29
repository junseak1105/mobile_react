
<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

$arr = array();
$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$data = $obj['data'];

$sql = "SELECT school_code as value, school_name as label from school";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_assoc($result_set)) {
    array_push($arr, $result);
}

$responseJson = json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
echo $responseJson;
?>