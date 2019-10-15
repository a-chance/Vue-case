<?php
   // 解决中文乱码
    header("Content-type:text/html;charset=utf-8");
    // 引入连接数据库的文件
    include 'conn.php';
    // 接受参数
    $sql = isset($_REQUEST['sql']) ? $_REQUEST['sql'] : "";

    // 执行
    $res = $conn->query($sql);

    // 防止乱码
    $conn->set_charset('utf8');

    if($res){
        // 删除成功
        echo 'yes';
    }else{
        // 不成功
        echo 'no';
    }    

    // 6.关闭连接
    $conn->close();

?>