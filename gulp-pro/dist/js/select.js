"use strict";require(["config"],function(){require(["popBox","template","url","header","footer"],function(e,l,o,t,n){t.init(e,o,l);var i=decodeURI(location.search).split("=")[1],a=0,c=0,s=!1;function r(t){e.ajax({url:o.url+"/php/selectGoods.php",type:"GET",dataType:"json",data:{keywords:i,startlimit:t,endlimit:6},success:function(t){if(""!=t){var o=l("selectGoods",{data:t});e("#selectContent").append(e(o)),e(".aBtn").on("click",function(){var t="/html/detail.html?"+e(this).attr("data-id");window.location.href=t})}else{o=l("selectNull",{data:t});e("#selectNullContent").html(o)}}})}r(a),e(window).scroll(function(){console.log(e(window).scrollTop()),e(window).scrollTop()>700+435*c&&(s||(s=!0,c+=2,r(a+=6)))}),n.init()})});