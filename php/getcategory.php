<?php  

include('db.php');

mysqli_set_charset($conn,"utf8"); 

$sql="select * from favor_ca where co_code = 'fa_food' or 'fa_hobby' order by co_code;";

$result=mysqli_query($conn,$sql);
$data = array();   
if($result){  
    while($row=mysqli_fetch_array($result)){
        array_push($data, 
                array('co_code'=>$row[0],
                'favor_ca_code'=>$row[1],
                'favor_ca_name'=>$row[2]
            ));
    }
}  
else{  
    echo "SQL문 처리중 에러 발생 : "; 
    echo mysqli_error($conn);
} 
$json_pretty = json_encode($data, JSON_PRETTY_PRINT+JSON_UNESCAPED_UNICODE);
echo "<pre>".$json_pretty."<pre/>";
mysqli_close($conn);  
   
?>