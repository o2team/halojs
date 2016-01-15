/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2016-01-03
	@ 微信JS SDK的页面配置信息
	@ 自动将JD的签名配置上去。
	@ 使用方法如下：
	$.wxconfig();

	//开启ApiList如下：
	$.wxconfig(
		{
			jsApiList:[],
			success:function(){
				alert("配置成功");
			},
			fail: function(res){
				alert(res);
			}
		}
	);

	默认开启的APILIST如下：
	"onMenuShareTimeline",
	"onMenuShareAppMessage",
	"onMenuShareQQ",
	"onMenuShareWeibo",
	"onMenuShareQZone"
*/

define("wxSDKConfig",function(require,exports,module){
	var isWX = !!window.WeixinJSBridge||!!navigator.userAgent.toLowerCase().match(/micromessenger/),//是否微信
	isJD=/^jd.com$|\.jd.com/i.test(document.domain),
	isReady=0,
	cbList=[],
	ready=function(cb){
		if(isReady)cb&&cb();
		else{
			cbList.push(cb);//存入数组
		}
	},
	fetchWXSign=require("fetchWXSign"),
	script=document.createElement("script");
	if(isWX){
		document.body.appendChild(script);
		script.onload=function(){
			//加载成功
			isReady=1;
			while(cbList.length){
				var _cb=cbList.pop();
				_cb&&_cb();
			}
		},
		script.onerror=function(){
			//加载出错
			console.log("load fail: \"http://res.wx.qq.com/open/js/jweixin-1.0.0.js\"");
		};
		script.src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
	};
	module.exports=function(arg){
		if(!isWX)return ;//环境不对
		arg=arg||{};
		if("[object Object]"!=Object.prototype.toString.call(arg)){
    		throw("wxSDKConfig: arguments parse error!");
    		return ;
    	}
		var success=arg.success,fail=arg.fail,jsApiList=arg.jsApiList||["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"];
		delete arg.success,delete arg.fail;
		ready(
			function(){
				isJD&&fetchWXSign(function(json){
					//获取签名
					wx.config(
						{
						    debug: false, 
						    appId: json.appId,
						    timestamp: json.timestamp,
						    nonceStr: json.nonceStr, 
						    signature: json.signature,
						    jsApiList: jsApiList
						}
					);
				});
				!window.WeixinJSBridge&&success&&success();//PC虚拟环境
				wx.ready(function(){
					success&&success();
				});
				wx.error(function(res){
					fail&&fail(res);
				});
			}
		);
	};
});