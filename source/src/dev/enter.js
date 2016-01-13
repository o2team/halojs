/*
	@ author leeenx
	@ version 1.0.0
	@ data: 2015-11-11
	@ klass即class，避关键字而取klass。作用是实现三个方法：hasClass,addClass,removeClass -- 兼容旧版模块。
	@ 用法如下：
	var klass=require("klass");
	klass.hasClass(dom,"klass");
*/
define(
	function(require){
		require("imgPlayer");
		//var imgplayer = $(".banner").imgPlayer({motion:"X"});
		return ;
		var imgPlayer = $.imgPlayer(
			{
				motion:"X",
				selector:".banner"
			}
		);
	}
);