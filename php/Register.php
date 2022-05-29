<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    
    include("db.php");
    $arr = array();

    $userID = $_GET["userid"];
    $userName = $_GET["username"];
    $userPassword = $_GET["password"];
    $userschool = $_GET["school"];
    $sex = $_GET["sex"];

    $sql = "call Register('$userName','$userID','$userPassword','$userschool','$sex')";
    //echo $sql;
    $result_set = mysqli_query($conn, $sql);
    while ($result = mysqli_fetch_assoc($result_set)) {
        array_push($arr, $result);
    }
    $responseJson = json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
    echo $responseJson;
    

?>