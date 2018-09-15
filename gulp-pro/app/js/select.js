//引入config
require(["config"],function(){
  //引入其他依赖模块
  require(["popBox","template","url","header","footer"],function($,template,url,header,footer){
    header.init($,url,template);

    //mian
    //获取商品参数
    var keywords = decodeURI(location.search).split("=")[1];

    var limit = 0;
    var index = 0;
    var flag = false;
    //获取搜索到的商品
    function stream(limit){
    $.ajax({
      url:url.url+"/php/selectGoods.php",
      type:"GET",
      dataType:"json",
      data:{"keywords":keywords,"startlimit":limit,"endlimit":6},
      success:function(data){
        if(!(data == "")){
          //不为空，则显示查询到的数据
          var html = template("selectGoods",{data:data});
          $("#selectContent").append($(html));
          //给每个商品添加跳转事件
          $(".aBtn").on("click",function(){
  					var href= "/html/detail.html?"+$(this).attr("data-id")
  					window.location.href = href;
  				});

        }else{
          //如果为空，则显示没有商品页面
          var html = template("selectNull",{data:data});
          $("#selectNullContent").html(html);
        }
      }
    });
  }

  stream(limit);

  $(window).scroll(function(){
    console.log($(window).scrollTop())
		if($(window).scrollTop() > 700+(435*index)){

			if(!flag){
				flag = true;
				limit += 6;
				index += 2;
				stream(limit);

			}
		}
	})


    footer.init();
  })
})
