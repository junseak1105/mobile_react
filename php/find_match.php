<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    
    include('db.php');

    $userID = $_GET['userID'];
    $selected_hour = $_GET['selected_hour'];
    $selected_day = $_GET['selected_day'];
    $select_time = $selected_day.$selected_hour;
    $selected_status = $_GET['selected_status'];
    $select_sex = $_GET['selected_sex'];
    if(isset($_GET['selected_food'])&&$_GET['selected_hobby']==''){
        $select_list = $_GET['selected_food'];
    }else if(isset($_GET['selected_hobby'])&&$_GET['selected_food']==''){
        $select_list = $_GET['selected_hobby'];
    }else{
        $select_list = $_GET['selected_food'].','.$_GET['selected_hobby'];
    }
    
    $sqlwhere = "";
    $select_list_arr = explode(',',$select_list);
    $select_list_count = count($select_list_arr);
    $match_idx = ""; //매칭된 idx 저장용

    //매칭 신청 내용 등록
    $query = "INSERT INTO match_table(userID,select_time,select_favor_sex,select_favor_list,userSex,school_code)
    select '$userID','$select_time','$select_sex','$select_list',(select sex from member where userID = '$userID'),(select school_code from member where userID = '$userID') from dual 
    WHERE NOT EXISTS(SELECT userID,select_time FROM match_table WHERE userID='$userID' and select_time = '$select_time')";
    $statement = mysqli_prepare($conn, $query);
    mysqli_stmt_execute($statement);
    
    //매칭 일치 사례 판별
    $sqlwhere = "where select_favor_list = '$select_list' and userSex = '$select_sex' and select_favor_sex = (select sex from member where userID = '$userID') and userID != '$userID' and pending !='N' and select_time = '$select_time' ";
    $query = "SELECT (IF(EXISTS(SELECT * FROM match_table $sqlwhere),'true', 'false')) as result";
	$data = $conn->query($query)->fetch_array();
    
    if($data['result'] == 'true'){ //정확한 매치
        $query = "select count(*) as count,ifnull(idx,0) as idx ,ifnull(userID,'none') as userID from match_table $sqlwhere ORDER BY RAND() LIMIT 0, 1";
        $data = $conn->query($query)->fetch_array();
    }else{ //차선책(선택사항 중 하나라도 맞을 시)
        $sqlwhere = "where userSex = '$select_sex' and select_favor_sex = (select sex from member where userID = '$userID') and ( ";
        for($i=0;$i<$select_list_count;$i++){
            $sqlwhere = $sqlwhere."select_favor_list like '%".$select_list_arr[$i]."%' "; //select_list explode()된 값 like 조건문 삽입
            if($i!=($select_list_count-1)){
                $sqlwhere = $sqlwhere."or ";
            }else{
                $sqlwhere = $sqlwhere.")";
            }
        }
        $sqlwhere = $sqlwhere." and userID != '$userID' and select_time = '$select_time'";
        $query = "select count(*) as count,ifnull(idx,0) as idx ,ifnull(userID,'none') as userID,ifnull(select_favor_list,'none') as select_favor_list,ifnull(select_time,'none') as select_time from match_table $sqlwhere ORDER BY RAND() LIMIT 0, 1";
        //echo $query;
        $data = $conn->query($query)->fetch_array();
    }
    
    mysqli_close($conn);
    $responseJson = json_encode(array('results' => $data),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
    echo $responseJson;
    
?>