<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");

  $phone = $_GET["phone"];
  $email = $_GET["email"];
  $password = $_GET["password"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");
  // 设置sql语句
  //判断用户名或者邮箱是否存在
  $sql1 = "SELECT count(*) FROM users WHERE (phone='$phone' or email='$email')";
  $result1 = mysql_query($sql1);
  $num = mysql_fetch_array($result1);

  //不存在的时候新建用户
  if(!$num[0]){
    $sql = "INSERT INTO users(phone,email,password) VALUES ('$phone','$email','$password')";
    $result = mysql_query($sql);
    //执行sql
    echo '{"code":1}';

  }else{
    echo '{"code":0}';
  }

  //关闭数据库
  mysql_close();
 ?>
