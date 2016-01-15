/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 查询预约结果。单活动验证，如果是多活动验证，可以使用getSubscribeList.js来获取所有的预约活动来做筛选
    @ 用法: 
    $.querySubscribe(
		{
			activeId: '10001',
			callback:function(json){
				//"retCode":"0",//0为已预约，10003为未预约，文档未标明未登录的错误码，估计是 10004 为未登录
			}
		}
    );
*/
define("querySubscribe",function(require,exports,module){
	var jsonp=require("jsonp"),g_tk=require("g_tk"),
	query=function(activeId,cb){
        jsonp({
            url:'http://wq.jd.com/bases/yuyue/activeResult',
            data:{
                activeId:activeId,
                g_tk: g_tk()
            },
            callback:function(json){
                if('parseerror'==json)json={errNo:-1,errMsg:'parseerror'};
                typeof(cb)=="function"&&cb(json);
            }
        });
    };
    module.exports=function(arg){
    	if("[object Object]"==Object.prototype.toString.call(arg)){
    		//对象
    		if(arg.activeId){
    			query(arg.activeId,arg.callback);
                return ;
    		}
    	}
    	throw("querySubscribe: arguments parse error!");
    }
});