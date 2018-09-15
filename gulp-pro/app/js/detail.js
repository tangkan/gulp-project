//引入config
require(["config"],function(){
  //引入其他依赖模块
  require(["popBox","template","url","header","footer"],function($,template,url,header,footer){
    header.init($,url,template);
    var userId = $.cookie("user").split(".")[1];

    //获取商品参数
    var goodId = decodeURI(location.search).split("?")[1];
    //main
    //请求商品数据
    $.ajax({
      url:url.url+"/php/goodsInfo.php",
      type:"GET",
      dataType:"json",
      data:{"goodNum":goodId},
      success:function(data){
        var html = template("goodImg",{data:data});
        $("#goodImgContent").html(html);
        var html = template("goodInfo",{data:data});
        $("#contentList").html(html);
        var html = template("details",{data:data});
        $("#detailsContent").html(html);

        console.log(data);
        //给img添加事件
        img();

        // 给数量的加减添加点击事件
        var index = $("#goodsNumberInput").val();
        $("#lessBtn").on("click",function(){
          index--;
          if(index <= 1){
            $("#lessBtn").addClass("limit");
            index = 1;
          }
          $("#goodsNumberInput").val(index);
        })

        $("#addBtn").on("click",function(){
          $("#lessBtn").removeClass("limit");
          index++;
          $("#goodsNumberInput").val(index);
        })

        //将数量添加都购物车
        $("#addCart").on("click",function(){
          if(userId){
            //如果用户存在，则添加商品
            $.ajax({
              url:url.url+"/php/addCart.php",
              type:"GET",
              dataType:"json",
              //传入数据（用户id，商品编号,商品数量）
              data:{"userid":userId,"goodNum":goodId,"num":$("#goodsNumberInput").val()},
              success:function(data){
                //刷新购物车的上的数量
                $.ajax({
                  url:url.url+"/php/cartNum.php",
                  type:"GET",
                  dataType:"json",
                  data:{"userid":userId},
                  success:function(data){
                    var html = template("goodNum",{data:data});
                    $("#contentNum").html(html);
                    setTimeout(function(){
                      $.myAlert("添加购物车成功!",true);

                    },200);
                  }
                });
              }
            });
          }else{
            //用户不存在则先登录
            $.myAlert("亲！请先登录!",true);
          }

        })

      }
    });


    //lkImg的切换
    function img(){
      $("#lkImgs li img").on("click",function(){
        //图片切换
        $("#img").attr("src",$(this).attr("src"));
        $("#bigimg img").attr("src",$(this).attr("src"));
        //样式的改变
        $(this).parent().addClass("active").siblings().removeClass("active");
      })
      //放大镜效果
      $("#box").on("mousemove",function(e){
        $("#zoom").css({"display":"block"});
        $("#bigimg").css({"display":"block"});

        //sapn的坐标
        var left = e.pageX - $("#box").offset().left - $("#zoom").width()/2;
        var top = e.pageY - $("#box").offset().top - $("#zoom").height()/2;

        //判断边界
        if(left < 0) left = 0;
        if(top < 0) top = 0;
        if(left > $("#box").width() - $("#zoom").width()) left = $("#box").width() - $("#zoom").width();
        if(top > $("#box").height() - $("#zoom").height()) top = $("#box").height() - $("#zoom").height();

        //移动
        $("#bigimg img").css({"left":-2*left});
        $("#bigimg img").css({"top":-2*top});

        $("#zoom").css({"left":left + "px"});
        $("#zoom").css({"top":top + "px"});

        //移除时删除
        $("#box").on("mouseleave",function(){
          $("#zoom").css({"display":"none"});
          $("#bigimg").css({"display":"none"});
        })
      })

    }

    //商品参数(选项卡)
    // var tab_index
    $("#tab_select a").on("click",function(){
      //按钮样式切换
      $(this).addClass("active").siblings().removeClass("active");
      //内容切换
      $(this).
    })


    footer.init();
  })
})
