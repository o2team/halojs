/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 通过skuid查询微信手Q下预约商品的三个关键参数：cosspresaleid,globalpresaleid,salestarttime。
    @ 用法: 
    $.queryPreSaleSKU(
    	{
			skuid: '2205402',
			callback: function(arr){
		        if(arr.length){
		            //返回成功
		        }
		    }
    	}
    );
*/

define("queryPreSaleSKU",function(require,exports,module){
    var url="http://wq.jd.com/bases/presalesku/querypresalesku",ua = navigator.userAgent.toLowerCase(),isWX = window.WeixinJSBridge;
    if(!isWX){isWX = ua.match(/micromessenger/)?true : false;}
    var jsonp=require("jsonp"),g_tk=require("g_tk"),
    query=function (skuid,cb){
        if(!skuid)return ;
        jd='undefined'==typeof(query.jd)?true:!!query.jd;
        cb=typeof(cb)=='function'?cb:function(){};
        url="http://wq.jd.com/bases/presalesku/querypresalesku";
        var source="1";//场景：1 - 微信 2 - 手Q
        if('wx'==query.type){//强指微信类型
            source="1";
        }else if('qq'==query.type){//强指手Q类型
            source="2";
        }else{//未强指类型
            source=isWX?"1":"2";
        }
        jsonp({
            url:url,
            data:{
                skuid:skuid,
                source:source,
                g_tk:g_tk(),
                g_ty:'ls'//以何种形式请求的，ls即loadScript
            },
            callback:function(json){
                if('parseerror'==json)json={retCode:-1};
                var ret=json.retCode;
                if('0'==ret){
                    //请求成功
                    var cosspresaleid=json.data.presale_id||'0',globalpresaleid=json.data.global_presale_id||'0',salestarttime=json.data.sale_start_time||'';
                    cb([skuid,cosspresaleid,globalpresaleid,salestarttime]);
                }else{
                    //失败
                    cb([]);
                }
            },
            timeout:10000
        });
    };
    module.exports=function(arg){
    	query(arg.skuid||arg.sku,arg.callback);
    }
});