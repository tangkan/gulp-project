<?php
  header("content-type:text/html;charset=utf8");
  header("Access-Control-Allow-Origin:*");
  //获取商品ID
  $userid= $_GET["userid"];
  $goodNum= $_GET["goodNum"];
  $num= $_GET["num"];
  // 连接数据库
  mysql_connect("127.0.0.1","root","sa");
  //选择数据库
  mysql_select_db("youpinhui");
  mysql_query("set names 'utf8'");
  //判断商品是否存在
  $isEx = mysql_query("SELECT num FROM cart WHERE goodNum='$goodNum' AND userid='$userid'");
  //如果存在则更新数据
  if(mysql_num_rows($isEx)){
    $num1 = mysql_fetch_array($isEx);
    $allNum = $num+$num1["num"];
    $result = mysql_query("UPDATE cart SET num = $allNum WHERE goodNum='$goodNum' AND userid='$userid'");
  }
  else{
    // 执行添加记录
    $result = mysql_query("INSERT INTO cart(goodNum,userid,num) VALUES ('$goodNum','$userid','$num')");
  }

  if($result){
    echo '{"code":1}';
  }else{
    echo '{"code":0}';
  }
  //关闭数据库
  mysql_close();
 ?>
