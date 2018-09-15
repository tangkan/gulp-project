<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");

  $userid = $_GET["userid"];
  $goodNum = $_GET["goodNum"];
  $num = $_GET["num"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");
  // 设置sql语句
  //phone
  $sql = "UPDATE cart SET num = $num WHERE goodNum='$goodNum' AND userid='$userid'";
  //执行sql
  $result = mysql_query($sql);

  if($result){
    $result1 = mysql_query("SELECT * FROM goods LEFT JOIN cart ON  goods.goodNum = cart.goodNum WHERE goods.goodNum = cart.goodNum AND cart.userid = '$userid'");
  }
  
  $results = array();

  while ($row = mysql_fetch_array($result1)) {

  $results[] = $row;

  }
  echo json_encode($results);

  //关闭数据库
  mysql_close();
 ?>
