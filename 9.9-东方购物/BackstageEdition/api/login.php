<?php
    // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : "";
    $pwd = isset($_REQUEST['pwd']) ? $_REQUEST['pwd'] : "";

    // 定义sql语句
    $sql = "SELECT * from admin WHERE username='$username' and pwd='$pwd'";
    // 执行sql语句
    $res = $conn->query($sql);

    if($res->num_rows){
        echo 'yes';
    } else {
        echo 'no';
    }

    $res->close();
    $conn->close();
?>