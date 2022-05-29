<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    $arr = array("returnMsg"=>"succss");
    echo json_encode(array('results' => $arr),JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
?>