"use strict";require(["config"],function(){require(["url","popBox","footer","md5"],function(s,e,n){n.init();var o=[!1,!1,!1,!1];e("#phoneNum").on("blur",function(){var s=e("#phoneNum").val();/^1(3|4|5|7|8)\d{9}$/.test(s)?(o[0]=!0,e("#etips1").css({display:"none"})):(o[0]=!1,e("#etips1").css({display:"block"}))}),e("#email").on("blur",function(){var s=e("#email").val();/^\w+@[a-z0-9]+\.[a-z]+$/i.test(s)?(o[1]=!0,e("#etips2").css({display:"none"})):(o[1]=!1,e("#etips2").css({display:"block"}))}),e("#password").on("blur",function(){var s=e("#password").val();/^\w{6,12}$/.test(s)?(o[2]=!0,e("#etips3").css({display:"none"})):(o[2]=!1,e("#etips3").css({display:"block"}))}),e("#password1").on("blur",function(){e("#password").val()!==e("#password1").val()?(o[3]=!1,e("#etips4").css({display:"block"})):(o[3]=!0,e("#etips4").css({display:"none"}))}),e("#subBtn").on("click",function(){return 1==e("#checkx1:checked").length&&(-1==o.indexOf(!1)&&void e.ajax({url:s.url+"/php/register.php",type:"GET",data:{phone:e("#phoneNum").val(),email:e("#email").val(),password:hex_md5(e("#password").val())},dataType:"json",success:function(s){s.code?e.myAlert("注册成功",!0,function(){setTimeout(function(){window.location.href="/html/login.html"},1e3)}):e.myAlert("用户名或者邮箱已存在，请重试...",!0)},error:function(){e.myAlert("系统错误，请联系管理员...",!0)}}))})})});