<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
include('db.php');

//db fetch array
$arr = array();
//json output array
$data = array();
$userID = $_GET['userid'];
$sql = "SELECT * from user_timetable where userID = '$userID';";

$result_set = mysqli_query($conn, $sql);

while ($result = mysqli_fetch_array($result_set)) {
    //array_push($arr, $result);
    $temp_arr = array(
        "hour"=> $result["hour"],
        "Mon"=> array('class' => explode(',',$result["Mon"])[0],'status' => explode(',',$result["Mon"])[1]),
        "Tue"=> array('class' => explode(',',$result["Tue"])[0],'status' => explode(',',$result["Tue"])[1]),
        "Wed"=> array('class' => explode(',',$result["Wed"])[0],'status' => explode(',',$result["Wed"])[1]),
        "Thu"=> array('class' => explode(',',$result["Thu"])[0],'status' => explode(',',$result["Thu"])[1]),
        "Fri"=> array('class' => explode(',',$result["Fri"])[0],'status' => explode(',',$result["Fri"])[1])
    );
    array_push($data,$temp_arr);
}
echo json_encode(array('results' => $data));
?>