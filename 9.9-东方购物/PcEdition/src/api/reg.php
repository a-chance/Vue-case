<?php
   // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : "";
    $pwd = isset($_REQUEST['pwd']) ? $_REQUEST['pwd'] : "";

    // 定义SQL语句
    $sql = "INSERT INTO user(phone,pwd) VALUES('$phone', '$pwd')";

    $res = $conn->query($sql);

    // 防止乱码
    $conn->set_charset('utf8');

    if($res){
        // 不给注册
        echo 'yes';
    }else{
        // 注册成功
        echo 'no';
    }
    

    // 6.关闭连接
    $conn->close();

?>