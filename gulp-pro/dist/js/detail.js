"use strict";require(["config"],function(){require(["popBox","template","url","header","footer"],function(i,e,a,o,t){o.init(i,a,e);var n=i.cookie("user").split(".")[1],c=decodeURI(location.search).split("?")[1];i.ajax({url:a.url+"/php/goodsInfo.php",type:"GET",dataType:"json",data:{goodNum:c},success:function(o){var t=e("goodImg",{data:o});i("#goodImgContent").html(t);t=e("goodInfo",{data:o});i("#contentList").html(t);t=e("details",{data:o});i("#detailsContent").html(t),console.log(o),i("#lkImgs li img").on("click",function(){i("#img").attr("src",i(this).attr("src")),i("#bigimg img").attr("src",i(this).attr("src")),i(this).parent().addClass("active").siblings().removeClass("active")}),i("#box").on("mousemove",function(o){i("#zoom").css({display:"block"}),i("#bigimg").css({display:"block"});var t=o.pageX-i("#box").offset().left-i("#zoom").width()/2,s=o.pageY-i("#box").offset().top-i("#zoom").height()/2;t<0&&(t=0),s<0&&(s=0),t>i("#box").width()-i("#zoom").width()&&(t=i("#box").width()-i("#zoom").width()),s>i("#box").height()-i("#zoom").height()&&(s=i("#box").height()-i("#zoom").height()),i("#bigimg img").css({left:-2*t}),i("#bigimg img").css({top:-2*s}),i("#zoom").css({left:t+"px"}),i("#zoom").css({top:s+"px"}),i("#box").on("mouseleave",function(){i("#zoom").css({display:"none"}),i("#bigimg").css({display:"none"})})});var s=i("#goodsNumberInput").val();i("#lessBtn").on("click",function(){--s<=1&&(i("#lessBtn").addClass("limit"),s=1),i("#goodsNumberInput").val(s)}),i("#addBtn").on("click",function(){i("#lessBtn").removeClass("limit"),s++,i("#goodsNumberInput").val(s)}),i("#addCart").on("click",function(){n?i.ajax({url:a.url+"/php/addCart.php",type:"GET",dataType:"json",data:{userid:n,goodNum:c,num:i("#goodsNumberInput").val()},success:function(o){i.ajax({url:a.url+"/php/cartNum.php",type:"GET",dataType:"json",data:{userid:n},success:function(o){var t=e("goodNum",{data:o});i("#contentNum").html(t),setTimeout(function(){i.myAlert("添加购物车成功!",!0)},200)}})}}):i.myAlert("亲！请先登录!",!0)})}}),i("#tab_select a").on("click",function(){i(this).addClass("active").siblings().removeClass("active")}),t.init()})});