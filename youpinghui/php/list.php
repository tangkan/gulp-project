<?php
  header("content-type:text/html;charset=utf-8");
  header("Access-Control-Allow-Origin:*");
  //接受前端数据
  $user = $_GET["user"];

	mysql_connect("127.0.0.1","root","sa");
	//选择数据库
	mysql_select_db("youpinhui");
	mysql_query("set names 'utf8'");
	// 设置sql语句
	$sql="SELECT * FROM users WHERE phone ='$user' OR email = '$user'";
	$result = mysql_query($sql);
	$arr = array();
		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

			$arr[] = $row;
		}
		echo json_encode($arr);
?>
