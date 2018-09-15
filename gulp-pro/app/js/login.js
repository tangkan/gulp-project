//引入config
require(["config"],function(){
  //引入其他依赖模块
  require(["url","popBox","footer","md5"],function(url,$,footer){
    footer.init();
    //登录
    $("#lonBtn").on("click",function(){
      $.ajax({
        url:url.url+"/php/login.php",
        type:"GET",
        data:{
          "user":$("#user").val(),
          "password":hex_md5($("#password").val())
        },
        dataType:"json",
        success:function(data){
            if(data){
              console.log(data)
              // 成功弹窗
              $.myAlert("登录成功!",true,function(){
                //将信息存入cookie,有效期有30天
                var cookieVal = $("#user").val()+"."+data[0].userid;
                console.log(cookieVal);
                $.cookie("user",cookieVal,{ expires: 30, path: '/' });
                // 1秒后跳转到首页
                setTimeout(function(){
                  window.location.href = "/index.html";
                },1000);
              });

            }else{
              //失败弹窗
              $.myAlert("账号或者密码错误，请重试..",true);
            }
        },
        error:function(data){
            //失败弹窗
            $.myAlert("登录失败，请重试..",true);
        }
      });
    })

  })
})
