<?php
   // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : "";

    // 定义SQL语句
    $sql1 = "SELECT * from admin WHERE username='$username'";

    $res1 = $conn->query($sql1);

    // // // 防止乱码
    $conn->set_charset('utf8');

    // 如果用户名已存在就返回no,如果不存在就插入
    if($res1->num_rows){
        // 不给注册
        echo 'no';
    }else{
        // 给注册
        echo 'yes';
    }
    

    // 6.关闭连接
    $res1->close();
    $conn->close();

?>