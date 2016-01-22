/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 拉取万金油接口数据
    @ 用法: $.dataSave(
		{
			data: {
	            biztype:'halowglogin',
	            msgcontent:'我做的测试数据',
	            platform:2 //表示环境来源 1 - 手Q 2 - 微信   如果不传这个参数，datasave会自动检测当前环境
	        },
			callback:function(json){
	            //返回的报文中，iTotalNum表示提交数据的总人数（按biztype计算）
	            //sMsgContent 当前用户提交的信息
	            //json.iRet 报文结果码， 0 -- 成功, 9999 ---- 未登录， 其它 ---- 失败
			}
		}
    );
*/

define("dataSave",function(){
	var jsonp=require("jsonp"),
	datasave=function(arg,cb){
        if(!arg)return ;
        if(typeof(cb)!="function")cb=function(){};
        if(arg.platform!="1"&&arg.platform!="2"){
            //需要自动识别环境
            var ua = navigator.userAgent.toLowerCase(),isWX = window.WeixinJSBridge;
            if(!isWX){isWX = ua.match(/micromessenger/)?true : false;}
            arg.platform=isWX?"2":"1";
        }
        jsonp({ 
            url:'http://wq.jd.com/appointment/CommonAppointSubmit',
            data:arg,
            callback:cb
        });
    };
    return function(arg){
    	if("[object Object]"!=Object.prototype.toString.call(arg)||!arg.data.biztype||!arg.data.msgcontent){
    		throw("dataSave: arguments parse error!");
    		return ;
    	}
    	datasave(arg.data,arg.callback);
    };
});