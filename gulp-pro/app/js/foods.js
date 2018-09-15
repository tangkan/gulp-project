//首先引入config
require(["config"],function(){
	//再引入依赖的模块
	require(["jquery","template","url","header","footer"],function($,template,url,header,footer){
		//引入header.html
		header.init(function(){
      $("#foodsLi").addClass("ac");
      console.log($("#foodsLi"));

    });
		footer.init();
	})
})
