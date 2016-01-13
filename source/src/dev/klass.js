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
	"klass",
	{
		addClass : function(elem,_class){
			var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
			if(!className)elem.className=_class;
			else if(classReg.test(className))return;
			else elem.className=className+' '+_class;
		},
		removeClass : function(elem,_class){
			var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
			className=className.replace(classReg,function(k,$1,$2,$3,$4){if($2)return ' ';else return '';});
			elem.className=className;
		},
		hasClass:function(elem,_class){
			var className=elem.className,classReg=new RegExp('(^'+_class+'\\s+)|(\\s+'+_class+'\\s+)|(\\s+'+_class+'$)|(^'+_class+'$)','g');
			if(classReg.test(className))return true;
			else return false;
		}
	}
);