/*
	@ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 作用: object/array类型对象的更新
    @ 用法： 
    $.objectUpdate(//对象更新
		{
			obj1: obj1,
			obj2: obj2,
			incremental: 1//是否增量更新，默认为1。如果为0，当前方法相当于obj1是obj2的深度拷贝
		}
    );
    //简单的用法：
    $.objectUpdate(obj1,obj2[,incremental]);
*/
define("objectUpdate",function(require,exports,module){
	var getType=function(obj){
		return Object.prototype.toString.call(obj);
	},
	isObject=function(obj){
		return "[object Object]"==Object.prototype.toString.call(obj);
	},
	isArray=function(obj){
		return "[object Array]"==Object.prototype.toString.call(obj);
	},
	incremental=1,
	copyObj=function(obj1,obj2,incremental){
		for(var i in obj2){
			if(obj1[i]!=obj2[i]){
				//如果类型不对，obj1需要强制转换成obj2
				isObject(obj2[i])
				?
				(isObject(obj1[i])||(obj1[i]={}),copyObj(obj1[i],obj2[i]))
				:
				(
					isArray(obj2[i])
					?
					(isArray(obj1[i])||(obj1[i]=[]),copyArr(obj1[i],obj2[i]))
					:
					(/*即不是object也不是array*/
						obj1[i]=obj2[i]
					)
				);
			}
		}
		if(incremental)return ;//如果是增量更新，在此中断
		for(var i in obj1){
			if(typeof(obj2[i])=="undefined"){
				delete obj1[i];//删除obj2中不存在的成员
			}
		}
	},
	copyArr=function(arr1,arr2,incremental){
		for(var i=0,len=arr2.length;i<len;++i){
			if(arr1[i]!=arr2[i]){
				//如果类型不对，arr1需要强制转换成arr2
				isObject(arr2[i])
				?
				(isObject(arr1[i])||(arr1[i]={}),copyObj(arr1[i],arr2[i]))
				:
				(
					isArray(arr2[i])
					?
					(isArray(arr1[i])||(arr1[i]=[]),copyArr(arr1[i],arr2[i]))
					:
					(/*即不是object也不是array*/
						arr1[i]=arr2[i]
					)
				);
			}
		}
		if(incremental)return ;//如果是增量更新，在此中断
		if(arr1.length>arr2.length){
			//需要删除多余的长度
			arr1.splice(arr2.length,arr1.length);
		}
	};
	module.exports=function(arg){
		var argLen=arguments.length;
		if(argLen<=0)return ;
		argLen>=2&&(arg={obj1:arguments[0],obj2:arguments[1],incremental: typeof(arguments[2])=="undefined"?incremental:arguments[2]});
		arg="[object Object]"!=getType(arg)?{}:arg;//保证为object类型
		var type1=getType(arg.obj1),type2=getType(arg.obj2);
		if("[object Object]"!=type1&&"[object Array]"!=type1){
			throw("objectUpdate fail! Invalid type!");
			return ;
		}
		if(type1!=type2){
			throw("objectUpdate fail! Can't update different type");
			return ;
		}
		"[object Object]"==type1?copyObj(arg.obj1,arg.obj2,arg.incremental):copyArr(arg.obj1,arg.obj2,arg.incremental);
	};
	window.$&&($.objectUpdate=module.exports);
});