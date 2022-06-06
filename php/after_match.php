<?php

    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    include("db.php");
    $arr = array("returnMsg"=>"succss");

    $userID = $_GET['userID'];
    $selected_hour = $_GET['selected_hour'];
    $selected_day = $_GET['selected_day'];
    $select_time = $selected_day.$selected_hour;
    $match_param = $_GET['match_param'];

    /*
    $match_param값에 따라 분기
    match_cancel_nomatch : 1번상태, 대기상태 취소
    match_cancel: 2번상태 요청간 상태 취소
    match_accept: 3번상태, 요청 수락
    match_refuse: 3번상태, 요청 거절
    */
    
    if($match_param == "match_cancel_nomatch"){ //대기상태 취소
        echo "test1";
        $sql = "update user_timetable set $selected_day='공강,0' where userID = '$userID' and hour = '$selected_hour';"; //테이블 공강으로 돌리기
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        $sql = "delete from match_table where userID = '$userID' and hour = '$selected_hour';"; //매치테이블에서 삭제
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }else if($match_param == "match_cancel"){//요청 상태 취소(신청자)
        echo "test2";
        //신청자 측 데이터 돌리기
        $sql = "update user_timetable set $selected_day='공강,0' where userID = '$userID' and hour = '$selected_hour';"; //테이블 공강으로 돌리기
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //신청자 측 데이터 돌리기
        $sql = "delete from match_table where userID = '$userID' and hour = '$selected_hour';"; //매칭 데이터 삭제
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);

        //피신청자 측 데이터 돌리기
        $sql = "update user_timetable set $selected_day='대기,1' where userID = (select user2_id from match_pending where user1_id = '$userID' and select_time = '$select_time') and hour = '$selected_hour';"; //테이블 공강으로 돌리기
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        $sql = "update match_table set pending='N' where userID = (select user2_id from match_pending where user1_id = '$userID' and select_time = '$select_time') and select_time = '$select_time';"; //매칭 테이블 pending N
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //match_pending 테이블에서 삭제
        $sql = "delete from match_pending where user1_id = '$userID' and select_time = '$select_time';";
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);

    }else if($match_param == "match_accept"){//요청 수락
        $sql = "update match_pending set user2_chk='Y', complete ='Y' where user2_id = '$userID' and select_time = '$select_time';";
        echo $sql;
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //피신청자측 테이블 설정
        $sql = "update user_timetable set $selected_day = '완료,4' where userID = '$userID' and hour = '$selected_hour';";
        echo $sql;
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //신청자측 테이블 설정
        $sql = "update user_timetable set $selected_day = '완료,4' where userID = (select user1_id from match_pending where user2_id = '$userID' and select_time = '$select_time') and hour = '$selected_hour';";
        echo $sql;
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }else if($match_param == "match_refuse"){//요청 거절(피신청자)
        echo "test4";
        //신청자 유저 테이블 매칭대기로 설정
        $sql = "update user_timetable set $selected_day='대기,1' where userID = '$userID' and hour = '$selected_hour';"; 
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //피신청자 유저 테이블 매칭대기로 설정
        $sql = "update user_timetable set $selected_day='대기,1' where userID = (select user2_id from match_pending where user1_id = '$userID' and select_time = '$select_time') and hour = '$selected_hour';"; 
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //매칭테이블 pending = "N"로 설정
        $sql = "update match_table set pending = 'N' where select_time='$select_time' where (userID = '$userID' or userID = (select user2_id from match_pending where user1_id = '$userID' and select_time = '$select_time')) and select_time = '$select_time';"; 
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
        //match_pending 테이블에서 삭제
        $sql = "delete from match_pending where user1_id = '$userID' and select_time = '$select_time'";
        include("db.php");
        mysqli_query($conn,$sql);
        mysqli_close($conn);
    }
    echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);

    
?>