"use strict";define(function(){function n(){}return n.prototype.init1=function(l,t,e,n){l("header").load("/html/header.html #header_top",function(){var n=l.cookie("user").split(".")[0];l.cookie("user").split(".")[1];!function(){var n=l("#notivc_scroll"),t=0,e=n.children().length,o=null;function i(){o=setInterval(function(){e<++t&&(n.css("top",0),t=1),n.animate({top:28*-t})},2e3)}n.append(l("#notivc_scroll li").eq(0).clone(!0)),i(),l("#notivc_scroll li a").hover(function(){clearInterval(o)},function(){i()})}(),l.cookie("user")?l.ajax({url:t.url+"/php/list.php",type:"GET",dataType:"json",data:{user:n},success:function(n){var t=e("loginAfter",{data:n});l("#content").html(t),l("#loginOut").on("click",function(){l.myConfirm("亲！确定要登出吗？",function(){l.cookie("userName",null,{expires:-1,path:"/"}),window.location.href="/html/login.html"})})}}):l.ajax({url:t.url+"/php/list.php",type:"GET",dataType:"json",data:{user:n},success:function(n){var t=e("loginBefore",{data:n});l("#content").html(t)}})})},n.prototype.init=function(l,o,i,n){l("header").load("/html/header.html",function(){if(l.cookie("user")){var n=l.cookie("user").split(".")[0],e=l.cookie("user").split(".")[1];l.ajax({url:o.url+"/php/list.php",type:"GET",dataType:"json",data:{user:n},success:function(n){var t=i("loginAfter",{data:n});l("#content").html(t),l("#loginOut").on("click",function(){l.myConfirm("亲！确定要登出吗？",function(){l.cookie("userName",null,{expires:-1,path:"/"}),window.location.href="/html/login.html"})}),l.ajax({url:o.url+"/php/cartNum.php",type:"GET",dataType:"json",data:{userid:e},success:function(n){var t=i("goodNum",{data:n});l("#contentNum").html(t)}})}})}else l.ajax({url:o.url+"/php/list.php",type:"GET",dataType:"json",data:{user:n},success:function(n){var t=i("loginBefore",{data:n});l("#content").html(t)}});!function(){var n=l("#notivc_scroll"),t=0,e=n.children().length,o=null;function i(){o=setInterval(function(){e<++t&&(n.css("top",0),t=1),n.animate({top:28*-t})},2e3)}n.append(l("#notivc_scroll li").eq(0).clone(!0)),i(),l("#notivc_scroll li a").hover(function(){clearInterval(o)},function(){i()})}(),l("#fenlei").hover(function(){l("#fenleilist").css({display:"block"})},function(){l("#fenleilist").css({display:"none"})})}),n&&n()},new n});