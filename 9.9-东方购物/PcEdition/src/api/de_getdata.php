<?php
    // 引入外部文件
    include 'conn.php';
    // 接受参数
    $id = $_GET['goodsId'];

    // 1.写查询语句
    $sql = "select * from list where id = $id";
    // 2.执行查询语句
    $res = $conn->query($sql);
    // 3.提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC); // 得到一个数组[{}, {}, {}]
    // 4.把数组转换成字符串，传给前端，一个接口文件只能有一个输出
    echo json_encode($data, JSON_UNESCAPED_UNICODE); //把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义 

    // 防止乱码
    $conn->set_charset('utf8');

    // 6.关闭连接
    $res->close();
    $conn->close();

?>