/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-14
    @ 活动预约
    @ 用法如下：
    $.subscribeActive(
        {
            activeId: '173',//可以同时预约多个活动，不过上限是20个。多个活动预约的方式：activeId: "xxx,xxx,xxx"
            cb:function(json){
                //"retCode":"", 返回码，正常返回为空，13为未登录，10001参数错误，其他为系统错误
                //"replyCode":"0", 0预约成功 10006重复预约，10007不是预约活动，10008预约已结束，10009预约还未开始
            }
        }
    );
    @ 如果是单activeId预约，subscribeActive会将retCode指向replayCode
    @ 多activeId预约，retCode:"0" -- 预约成功,"-1" -- 部分预约失败
    @ 代码会自动把返回正常结果码由""转成"0"(多活动也是)
 */
 define("subscribeActive",function(require,exports,module){
    var wqlogin=require("wqlogin"),jsonp=require("jsonp"),g_tk=require("g_tk");
        module.exports=function(arg){
            if("[object Object]"!=Object.prototype.toString.call(arg)){
                return ;
            }
            var activeId=(arg.activeId||'')+'',activeIdCount=activeId?(activeId.split(",")).length:0;
            if(activeIdCount<=0){
                console.log("no activeId!");
                return;
            }
            else if(activeIdCount>20){
                console.log("too many activeId!");
                return ;
            }
            jsonp(
                {
                    url:"http://wq.jd.com/bases/yuyue/active",
                    data:{
                        activeId:activeId,
                        g_tk: g_tk()
                    },
                    callback:function(json){
                        if('parseerror'==json)json={retCode:'13'};
                        json.retCode==""&&(json.retCode="0");
                        if("0"==json.retCode){
                            if(1==json.list.length){
                                //单activeId情况
                                json.retCode=json.list[0].replyCode;//使用replyCode做retCode
                                json.retMsg=json.list[0].replyMsg;
                            }else if(json.list.length>1){
                                //多activeId情况
                                for(var i=0,len=json.list.length;i<len;++i){
                                    if("0"!=json.list[i].replyCode&&"10006"!=json.list[i].replyCode){
                                        json.retCode="-1";break;//中断出来
                                    }
                                }
                            }
                        }
                        typeof(arg.cb)=='function'&&arg.cb(json);
                    },
                    timeout:100000
                },'utf-8'
            );
        }
 });