/*
	@ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 作用，对比两个对象
    @ 正式用法： $.compare({obj1:obj1,obj2:obj2});
    @ 惰人用法： $.compare(obj,obj2);
*/
define("compare",function(require,exports,module){
	//compare,compareArr,compareObj三个比较函数各自负责简单对比，组合起来就是可以比较任意复杂对象
	var compare=function(obj1,obj2){
		var type1=getType(obj1),type2=getType(obj2);
		if(type1!=type2)return 0;//类型不匹配
		else if("[object Array]"==type1){
			//数组类型
			return compareArr(obj1,obj2);
		}else if("[object Object]"==type1){
			return compareObj(obj1,obj2);
		}
		return obj1===obj2;
	},
	getType=function(obj){
		return Object.prototype.toString.call(obj);
	},
	compareArr=function(arr1,arr2){
		//对比简单数组
		var len=arr1.length,len2=arr2.length;
		if(len!=len2)return 0;
		for(var i=0;i<len;++i){
			var obj1=arr1[i],obj2=arr2[i];
			if(!compare(obj1,obj2)){//不相等
				return 0;
				break;
			}
		}
		return 1;
	},
	compareObj=function(obj1,obj2){
		//对比简单对象
		for(var i in obj1){
			var _obj1=obj1[i],_obj2=obj2[i];
			if(!compare(_obj1,_obj2)){
				return 0;
				break;
			}
		}
		return 1;
	},
	_compare=function(arg){
		var type=getType(arg);
		if("[object Object]"==type){
			var obj1=arg.obj1,obj2=arg.obj2,type1=getType(obj1),type2=getType(obj2);
			if(type1==type2&&"[object Object]"==type1||"[object Array]"==type1){
				compare(obj1,obj2);
			}else if(2<=arguments.length){//惰人调用
				obj1=arguments[0],obj2=arguments[1],type1=getType(obj1),type2=getType(obj2);
				if(type1==type2&&"[object Object]"==type1||"[object Array]"==type1){
					compare(obj1,obj2);
				}
			}else{
				throw("compare: parse error!");
			}
		}else{
			throw("compare: parse error!");
		}
	};
	module.exports=_compare;
	window.$&&($.compare=_compare);
});

