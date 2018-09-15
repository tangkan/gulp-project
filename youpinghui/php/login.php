<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");

  $user = $_GET["user"];
  $password = $_GET["password"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");
  // 设置sql语句
  //phone
  $sql = "SELECT count(*) FROM users WHERE (phone='$user' or email='$user') AND password='$password'";
  //执行sql
  $result = mysql_query($sql);

  $num = mysql_fetch_array($result);

  //登录成功后获取用户信息
  if($num[0]){
    $sql1 = "SELECT * FROM users WHERE (phone='$user' or email='$user') AND password='$password'";
    $result1 = mysql_query($sql1);

    $results = array();

    while ($row = mysql_fetch_array($result1)) {

    $results[] = $row;

    }
    echo json_encode($results);

  }else{
    echo '0';
  }


  //关闭数据库
  mysql_close();
 ?>
