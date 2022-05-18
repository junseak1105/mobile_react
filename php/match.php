<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    
    $conn = mysqli_connect(
        'jhk.n-e.kr', // IP
        'dsu_mobile_prj', // 아이디
        'mobile_prj_jhk', // 비밀번호
        'mobile_classprj' // 데이터베이스
        
    );
    // $conn = mysqli_connect(
    //     'localhost',
    //     'root',
    //     '',
    //     'dgnr'
    // );
    // 한글깨짐 현상 관련
    mysqli_query($conn, "set session character_set_connection=utf8;");
    mysqli_query($conn, "set session character_set_results=utf8;");
    mysqli_query($conn, "set session character_set_client=utf8;");

    $userID = 'test';
    $favor_category = 'food';
    $select_sex = 'M';
    $select_list = 'JPN,CHN';
    $select_time = 'mon1';
    $sqlwhere = "";
    $select_list_arr = explode(',',$select_list);
    $select_list_count = count($select_list_arr);
    $match_idx = ""; //매칭된 idx 저장용

    //매칭 신청 내용 등록
    $query = "insert into match_$favor_category(userID,select_time,select_favor_sex,select_favor_list) values('$userID','$select_time','$select_sex','$select_list')"; 
    $statement = mysqli_prepare($conn, $query);
    mysqli_stmt_execute($statement);
    
    //매칭 일치 사례 판별
    $sqlwhere = "where select_favor_list = '$select_list' and userID != '$userID'";
    $query = "SELECT (IF(EXISTS(SELECT * FROM match_$favor_category $sqlwhere),'true', 'false')) as result";
	$data = $conn->query($query)->fetch_array();
    
    if($data['result'] == 'true'){ //정확한 매치
        $query = "select idx from match_$favor_category $sqlwhere limit 1";
        $data = $conn->query($query)->fetch_array();
    }else{ //차선책(선택사항 중 하나라도 맞을 시)
        $sqlwhere = "where ( ";
        for($i=0;$i<$select_list_count;$i++){
            $sqlwhere = $sqlwhere."select_favor_list like '%".$select_list_arr[$i]."%' "; //select_list explode()된 값 like 조건문 삽입
            if($i!=($select_list_count-1)){
                $sqlwhere = $sqlwhere."or ";
            }else{
                $sqlwhere = $sqlwhere.")";
            }
        }
        $sqlwhere = $sqlwhere." and userID != '$userID'";
        $query = "select idx from match_$favor_category $sqlwhere limit 1"; //최상단 1명 검색(랜덤x)
        echo $query;
        $data = $conn->query($query)->fetch_array();
    }
    
    mysqli_close($conn);
    echo json_encode($data);
    
?>