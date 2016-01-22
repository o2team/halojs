/*
	@ author leeenx
	@ version 1.0.0
	@ data: 2015-11-11
	@ 获得当前浏览的特有前缀
	@ 直接require('prefix');即可获取
*/
define("prefix",function(require,exports,module){
	var _prefix=function(){
		//浏览器特有css样式的
		var css3_div=document.createElement("div");
		css3_div.style.cssText='-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
		if(css3_div.style.webkitTransition){
			return '-webkit-';
		}else if(css3_div.style.MozTransition){
			return '-moz-';
		}else if(css3_div.style.oTransition){
			return '-o-';
		}else if(css3_div.style.msTransition){
			return '-ms-';
		}else{
			return '';
		}
	}();
	window.$&&($.prefix=_prefix);
	return _prefix;
});