define(function(){
  // function $(){};

  $.extend({
    myAlert:function(txt,flag,fn){
      //调用遮罩层，同时接收这个对象
      var $modal = $.modalLayer();
      var $div = $('<div class="popBox"><h4>提示</h4><span class="closeBtn">X</span><p class="popCont">'+ txt +'</p><p class="btnBar"><button>确定</button></p></div>');
      /*$(document.body).append($div);
      $div.showCenter({top:-100,left:0});
      $div.drag();*/

      $div.appendTo($(document.body)).showCenter().drag("h4");


      //事件委托给X和确定按钮写点击
      $div.on("click",".closeBtn,.btnBar button",function(){
        //删除
        $div.remove();
        $modal.remove();
      })
      if(flag && flag == true){
        setTimeout(function(){
          $div.remove();
          $modal.remove();
        },1000);
      }
      fn && fn();
    },
    myConfirm:function(txt,okCb,cancelCb){
      var $modal = $.modalLayer();
      var $div = $('<div class="popBox"><h4>提示</h4><p class="popCont">'+ txt +'</p><p class="btnBar"><button>确定</button><button>取消</button></p></div>');
      $div.appendTo($(document.body)).showCenter().drag("h4");

      $div.on("click",".btnBar button",function(){
        if($(this).index()){
          //取消按钮
          $div.remove();
          $modal.remove();
          cancelCb && cancelCb();
        }else{
          $div.remove();
          $modal.remove();
          okCb && okCb();
        }
      })

    },
    // myPrompt:function(txt,cb){
    //   var $modal = $.modalLayer();
    //   $div = $('<div class="popBox"><h4>'+ txt +'</h4><span class="closeBtn">X</span><p class="popCont"><textarea></textarea></p><p class="btnBar"><button>确定</button></p></div>');
    //   $div.appendTo($(document.body)).showCenter().drag("h4");
    //
    //   $div.on("click",".closeBtn,.btnBar button",function(){
    //     if($(this).hasClass("closeBtn")){
    //       $div.remove();
    //       $modal.remove();
    //     }else{
    //       //取textarea的值
    //       var val = $div.find("textarea").val();
    //       cb && cb(val);
    //       $div.remove();
    //       $modal.remove();
    //     }
    //   })
    //
    // },
    modalLayer:function(){
      //遮罩层
      var $div = $("<div>");
      $div.css({
        "position":"fixed",
        "left":0,
        "top":0,
        "background":"rgba(0,0,0,.3)",
        "width":"100%",
        "height":"100%",
        "zIndex":1000
      }).appendTo($(document.body));
      return $div;
    }
  });

  $.fn.extend({
    showCenter:function(obj){
      var _this = this;
      //窗口大小发生变化的时候继续居中
      $(window).on("resize",center);
      function center(){
        var left = ($(window).innerWidth() - $(_this).outerWidth())/2 + (obj ? obj.left : 0);
        var top  =($(window).innerHeight() - $(_this).outerHeight())/2 - 150;
        $(_this).css({
          left:left,
          top:top
        });
      };
      center();
      return $(this);
    },
    drag:function(handler){
      //$(this)
      var _this = $(this);
      var $title = handler ? $(this).find(handler) : $(this);

      $title.on("mousedown",function(e){

        var disX = e.pageX - _this.offset().left;
        var disY = e.pageY - _this.offset().top;
        $(document).on("mousemove",function(e){
          var left = e.pageX - disX;
          var top = e.pageY - disY;
          if(left < 0) left = 0;
          if(top < 0) top = 0;
          if(left > $(window).innerWidth() - _this.outerWidth()) left = $(window).innerWidth() - _this.outerWidth();
          if(top > $(window).innerHeight() - _this.outerHeight()) top = $(window).innerHeight() - _this.outerHeight();
          _this.css({
            left:left,
            top:top
          })
        })
        $(document).on("mouseup",function(){
          $(this).off("mousemove");
        })
      })

    }
  })

  return $;
})
