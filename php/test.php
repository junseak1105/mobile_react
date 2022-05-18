
<?php include 'db.php'; ?>
<?php

$arr = array();
$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$data = $obj['data'];

$sql = "SELECT userID,userPW FROM member";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    array_push($arr, $result);
}

$responseJson = json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
echo $responseJson;