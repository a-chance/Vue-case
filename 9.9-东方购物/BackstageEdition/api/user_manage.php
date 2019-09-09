<?php
    // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接收数据
    $sql = isset($_REQUEST['sql']) ? $_REQUEST['sql'] : "";
    // echo $sql;
    // 执行
    $res = $conn->query($sql);

    // 3.提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC);  // 得到一个数组[{}, {}, {}]
    
    // 4.把数组转换成字符串，传给前端，一个接口文件只能有一个输出
    echo json_encode($data, JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义

    // 防止乱码
    $conn->set_charset('utf8');

    $res->close();
    $conn->close();

?>