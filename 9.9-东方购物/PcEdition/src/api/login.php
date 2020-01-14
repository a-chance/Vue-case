<?php
    // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : "";
    $pwd = isset($_REQUEST['pwd']) ? $_REQUEST['pwd'] : "";

    // 定义sql语句
    $sql = "SELECT id from user WHERE phone='$username' and pwd='$pwd'";
    // 执行sql语句
    $res = $conn->query($sql);

    $data = $res->fetch_all(MYSQLI_ASSOC);

    if($res->num_rows){
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    } else {
        echo "";
    }

    $res->close();
    $conn->close();
?>