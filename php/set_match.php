<?php

    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include("db.php");
    $arr = array("returnMsg"=>"succss");

    $matched_param = $_GET['matched'];
    $match_userid = $_GET['match_userid'];
    $userID = isset($_GET['userID']) ? $_GET['page'] : "";
    $selected_hour = $_GET['selected_hour'];
    $selected_day = $_GET['selected_day'];
    $select_time = $selected_day.$selected_hour;
    
    $sql = 'call matched('$matched_param','$selected_day','$selected_hour','$userID','$match_userid','$select_time')';
    mysqli_query($conn,$sql);
    echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);

    
?>