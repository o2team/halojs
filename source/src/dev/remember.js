/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 记住页面上次浏览的位置
    @ 用法：$.remember();
*/
define("remember",function(require,exports,module){
	if(!window.localStorage){
		return ;//不支持localStorage
	}
	var url=location.protocol+"//"+location.host+location.pathname+location.search;//当前的url，不包括hash值
	window.onunload=function(){
		//刷新页面前记住位置
		var _st=document.body.scrollTop;
		localStorage[url]=_st;
	};
	var st=parseInt(localStorage[url])||0;
	if(st){
		var tmp=document.createElement('div');//定位元素，防止加载未完成而无法正确定位
		var ch=document.documentElement.clientHeight||document.body.clientHeight;
		tmp.style.cssText='position:absolute; width:1px; height:1px; left:1px; top:'+(st+ch-1)+'px;';
		document.body.appendChild(tmp);
	}
	//window.scroll(0,st);
	document.body.scrollTop=st;
	delete localStorage[url];
});