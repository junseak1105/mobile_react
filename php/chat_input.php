<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

//db fetch array
$arr = array("returnMsg"=>"succss");
//json output array
$data = array();
$userID = $_GET['userID'];
$user1_id = $_GET['user1_id'];
$user2_id = $_GET['user2_id'];
$text = $_GET['text'];
$createdAt = $_GET['createdAt'];
$selected_hour = $_GET['selected_hour'];
$selected_day = $_GET['selected_day'];
$select_time = $selected_day.$selected_hour;

$sql = "insert into chat_data values(
    (select ifnull((select a.chat_idx+1 from chat_data a where (userID = '$user1_id' or userID ='$user2_id') and select_time = '$select_time' order by chat_idx desc limit 1),1)),
    '$text',
    '$createdAt',
    '$userID',
    (select userName from member where userID = '$userID'),
    'https://placeimg.com/140/140/any',
    '$select_time'
    );
    ";
//echo $sql;
mysqli_query($conn, $sql);
echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
?>