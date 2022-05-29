<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    
    include("db.php");
    $arr = array();

    $userID = $_GET["userid"];
    $userPassword = $_GET["password"];

    $sql = "SELECT IF( EXISTS(select userPW from member where userID = '$userID' and userPW = '$userPassword'), 'success', 'fail') as returnMsg, userPW as token from member where userID = '$userID' and userPw = '$userPassword';";
    //echo $sql;
    $result_set = mysqli_query($conn, $sql);
    while ($result = mysqli_fetch_assoc($result_set)) {
        array_push($arr, $result);
    }
    $responseJson = json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
    echo $responseJson;
    

?>