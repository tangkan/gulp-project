//引入config
require(["config"],function(){
  //引入其他依赖模块
  require(["popBox","template","url","header","footer"],function($,template,url,header,footer){
    header.init1($,url,template);
    //获取cookie中的userId
    var userId = $.cookie("user").split(".")[1];
    //main
    //请求后台商品数据
    $.ajax({
      url:url.url+"/php/goodsList.php",
      type:"GET",
      dataType:"json",
      data:{"userid":userId},
      success:function(data){
        //当有商品的时候
        if(data.length>0){
        //计算总价格，并计算总价格
        function sum(data){

          var html = template("cartGoods",{data:data});
          $("#cartGoodsContent").html(html);
          //按钮事件重新绑定
          lessBtn(data);
          addBtn(data);
          delBtn(data);
          check();
          allPrice();

        }
        sum(data);


        //计算总金额
        function allPrice(){
          var allPrice = 0;
          $(".checkBtn").each(function(){
            if($(this).is(":checked")){
              allPrice += parseInt($(this).parent().siblings(".c_sum").children().children().html());
            }else{
              allPrice +=0;
            }
          });
          var html1 = template("allPrice",{allPrice:allPrice});
          $("#allPriceContent").html(html1);
        }

        //选择框功能
        function check(){
          var n = 0;
          $("#allCheck").on("click",function(){
            //全选
            if($(this).is(":checked")){
              for(var i = 0; i < $(".checkBtn").length; i++){
                $(".checkBtn").prop("checked",true);
                n =  $(".checkBtn").length;
              }
            }else{
              for(var i = 0; i < $(".checkBtn").length; i++){
                $(".checkBtn").prop("checked",false);
                n =  0;
              }
            }

            //每次点击后再次计算总金额
            allPrice();
          })

          //单选时判断全选按钮是否选中
          for(var i = 0; i < $(".checkBtn").length; i++){
        		$(".checkBtn").on("click",function(){
              if($(this).is(":checked")){
                n++;
              }else{
                n--;
              }

              if(n == $(".checkBtn").length){
                $("#allCheck").prop("checked",true);
              }else{
                $("#allCheck").prop("checked",false);
              }
              //每次点击后再次计算总金额
              allPrice();
            })
        	}

        }



        //更新数据库
        function updateNum(thisNum,index){
          $.ajax({
            url:url.url+"/php/goodNum.php",
            type:"GET",
            dataType:"json",
            data:{"userid":userId,"goodNum":thisNum,"num":index},
            success:function(data){
              //成功后再次渲染页面
              sum(data);

            }
          }
          );
        }

        // 给数量的加减添加点击事件
        //减少数量
        function lessBtn(data){
          for(var i = 0; i < data.length; i++){
            var lessBtn = "#lessBtn"+data[i].goodNum;
            $(lessBtn).on("click",function(){
              var index = $(this).parent().siblings(".goodNumber").children().val();
              index--;
              if(index <= 1){
                index = 1;
              }
              //获取当前商品的goodNum
              var thisNum = $(this).siblings().val();
              // 更新数据库
              updateNum(thisNum,index);
            })
          }
        }


        //增加数量
        function addBtn(data){
          for(var i = 0; i < data.length; i++){
            var addBtn = "#addBtn"+data[i].goodNum;
            $(addBtn).on("click",function(){
              var index = $(this).parent().siblings(".goodNumber").children().val();
              index++;
              //获取当前商品的goodNum
              var thisNum = $(this).siblings().val();
              // 更新数据库
              updateNum(thisNum,index);
            })
          }
        }


        //删除按钮添加事件
        function delBtn(data){
          for(var i = 0; i < data.length; i++){
            var delBtn = "#delBtn"+data[i].goodNum;
            $(delBtn).on("click",function(){
              //获取当前商品的goodNum
              var thisNum = $(this).siblings().val();
              //删除数据操作
              $.ajax({
                url:url.url+"/php/delGood.php",
                type:"GET",
                dataType:"json",
                data:{"userid":userId,"goodNum":thisNum},
                success:function(data){
                  if(data.length>0){
                    sum(data);
                  }else{
                    console.log(data.length)
                    //如果没有数据则渲染空页面
                    var html = template("cartNull");
                    $("#cartGoodsContent").html(html);
                  }
                }
              });
            })
          }
        }


      }else{
        //如果没有数据则渲染空页面
        var html = template("cartNull");
        $("#cartGoodsContent").html(html);
      }
    }
  });


    footer.init();
  })
})
