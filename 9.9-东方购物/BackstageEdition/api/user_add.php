<?php
   // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : "";
    $pwd = isset($_REQUEST['pwd']) ? $_REQUEST['pwd'] : "";
    $phone = isset($_REQUEST['phone']) ? $_REQUEST['phone'] : "";
    $email = isset($_REQUEST['email']) ? $_REQUEST['email'] : "";

    // 定义SQL语句
    $sql1 = "INSERT INTO admin(username,pwd,phone,email) VALUES('$username','$pwd', '$phone', '$email')";

    $res1 = $conn->query($sql1);

    // 防止乱码
    $conn->set_charset('utf8');

    if($res1){
        echo 'yes';
    } else {
        echo 'no';
    }

    // 6.关闭连接
    // $res1->close();
    $conn->close();

?>