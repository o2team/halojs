/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 获取当前url下的签名信息。在获取到签名后才能调用微信的各种接口，详情可以查看:  http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS%E6%8E%A5%E5%8F%A3
    @ 用法: 
    $.fetchWXSign(
    	function(arg){
            console.log(obj);
            //返回的对象obj是如下信息：
            //{
            //    errCode:"0",
            //    errMsg:"",
            //    appId:"wxae3e8056daea8727",//wqs.jd.com的appid。这个appid是固定的，可以用于其它需要appid的地方
            //    timestamp:"1445159790",//签名的时间戳 - 有效期为：7200s
            //    nonceStr:"1465087326",//生成签名的随机串
            //    signature:"badd9b625540a1432608d128c177dd253306e67c",//签名
            //    jsapi_ticket:""
            //}
        }
    );
*/
define("fetchWXSign",function(require,exports,module){
    var lock=0,
    jsonp=require("jsonp"),
    url=location.href.split("#")[0],
    eurl=encodeURIComponent(url),
    _eurl='_wx_signature'+eurl,//主站是以这种形式存储的
    ajax=function(cb){
        var api='http://wq.jd.com/bases/jssdk/GetWxJsApiSign';
        jsonp(
            {
                url:api,
                data:{
                    url:eurl
                },
                callback:function(json){
                    cb&&cb(json);
                }
            }
        );
    },
    getsign=function(cb){
        if(lock)return ;
        lock=1;
        var unsupport=typeof(sessionStorage)=='undefined',
            sessionJson={},
            _ajax=function(){
                ajax(function(json){
                    lock=0;
                    if(!unsupport){
                        //支持sessionStorage，将数据添加到sessionStorage中
                        sessionJson[_eurl]=json;
                        sessionStorage._wx_api_store=JSON.stringify(sessionJson);
                    }
                    cb&&cb(json);
                });
            };
        if(unsupport||!sessionStorage._wx_api_store){
            unsupport&&console.log("不支持sessionStorage");
            _ajax();
        }else if(sessionStorage._wx_api_store){
            sessionJson=JSON.parse(sessionStorage._wx_api_store);
            if(sessionJson[_eurl]&&(new Date().getTime()-parseInt(sessionJson[_eurl].timestamp)*1000<7200*1000)){
                cb&&cb(sessionJson[_eurl]);
                lock=0;
            }else{
                _ajax();
            }
        }
    };
    module.exports=getsign;
});