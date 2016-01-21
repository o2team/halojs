/*
	@ author leeenx
	@ version 1.0.0
	@ data: 2015-11-11
	@ 取当前节点的css样式或设置当前节点的样式 -- 为了兼容旧式模块
	@ 用法如下：
	var css=require("css");
	css(dom,"index");
*/
define("css",function(require,exports,module){
	'use zeptojs';
	var _get=function (elem,name,value)
	{
	    if(!!elem)
	    {
	        if(name.constructor!=String){return ;}
	        var prop=name.replace(/\-([a-z]{1})/g,function(matchStr,$1){return $1.toUpperCase();});
	        if(typeof(value)!="undefined")
	        {/*赋值操作*/
	            if(prop=='scrollLeft'||prop=='scrollTop'){/*将scrollLeft和scrollTop做特殊处理*/
	                elem[prop]=value;
	                return ;
	            }
	            elem.style[prop]=value;
	            if(prop=='opacity' && document.all){
	                elem.style.filter='alpha(opacity:'+(value*100)+')';
	            }
	        }else{/*取值操作*/
	            if(prop=='scrollLeft'||prop=='scrollTop'){/*将scrollLeft和scrollTop做特殊处理*/
	                return elem[prop];
	            }
	            if(document.all)
	            {
	                if('opacity'==prop){
	                    var opacity= elem.currentStyle['filter'].replace(/[a-zA-Z\s\(\)\:]/g,'');
	                    opacity=parseFloat(opacity),opacity=isNaN(opacity)?1:opacity*0.01;
	                    return opacity;
	                }
	                return elem.currentStyle[prop];
	            }else{
	                return document.defaultView.getComputedStyle(elem,null)[name];
	                //目前有bug。与zeptojs一样。返回transform是将返回matrix或是matrix3d
	            }
	        }
	    }
	}
	//不需要Zepto扩展
	return _get;
});