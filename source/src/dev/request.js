/*
	@ author leeenx
	@ version 1.0.0
	@ data: 2015-12-07
	@ 获得当前url的参数
	@ 使用方法：
	var request=require("request");
	request();//以key-value的形式返回所有的参数
	request("key");//返回指定key值的value
*/
define("request",function(require,exports,module){
	'use zeptojs';
	var _request=function(){
		//var lhref=window.location.href,startindex=lhref.indexOf("?")+1,endindex=lhref.indexOf('#')>-1?lhref.indexOf('#'):lhref.length,parameters=lhref.substring(startindex,endindex),keyvalue=parameters.split("&"),requestPara={};
		var _search=location.search,requestPara={};
		if(_search){
			var parameters=_search.replace(/^\?/,''),keyvalue=parameters.split("&");
			for(i in keyvalue)
			{
				var key=keyvalue[i].split("=");
				requestPara[key[0]]=key[1]||'';
			}
		}
		return function(name){
			if(typeof(name)=='string')
				return requestPara[name];
			else
				return requestPara;
		};
	}();
	module.exports=_request;
});