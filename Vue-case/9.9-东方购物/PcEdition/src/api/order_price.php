<?php
    include 'conn.php';
    //接收参数
    $order = isset($_GET['order']) ? $_GET['order'] : 'asc';
    //1.查询语句
    // $sql = 'SELECT * FROM goodslist ORDER BY price'.$order;//拼接
    $sql = "SELECT * FROM list ORDER BY price $order";//直接换成变量

    //2.执行语句
    $res = $conn->query($sql);//结果集

    
    //3.提取数据
    $data = $res->fetch_all(MYSQLI_ASSOC);
    // 如果返回多个数据给前端就用关联数组
    $arr = Array(
        'data' => $data, // 数据
    );
    //4.对象转成字符串，转给前端
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
  
    $conn->set_charset('utf8');
    //关闭连接，防止资源浪费
    $res->close();
    $conn->close();

?>