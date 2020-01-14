<?php
    // 设置参数
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'h51907';

    // 建立连接
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 判断是否成功
    // var_dump($conn);
    // php调用属性和方法 $conn->属性名  $conn->方法名

    if($conn->connect_error) {
        // 有数据返回就证明失败了
        die("连接失败：". $conn->connect_error);
    } else{
        // echo "连接成功";
    }
?>