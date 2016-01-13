/*
	@ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 门神验证码
    @ 用法:
    var g_tk=$.g_tk();
*/
define("g_tk",function(require,exports,module){
	var cookie=require("cookie");
	return function(str){
		var skey=cookie("skey")||cookie("wq_skey")||cookie("wg_skey")||cookie("p_skey");
		str=str||skey||'';
		for(var i=0,len=str.length,hash=5381;i<len;++i){hash+=(hash<<5)+str.charAt(i).charCodeAt();};return hash&0x7fffffff;
	}
});