//定义header的模块
define(function(){
  function Header(){}

  //只请求header_top
  Header.prototype.init1 = function($,url,template,fn){
    $("header").load("/html/header.html #header_top",function(){
      var userName = $.cookie("user").split(".")[0];
      var userId = $.cookie("user").split(".")[1];
      //公告滚动
      function gongGao(){

        var ul = $("#notivc_scroll");
        // 记录当前位置
        var n = 0;
        var len = ul.children().length;
        //尾部添加一个li
        var timer = null;
        ul.append($("#notivc_scroll li").eq(0).clone(true));

        // 执行动画函数
        function move(){
          timer = setInterval(function(){
            n++;
            if( n > len){
              ul.css("top",0);
              n = 1;
            }
            ul.animate({"top":-n*28});
          },2000);
        }
        move();
        // 鼠标移入移出
        $("#notivc_scroll li a").hover(function(){
          clearInterval(timer);
        },function(){
          move();
        });
      }
      //公告滚动
      gongGao();
      if($.cookie("user")){
        //如果存在cookie，请求当前用户名
        $.ajax({
          url:url.url+"/php/list.php",
          type:"GET",
          dataType:"json",
          data:{"user":userName},
          success:function(data){
            var html = template("loginAfter",{data:data});
            $("#content").html(html);
            $("#loginOut").on("click",function(){
              $.myConfirm("亲！确定要登出吗？",function(){
                $.cookie("user", null,{expires:-1,path:"/"});
                window.location.href = "/html/login.html";
              })
            });
          }
        });
      }else{
        $.ajax({
          url:url.url+"/php/list.php",
          type:"GET",
          dataType:"json",
          data:{"user":userName},
          success:function(data){
            var html = template("loginBefore",{data:data});
            $("#content").html(html);
          }
        });
      }
    });
  }

  Header.prototype.init = function($,url,template,fn){
    $("header").load("/html/header.html",function(){
      console.log(123421412)

      if($.cookie("user")){
        var userName = $.cookie("user").split(".")[0];
        var userId = $.cookie("user").split(".")[1];
        //如果存在cookie，请求当前用户名
        $.ajax({
          url:url.url+"/php/list.php",
          type:"GET",
          dataType:"json",
          data:{"user":userName},
          success:function(data){
            var html = template("loginAfter",{data:data});
            $("#content").html(html);
            $("#loginOut").on("click",function(){
              $.myConfirm("亲！确定要登出吗？",function(){
                $.cookie("user", null,{expires:-1,path:"/"});
                window.location.href = "/html/login.html";
              })
            });

            //获取购物车的数量
            $.ajax({
              url:url.url+"/php/cartNum.php",
              type:"GET",
              dataType:"json",
              data:{"userid":userId},
              success:function(data){
                var html = template("goodNum",{data:data});
                $("#contentNum").html(html);
              }
            });

          }
        });
      }else{
            var html = template("loginBefore");
            $("#content").html(html);
          }
        });
      }



      //公告滚动
      function gongGao(){

        var ul = $("#notivc_scroll");
        // 记录当前位置
        var n = 0;
        var len = ul.children().length;
        //尾部添加一个li
        var timer = null;
        ul.append($("#notivc_scroll li").eq(0).clone(true));

        // 执行动画函数
        function move(){
          timer = setInterval(function(){
            n++;
            if( n > len){
              ul.css("top",0);
              n = 1;
            }
            ul.animate({"top":-n*28});
          },2000);
        }
        move();
        // 鼠标移入移出
        $("#notivc_scroll li a").hover(function(){
          clearInterval(timer);
        },function(){
          move();
        });
      }
      //公告滚动
      gongGao();

      // 分类hover
      $("#fenlei").hover(function(){
        $("#fenleilist").css({"display":"block"});
      },function(){
        $("#fenleilist").css({"display":"none"});
      });

      //搜索查询
      // $("sch_btn").on("click",function(){
      //
      // })



    })

    fn && fn();
  }
  return new Header();
})
