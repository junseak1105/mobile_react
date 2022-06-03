<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

//db fetch array
$arr = array("returnMsg"=>"succss");
//json output array
$data = array();
$userID = $_GET['userID'];
$text = $_GET['text'];
$createdAt = $_GET['createdAt'];
$selected_hour = $_GET['selected_hour'];
$selected_day = $_GET['selected_day'];
$select_time = $selected_day.$selected_hour;

$sql = "insert into chat_data values(
    (select ifnull((select a.chat_idx+1 from chat_data a where userID = '$userID' and select_time = '$select_time'),1)),
    '$text',
    '$createdAt',
    'test',
    (select userName from member where userID = '$userID'),
    'https://placeimg.com/140/140/any',
    '$select_time'
    );
    ";
    
mysqli_query($conn, $sql);
echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
?>