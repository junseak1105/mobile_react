<?php

    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include("db.php");
    $arr = array("returnMsg"=>"succss");

    $userID = $_GET['userID'];
    $selected_hour = $_GET['selected_hour'];
    $selected_day = $_GET['selected_day'];
    $select_time = $selected_day.$selected_hour;

    $sql = "delete from match_table where userID = '$userID' and select_time = '$select_time'";

    mysqli_query($conn,$sql);
    echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);

    
?>