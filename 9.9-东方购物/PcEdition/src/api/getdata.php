<?php
    // 引入外部文件
    include 'conn.php'; 

    // 接收参数
    $page = isset($_REQUEST['page']) ? $_REQUEST['page'] : "";
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : "";
    
    // 1.写查询语句
    $index =  ($page - 1) * $num;
    $sql = "SELECT * FROM list LIMIT $index,$num;";
    $sql2 = "SELECT * FROM list";
    // 2.执行查询语句
    $res = $conn->query($sql);
    $res2 = $conn->query($sql2);

    // 3.提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC);  // 得到一个数组[{}, {}, {}]

    // 如果返回多个数据给前端就用关联数组
    $arr = Array(
        'total' => $res2->num_rows, //数据的总条数
        'data' => $data, // 数据
        'page' => $page, // 当前页码
        'num' => $num // 每页显示的记录数
    );

    // 4.把数组转换成字符串，传给前端，一个接口文件只能有一个输出
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);//把对象转成字符串 JSON_UNESCAPED_UNICODE防止转义

    // 防止乱码
    $conn->set_charset('utf8');

    // 6.关闭连接
    $res->close();
    $conn->close();
?>