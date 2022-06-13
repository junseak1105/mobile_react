<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    
    include('db.php');
    $data = array();

    $userID = $_GET['userID'];
    $selected_hour = $_GET['selected_hour'];
    $selected_day = $_GET['selected_day'];
    $select_time = $selected_day.$selected_hour;
    
    $sql = "select user1_id,user2_id,(select select_favor_list from match_table where userID=(select user1_id from match_pending where user2_id ='$userID' and select_time = '$select_time' ) and select_time = '$select_time')as select_favor from match_pending where (user1_id = '$userID' or user2_id ='$userID') and select_time = '$select_time';";
   //echo $sql;
    $result_set = mysqli_query($conn, $sql);

    while ($result = mysqli_fetch_array($result_set)) {
        array_push($data, $result);
    }
    mysqli_close($conn);
    $responseJson = json_encode(array('results' => $data),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
    echo $responseJson;
    
?>