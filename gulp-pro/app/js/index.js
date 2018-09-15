//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["popBox","template","url","header","footer"],function($,template,url,header,footer){
		//引入header.html
		header.init($,url,template);

		//轮播图
		function lunbo(){
			var box = $("#lunbo");
			var ul = $("#lunbo ul");
			var aLi = $('#lunbo ul li');
			var	ol = $("#lunbo ol");

			//设置父元素的宽度
			$("#lunbo").css({"width":$(window).width(),"left":-($(window).width()-1000)/2});

			//按钮
			var goPrev = $("#arr_left");
			var goNext = $("#arr_right");

			var index = 0;//存当前处于第几张图
			var btnIndex = 0;//按钮的下标
			var flag = false;//没有播放
			var len = aLi.length;//图片的张数
			var liWidth = aLi.eq(0).outerWidth();
			//ul末尾拼接一个aLi[0],计算ul的宽度
			ul.append(aLi.eq(0).clone(true)).css("width",(len+1)*liWidth);
			//设置ol的位置
			$("#lunbo ol").css({"left":($(window).width()-1000)});

			//动态生成按钮
			for(var i = 0; i < len; i++){
				$("<li class='"+ (i==0?"ac":"") +"'></li>").appendTo(ol);
			}

			//划过li显示左右按钮
			$(".scroll_div").hover(function(){
				$("#arr_left,#arr_right").fadeIn();
			},function(){
				$("#arr_left,#arr_right").fadeOut();
			})

			//按钮点击
			$("#lunbo ol li").on("mousemove",function(){
				if(!flag){
					flag = true;
					$(this).addClass("ac").siblings().removeClass("ac");
					ul.animate({"left":-$(this).index()*liWidth},700,function(){
						flag = false;
					});
					index = $(this).index();
				}
			})

			//上一个按钮
			goPrev.on("click",function(){
				if(!flag){
					flag = true;
					index--;
					if(index < 0){
						//瞬间拉回补充那张图
						ul.css("left",-len*liWidth);
						//从补充那张图往最后一张图播放的index
						index = len - 1;
					}
					$("#lunbo ol li").eq(index).addClass("ac").siblings().removeClass("ac");
					ul.animate({"left":-index*liWidth},1000,function(){
						flag = false;
					})
				}
			})

			//下一个按钮
			goNext.on("click",function(){
				if(!flag){
					flag = true;
					index++;
					if(index >= len){
						$("#lunbo ol li").eq(0).addClass("ac").siblings().removeClass("ac");
						ul.animate({"left":-len*liWidth},1000,function(){
							//瞬间拉回第0张
							ul.css("left",0);
							index = 0;
							flag = false;
						})
					}else{
						$("#lunbo ol li").eq(index).addClass("ac").siblings().removeClass("ac");
						ul.animate({"left":-index*liWidth},1000,function(){
							flag = false;
						})
					}
				}
			})

			var timer = null;
			function auto(){
				timer = setInterval(function(){
					goNext.trigger("click");
				},5000);
			}
			auto();

			$("#div1").hover(function(){
				clearInterval(timer);
			},function(){
				auto();
			});
		}
		//执行轮播
		lunbo();

		//获取TV商品数据
		$.ajax({
      url:url.url+"/php/allGoodsInfo.php",
      type:"GET",
      dataType:"json",
			data:{"type":"TV","startlimit":0,"endlimit":3},
			success:function(data){
				var html = template("TVgoods",{data:data});
				$("#TVgoodsContent").html(html);
				$(".aBtn").on("click",function(){
					var href= "/html/detail.html?"+$(this).attr("data-id")
					window.location.href = href;
				});
			}
		});
		//获取今日商品数据
		$.ajax({
      url:url.url+"/php/allGoodsInfo.php",
      type:"GET",
      dataType:"json",
			data:{"type":"NDAY","startlimit":0,"endlimit":3},
			success:function(data){
				var html = template("NDAYgoods",{data:data});
				$("#NDAYgoodsContent").html(html);
				$(".aBtn").on("click",function(){
					var href= "/html/detail.html?"+$(this).attr("data-id")
					window.location.href = href;
				});
			}
		});
		//获取全球尖货商品数据
		var limit = 0;
		var html = null;
		var index = 0;
		var flag = false;
		function stream(limit){
			$.ajax({
				url:url.url+"/php/allGoodsInfo.php",
				type:"GET",
				dataType:"json",
				data:{"type":"MAIN","startlimit":limit,"endlimit":6},
				success:function(data){
					html = template("MAINgoods",{data:data});
					$("#MAINgoodsContent").append($(html));
					$(".aBtn").on("click",function(){
						var href= "/html/detail.html?"+$(this).attr("data-id")
						window.location.href = href;
					});
					flag = false;
				}
			});

		}
		stream(limit);

		$(window).scroll(function(){
			if($(window).scrollTop() > 2000+(462*index)){
				if(!flag){
					flag = true;
					limit += 6;
					index += 2;
					stream(limit);

				}
			}
		})

		//今日购倒计时计算
		function time(){
			var endDate = new Date(2018, 8, 16);
			var now = new Date();
			var leftTime = endDate.getTime()-now.getTime();
			var leftsecond = parseInt(leftTime/1000);
			var day1 = Math.floor(leftsecond/(60*60*24));
			var hour = Math.floor((leftsecond-day1*24*60*60)/3600);
			var minute = Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
			var second = Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);
			if(hour<10) second = "0"+ hour;
			if(minute<10) second = "0"+ minute;
			if(second<10) second = "0"+ second;
			$("#d_hour").html(hour+day1*24);
			$("#d_minute").html(minute);
			$("#d_second").html(second);
		}
		function d_time(){
			time();
			setInterval(function(){
				time();
			},1000);
		}
		d_time();



		footer.init();
	})
})
