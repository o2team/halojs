/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-14
    @ 查看商品预约人数
    @ 用法如下：
    $.subscribeNumber(
        {
            sku: '2205402',
            callback:function(number,json){
                //没有结果码，无须登录
                //number预约人数，json 返回数据。能查到其它信息（如果预开始时间和结束时间等）
                alert("预约人数："+number);
            }
        }
    );
 */
 define("subscribeNumber",function(require,exports,module){
    //预约人数
    var jsonp=require("jsonp"),g_tk=require("g_tk"),
    _query=function(skuid,cb){
        if(!skuid)return ;
        jsonp({
            url:'http://yushou.jd.com/youshouinfo.action',
            data:{
                sku:skuid,
                g_ty:"ls",
                g_tk: g_tk()
            },
            callback:function(json){
                var num=json.num;
                typeof(cb)=="function"&&cb(num,json);
            }
        });
    };
    module.exports=function(arg){
        if("[object Object]"==Object.prototype.toString.call(arg)&&arg.sku){
            _query(arg.sku,arg.callback);
            return ;
        }
        throw("subscribeNumber: parse error!");
    }
 });