<?php

    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include("db.php");
    $arr = array("returnMsg"=>"succss");

    $matched_param = $_GET['matched'];
    $match_userid = $_GET['match_userid'];
    $userID = $_GET['userID'];
    $selected_hour = $_GET['selected_hour'];
    $selected_day = $_GET['selected_day'];
    $select_time = $selected_day.$selected_hour;
    
    if($matched_param == "nomatch"){ //매치 없을 시 
        $sql = "update user_timetable set $selected_day='Wait,1' where userID = '$userID' and hour = '$selected_hour';"; //단순 대기
    }else if($matched_param == "matched"){//매치 있을 시, 신청/수락대기 상태로 변경
        $sql = "update user_timetable set $selected_day='Pend,2' where (userID = '$userID' or userID = '$match_userid') and hour = '$selected_hour';"; //유저 테이블 매칭수락or수락대기로 설정
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        include("db.php");
        $sql = "update match_table set pending='Y' where (userID = '$userID' or userID = '$match_userid') and select_time = '$select_time';"; //매칭용테이블 pending y로 설정: 중복 매칭 방지
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }
    echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);

    
?>