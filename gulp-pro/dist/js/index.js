"use strict";require(["config"],function(){require(["popBox","template","url","header","footer"],function(f,o,n,t,a){t.init(f,n,o),function(){f("#lunbo");var t=f("#lunbo ul"),n=f("#lunbo ul li"),o=f("#lunbo ol");f("#lunbo").css({width:f(window).width(),left:-(f(window).width()-1e3)/2});var a=f("#arr_left"),l=f("#arr_right"),i=0,e=!1,s=n.length,r=n.eq(0).outerWidth();t.append(n.eq(0).clone(!0)).css("width",(s+1)*r),f("#lunbo ol").css({left:f(window).width()-1e3});for(var c=0;c<s;c++)f("<li class='"+(0==c?"ac":"")+"'></li>").appendTo(o);f(".scroll_div").hover(function(){f("#arr_left,#arr_right").fadeIn()},function(){f("#arr_left,#arr_right").fadeOut()}),f("#lunbo ol li").on("mousemove",function(){e||(e=!0,f(this).addClass("ac").siblings().removeClass("ac"),t.animate({left:-f(this).index()*r},700,function(){e=!1}),i=f(this).index())}),a.on("click",function(){e||(e=!0,--i<0&&(t.css("left",-s*r),i=s-1),f("#lunbo ol li").eq(i).addClass("ac").siblings().removeClass("ac"),t.animate({left:-i*r},1e3,function(){e=!1}))}),l.on("click",function(){e||(e=!0,s<=++i?(f("#lunbo ol li").eq(0).addClass("ac").siblings().removeClass("ac"),t.animate({left:-s*r},1e3,function(){t.css("left",0),i=0,e=!1})):(f("#lunbo ol li").eq(i).addClass("ac").siblings().removeClass("ac"),t.animate({left:-i*r},1e3,function(){e=!1})))});var d=null;function u(){d=setInterval(function(){l.trigger("click")},5e3)}u(),f("#div1").hover(function(){clearInterval(d)},function(){u()})}(),f.ajax({url:n.url+"/php/allGoodsInfo.php",type:"GET",dataType:"json",data:{type:"TV",startlimit:0,endlimit:3},success:function(t){var n=o("TVgoods",{data:t});f("#TVgoodsContent").html(n),f(".aBtn").on("click",function(){var t="/html/detail.html?"+f(this).attr("data-id");window.location.href=t})}}),f.ajax({url:n.url+"/php/allGoodsInfo.php",type:"GET",dataType:"json",data:{type:"NDAY",startlimit:0,endlimit:3},success:function(t){var n=o("NDAYgoods",{data:t});f("#NDAYgoodsContent").html(n),f(".aBtn").on("click",function(){var t="/html/detail.html?"+f(this).attr("data-id");window.location.href=t})}});var l=0,i=null,e=0,s=!1;function r(t){f.ajax({url:n.url+"/php/allGoodsInfo.php",type:"GET",dataType:"json",data:{type:"MAIN",startlimit:t,endlimit:6},success:function(t){i=o("MAINgoods",{data:t}),f("#MAINgoodsContent").append(f(i)),f(".aBtn").on("click",function(){var t="/html/detail.html?"+f(this).attr("data-id");window.location.href=t}),s=!1}})}function c(){var t=new Date(2018,8,16),n=new Date,o=t.getTime()-n.getTime(),a=parseInt(o/1e3),l=Math.floor(a/86400),i=Math.floor((a-24*l*60*60)/3600),e=Math.floor((a-24*l*60*60-3600*i)/60),s=Math.floor(a-24*l*60*60-3600*i-60*e);i<10&&(s="0"+i),e<10&&(s="0"+e),s<10&&(s="0"+s),f("#d_hour").html(i+24*l),f("#d_minute").html(e),f("#d_second").html(s)}r(l),f(window).scroll(function(){f(window).scrollTop()>2e3+462*e&&(s||(s=!0,e+=2,r(l+=6)))}),c(),setInterval(function(){c()},1e3),a.init()})});