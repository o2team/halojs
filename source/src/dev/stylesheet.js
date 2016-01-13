/*
	@ author leeenx
	@ version 1.0.0
	@ create: 2015-11-11
	@ modify: 2015-12-05
	@ 动态创建css样式
	@ modify: 全面弃用inserRule方法（因为inserRule方法将会产生夸域的问题）。
	@ 用法如下：
	var stylesheet=require("stylesheet");
	var styleid=stylesheet.add('.PAGE_DRAG_KEEP{ransition:transform .2s linear;}');
	stylesheet.remove(styleid);//删除样式
*/
define("stylesheet",function(require,exports,module){
	var style=document.createElement("style"),head=document.getElementsByTagName("head")[0],records=[],total=0;
	head.appendChild(style);
	var add=function(cssText){
		records.push(cssText);
		style.innerHTML=records.join("\r\n");//插入记录
		total=records.length;
		return total-1;
	},
	remove=function(n){
		if(typeof(n)=="number"){
			total>=n&&(records[n]='');//超过记录数不做记录
		}else if(typeof(n)=="string"){
			//可能是直接传样式字符串
			for(var i=0;i<total;++i){
				if(records[i]==n){
					records[i]='';
					break;//结束
				}
			}
		}
		style.innerHTML=records.join("\r\n");//插入记录
	},
	mix=function(arg){
		//混合模式
		var type=Object.prototype.toString.call(arg);
		"[object String]"==type&&(arg={css:arg,type:arguments[1]},type="[object Object]");
		if("[object Object]"==type){
			//格式正确
			if(arg.css){
				var operation=arg.type=="delete"?"delete":"add";
				"delete"==arg.type?remove(arg.css):add(arg.css);
				return ;
			}
		}
		throw("stylesheet: arguments parseerror!");
	};
	
	$&&($.stylesheet=mix);
	module.exports={add:add,remove:remove};
});