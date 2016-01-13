/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 拉取万金油接口数据
    @ 用法: $.dataQuery(
		{
			data: {
				biztype:'halowglogin'
			},
			callback:function(json){
	            //返回的报文中，iTotalNum表示提交数据的总人数（按biztype计算）
	            //sMsgContent 当前用户提交的信息
	            //json.iRet 报文结果码， 0 -- 成功, 9999 ---- 未登录， 其它 ---- 失败
			}
		}
    );
*/
define("dataQuery",function(require,exports,module){
	var jsonp=require("jsonp"),g_tk=require("g_tk"),
	dataquery=function(arg,cb){
	    if(!arg)return ;
	    if(typeof(cb)!="function")cb=function(){};
	    if(arg.platform!="1"&&arg.platform!="2"){
	        //需要自动识别环境
	        var ua = navigator.userAgent.toLowerCase(),isWX = window.WeixinJSBridge;
	        if(!isWX){isWX = ua.match(/micromessenger/)?true : false;}
	        arg.platform=isWX?"2":"1";
	    }
	    arg.g_tk=g_tk();
	    jsonp({ 
	        url:'http://wq.jd.com/appointment/CommonAppointQuery',
	        data:arg,
	        callback:cb
	    });
	};
	return function(arg){
		if(!arg||!arg.data||!arg.data.biztype)return ;
		dataquery(arg.data,arg.callback);
	};
});


