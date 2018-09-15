require.config({
	//根目录
	baseUrl: "/",
	//路径
	paths: {
		"jquery": "libs/jquery-1.12.4",
		"tab": "module/tab",
		"toast": "module/toast",
		"template": "libs/template-web",
		"url": "module/url",
		"header":"module/header",
		"footer":"module/footer",
		"md5":"libs/md5",
		"popBox":"module/popBox",
		"jqcookie":"module/jquery.cookie"
	},
	//垫片
	shim: {
		toast:{
			deps:["jquery"]
		},
		header:{
			deps:["jquery","url","template"]
		},
		footer:{
			deps:["jquery"]
		},
		popBox:{
			deps:["jquery","jqcookie"]
		}

	}
})
