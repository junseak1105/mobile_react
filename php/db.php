<?php
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
?>