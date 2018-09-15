//引入config
require(["config"],function(){
  //引入其他依赖模块
  require(["url","popBox","footer","md5"],function(url,$,footer){
    footer.init();

    //使用一个数组来存放每项正确与否
    var arr = [false,false,false,false];

    //手机号码验证
    $("#phoneNum").on("blur",function(){
      var rePhoneNum = /^1(3|4|5|7|8)\d{9}$/;
      var val = $("#phoneNum").val();
      if(!(rePhoneNum.test(val))){
        arr[0] = false;
        $("#etips1").css({"display":"block"});
      }else{
        arr[0] = true;
        $("#etips1").css({"display":"none"});
      }
    });

    //邮箱验证
    $("#email").on("blur",function(){
      var reEmail = /^\w+@[a-z0-9]+\.[a-z]+$/i;
      var val = $("#email").val();
      if(!(reEmail.test(val))){
        arr[1] = false;
        $("#etips2").css({"display":"block"});
      }else{
        arr[1] = true;
        $("#etips2").css({"display":"none"});
      }
    });

    //密码验证
    $("#password").on("blur",function(){
      var rePassword= /^\w{6,12}$/;
      var val = $("#password").val();
      if(!(rePassword.test(val))){
        arr[2] = false;
        $("#etips3").css({"display":"block"});
      }else{
        arr[2] = true;
        $("#etips3").css({"display":"none"});
      }
    });

    //确认密码验证
    $("#password1").on("blur",function(){
      var val = $("#password").val();
      var val1 = $("#password1").val();
      if(!(val === val1)){
        arr[3] = false;
        $("#etips4").css({"display":"block"});
      }else{
        arr[3] = true;
        $("#etips4").css({"display":"none"});
      }
    });

    //提交
    $("#subBtn").on("click",function(){
      if($("#checkx1:checked").length == 1){
        if(arr.indexOf(false) == -1){
          //ajax请求后台数据
          $.ajax({
            url:url.url+"/php/register.php",
            type:"GET",
            data:{
              "phone":$("#phoneNum").val(),
              "email":$("#email").val(),
              "password":hex_md5($("#password").val())
            },
            dataType:"json",
            success:function(data){
              if(data.code){
                $.myAlert("注册成功",true,function(){
                  setTimeout(function(){
                    window.location.href = "/html/login.html";
                  },1000);
                });
              }else{
                $.myAlert("用户名或者邮箱已存在，请重试...",true);
              }
            },
            error:function(){
              $.myAlert("系统错误，请联系管理员...",true);
            }
          });

        }else{
          return false;
        }
      }else{
        return false;
      }
    })

  })
})
