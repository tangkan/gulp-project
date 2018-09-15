<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");
  //获取所有TV商品
  $keywords = $_GET["keywords"];
  $startlimit = $_GET["startlimit"];
  $endlimit = $_GET["endlimit"];

  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");

  // 设置sql语句
  $sql = "SELECT * FROM goods WHERE pinpai LIKE '%$keywords%' OR Name LIKE '%$keywords%' OR title LIKE '%$keywords%' LIMIT ".($startlimit).",".$endlimit;
  //执行sql
  $result = mysql_query($sql);

  $results = array();

  while ($row = mysql_fetch_assoc($result)) {

  $results[] = $row;

  }
  echo json_encode($results);
  // 关闭数据库
  mysql_close();
 ?>
