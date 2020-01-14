<?php
   // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : "";
    $uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : "";
    $tit = isset($_REQUEST['tit']) ? $_REQUEST['tit'] : "";
    $price = isset($_REQUEST['price']) ? $_REQUEST['price'] : "";
    $jifen = isset($_REQUEST['jifen']) ? $_REQUEST['jifen'] : "";
    $imgsrc = isset($_REQUEST['imgsrc']) ? $_REQUEST['imgsrc'] : "";
    $count = isset($_REQUEST['count']) ? $_REQUEST['count'] : "";

    // 定义SQL语句
    $sql = "INSERT INTO cart(id, uid, tit, price, jifen, imgsrc, count) VALUES('$id', '$uid', '$tit', '$price', '$jifen', '$imgsrc', '$count')";

    $res = $conn->query($sql);

    // 防止乱码
    $conn->set_charset('utf8');

    if($res){
        // 添加购物车成功
        echo 'yes';
    }else{
        // 不成功
        echo 'no';
    }
    

    // 6.关闭连接
    $conn->close();

?>