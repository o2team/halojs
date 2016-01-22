/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 向url插入新的参数
    @ 用法： $.urlAppend({k:"key",v:"value"});
    @ 可以同时插入多个参数 $.urlAppend([{k:"key",v:"value"},...]);
*/

define("urlAppend",function(require,exports,module){
	var _urlAppend=function(arg,hasPara){//添加单个参数
		var k=arg.k,v=arg.v,reg=/^[a-z0-9\_\-\%\.\!\|]+$/i;
		if(!k||!v||!reg.test(k)||!reg.test(v))return '';//没有键名和键值
		return hasPara?"&"+k+"="+v:"?"+k+"="+v;
	};
	module.exports=function(arg){
		//支持多个参数
		var url=arg.url||'',hash='',hashIndex=url.indexOf("#"),kvs=arg.kvs||[],type=Object.prototype.toString.call(arg.kvs),res='';
		if(type === '[object Array]'){
			//array
			for(var i=0,len=kvs.length;i<len;++i){
				res+=_urlAppend(kvs[i],0==i?url.indexOf("?")>-1:1);
			}
		}else if(type === '[object Object]'){
			//直接就是object
			res+=_urlAppend(kvs,url.indexOf("?")>-1);
		}
		if(hashIndex>-1){
			//有hash值
			hash=url.substring(hashIndex,url.length);
			url=url.substring(0,hashIndex);
		}
		res=url+res+hash;
	    return res;
	};
	window.$&&($.urlAppend=_urlAppend);
});