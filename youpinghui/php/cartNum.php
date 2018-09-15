<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");

  $userid = $_GET["userid"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");
  // 设置sql语句
  //phone
  $sql = "SELECT * FROM cart WHERE userid='$userid'";
  //执行sql
  $result = mysql_query($sql);

  while ($num = mysql_fetch_array($result)) {
    // code...
    $allNum += $num["num"];
  }

  echo $allNum;

  //关闭数据库
  mysql_close();
 ?>
