/*
	@ author leeenx
	@ version 1.0.0
	@ data: 2015-11-11
	@ 获取css3样式中的tranform样式，并按指定的key键(translate,scale或rotate)返回对应的值
	@ 用法如下：
*/
define("getTransfromValue",function(require,exports,module){
	'use zeptojs';
	var _get=function(){
		var transform=arguments[0],key=arguments[1],index=arguments[2],prefix=require(prefix),css=require("css");
		if(typeof(transform)!="string" && typeof(transform)=="object"){
			transform=css(transform,"transform")||css(transform,prefix+"transform")||;
		}
	    //transform即transform的所有属性,key键名，index_arr按数组索引取value
	    key=key.replace(/\-/g,'\\-');
	    var index_list=[0];
	    if(arguments.length>2){
	        for(var i=2;i<arguments.length;++i){
	            index_list[i-2]=arguments[i];
	        }
	    }
	    if('none'==transform||''==transform)return null;//没有值，直接中断
	    var reg=new RegExp(key+'\\(([^\\)]+)\\)','ig'),key_value=transform.match(reg),value_list=[],ret=[];
	    if(key_value&&key_value.length>0){
	        key_value=key_value[0];
	        value_list=key_value.replace(reg,'$1').split(',');
	        for(var i=0;i<index_list.length;++i){
	            ret.push(value_list[index_list[i]]);
	        }
	    }
	    if(ret.length==1)ret=ret[0];
	    else if(index)ret=ret[index];
	    return ret;
	};
	return _get;
});