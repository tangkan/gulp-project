<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");
  //获取商品ID
  $userid = $_GET["userid"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");
  // 设置sql语句
  $sql = "SELECT * FROM goods LEFT JOIN cart ON  goods.goodNum = cart.goodNum WHERE goods.goodNum = cart.goodNum AND cart.userid = '$userid'";
  //执行sql
  $result = mysql_query($sql);

  $results = array();

  while ($row = mysql_fetch_array($result)) {

  $results[] = $row;

  }
  echo json_encode($results);
  //关闭数据库
  mysql_close();
 ?>
