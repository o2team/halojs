/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-31
    @ 获取当前用户的所有已经预约的活动
    @ 用法: 
    $.getSubscribeList(
		{
			callback:function(json){
				//"retCode":"0",//0为已预约，10003为未预约，文档未标明未登录的错误码，估计是 10004 为未登录
			}
		}
    );
    @考虑到只有一个成员callback，所以可以直接这样调用
    $.getSubscribeList(
        function(json){
            //"retCode":"0",//0为已预约，10003为未预约，文档未标明未登录的错误码，估计是 10004 为未登录
        }
    );

    @以下是返回码
    callback({
        "retCode":"0",//返回码 0 -- 正常，13 -- 未登录，其它看错误信息
        "retMsg":"",
        "total":"6",//已预约活动总数
        "pin":"wdMBoZWyADZddo",//pin码
        activeList:
        [
            { 
                "activeId":"10006", //活动Id
                "source":"2",//来源 1为微信，2为手q
                "startTime":"2015-09-25 15:34:10",//活动开始时间
                "endTime":"2015-09-25 15:50:50",//活动结束时间
                "yuyueTime":"2015-10-08 11:37:36",//预约时间
                "skuName":"",
                "imgUrl":"",//图url
                "title":"",//标题
                "desc":"",//描述
                "url":"" ,//链接
            }
        ]
    });
*/
define("getSubscribeList",function(require,exports,module){
    var jsonp=require("jsonp"),g_tk=require("g_tk"),
    query=function(cb){
        jsonp(
            {
                data:{
                    g_tk:g_tk()
                },
                url: 'http://wq.jd.com/bases/yuyuelist/getactivelist',
                timeout: 10000,
                callback: function(json){
                    cb&&cb(json);
                }
            }
        );
    };
    module.exports=function(arg){
        var type=Object.prototype.toString.call(arg),cb;
        "[object Object]"==type?(cb=arg.callback):"[object Function]"==type&&(cb=arg);
        if("[object Function]"==Object.prototype.toString.call(cb)){
            query(cb);
        }else{
            throw("getSubscribeList: arguments parse error!");
        }
    }
});






