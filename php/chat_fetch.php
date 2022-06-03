<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

//db fetch array
$arr = array();
//json output array
$data = array();

$userID = $_GET['userID'];
$user1_id = $_GET['user1_id'];
$user2_id = $_GET['user2_id'];
$selected_hour = $_GET['selected_hour'];
$selected_day = $_GET['selected_day'];
$select_time = $selected_day.$selected_hour;
//echo $select_hour;
$sql = "SELECT * from chat_data where (userID = '$user1_id' or userID = '$user2_id') and select_time = '$select_time' order by chat_idx desc;";
//echo $sql;
$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    //array_push($arr, $result);
    $temp_arr = array(
        "_id" => $result["chat_idx"],
        "text"=> $result["text"],
        "createdAt"=> $result["createdAt"],
        "user"=> array('_id' => $result["userID"], 'name' => $result["name"], 'avatar' => $result["avatar"])
    );
    array_push($data,$temp_arr);
}
echo json_encode(array('results' => $data));
?>