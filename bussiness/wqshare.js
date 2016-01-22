/*
    @ author leeenx
    @ version 1.0.0
    @ date: 2016-01-03
    @ 微信手Q分享接口
    @ 兼容手Q微信原来的方法，使用window.shareConfig对象来配置对象
    window.shareConfig = {
            img_url: 'http://wqs.jd.com/promote/2015/childrensday/images/share.png',//分享图标 - 必选
            img_width: 80,//分享图片尺寸之宽 - 可选
            img_height: 80,//分享图片尺寸之高 - 可选
            link: location.href,//分享地址 - 必选
            title: '乐享六一，儿童节礼物免费领',//分享标题 - 必选
            desc: '京东六一送大礼！积木、泰迪熊、遥控汽车、早教机，5000元旅游基金免费领哟！动动手指就有机会获得~',//分享描述 - 必选
            shareCallback:function(sharetype,retmsg,appret){
                \/*
                    @sharetype:分享类型
                    @retmsg:分享结果信息
                    @appret:手Q或微信接口返回的原始信息
                    @@手Q对应的参数
                        sharetype有四个值："ShareToQQ","ShareToQzone","ShareToWX","ShareToPYQ"
                        retmsg有两个值：ok,cancel
                        appret有两个值：0和1。分别对就上面的ok和cancel。表示分享成功和取消
                    @@微信对应的参数
                        sharetype 有3个值："sendAppMessage","shareTimeline"，"shareQQ" -- 分享到QZONE或是QQ好友，都是shareQQ,并且不管有没有成功都提示成功
                        retmsg有两个值：ok,cancel（理论上还有一个fail分享失败）
                        appret有8个值(分享给好友4个与分享朋友圈4个)：
                        分享给微信好友:
                        'share_timeline:cancel' - 用户点取消
                        'share_timeline:fail' - 分享失败
                        'share_timeline:confirm' - 分享成功
                        'share_timeline:ok' - 分享成功
                        分享到朋友圈：
                        'send_app_msg:cancel' - 用户点取消
                        'send_app_msg:fail' - 分享失败
                        'send_app_msg:confirm' - 分享成功
                        'send_app_msg:ok' - 分享成功
                *\/
                //简单地只需要判断retmsg为ok与cancel就可以了
                if("ok"==retmsg){
                    alert("分享成功");
                }else{
                    alert("用户取消分享");
                }
            }
        };

    @微信的JS接口文件：http://res.wx.qq.com/open/js/jweixin-1.0.0.js
    @手Q的JS接口文件： http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152
	
    $.wqshare(window.shareConfig);
    也可以直接写:
    $.wqshare(); ---- 会自动调用window.shareConfig
*/
define("wqshare",function(require,exports,module){
	var isWX = !!window.WeixinJSBridge||!!navigator.userAgent.toLowerCase().match(/micromessenger/),//是否微信
	isJD=/^jd.com$|\.jd.com/i.test(document.domain),
	script=document.createElement("script");
	document.body.appendChild(script);
	script.onload=function(){
		//加载成功
		sqInit();
	},
	script.onerror=function(){
		//加载出错
		console.log("load fail: \"http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152\"");
	};
	function loadScript(){
		if(isWX){
			var wxSDKConfig=require("wxSDKConfig");
			wxSDKConfig(
				{
					success: function(){
						wxInit();
					}
				}
			);//配置SDK
		}else{//手Q才使用loadScript
			script.src="http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152";
		}
	};
	function wxInit(){
		var wx=window.wx,
		arg={
			trigger: function(){
				//点击触发时实际更新arg
				updateArg();
			}
		},
		updateArg=function(){
			var  _arg=window.shareConfig;
			arg.title=_arg.title,
			arg.desc=_arg.desc,
			arg.link=_arg.link,
			arg.imgUrl=_arg.img_url,
			arg.success=function (appret) { 
			   // 用户确认分享后执行的回调函数
			   var sharetype=(appret.errMsg.split(":"))[0];
			   _arg.shareCallback(sharetype,'success',appret);
			},
			arg.cancel=function (appret) { 
			   // 用户取消分享后执行的回调函数
			   var sharetype=(appret.errMsg.split(":"))[0];
			   _arg.shareCallback(sharetype,'cancel',appret);
			};
		};
		updateArg();//生成arg对象
		if(wx&&wx.config&&wx.ready){
			//表示配置了wx.config
			var shareList=["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"];
			for(var i=0,len=shareList.length;i<len;++i){
				wx[shareList[i]](arg);
			}
		}else{
			loadScript();
		}
	};
	function sqInit(){
		//微信初始化
		if(window.mqq){
			//表示已经加载了手Q API
			if(mqq.data&&mqq.ui){
				mqq.ui.setOnShareHandler(
					function(type){
						if(typeof(type)=="undefined"){
	                        mqq.ui.showShareMenu();
	                        return ;
	                    }
	                    var config=window.shareConfig,_config={};
	                    _config.title=config.title,_config.desc=config.desc,_config.share_url =config.link,_config.image_url=config.img_url,_config.share_type=type;
	                    config.appid?(_config.appid=config.appid):(delete _config.appid);
	                    config.puin?(_config.puin=config.puin):(delete _config.puin);
	                    config.sourceName?(_config.sourceName=config.sourceName):(_config.sourceName="京东购物");//因为不传会显示 QQ浏览器 的小尾巴。所以默认是京东购物
	                    mqq.ui.shareMessage(_config,function(ret){
	                        typeof(config.shareCallback)=='function'&&config.shareCallback(["ShareToQQ","ShareToQzone","ShareToWX","ShareToPYQ"][type],0==ret?'ok':'cancel',ret);
	                    });
					}
				);
			}else{
				setTimeout(sqInit,500);
			}
		}else{
			loadScript();
		}
	};
	module.exports=function(arg){
		arg=arg||{};
		if("[object Object]"!=Object.prototype.toString.call(arg)){
    		throw("wxSDKConfig: arguments parse error!");
    		return ;
    	};
    	window.shareConfig=window.shareConfig||{
    		img_url: 'http://img11.360buyimg.com/jdphoto/s120x120_jfs/t1813/22/1582641713/4515/ee0dd8ca/55f7fa30Ne5f98d7f.png',//分享图标 - 必选
            img_width: 80,//分享图片尺寸之宽 - 可选
            img_height: 80,//分享图片尺寸之高 - 可选
            link: location.href,//分享地址 - 必选
            title: '每天9点为你推荐特价品牌，正品低价就来微信品牌闪购，超多大牌等你抢！',//分享标题 - 必选
            desc: '【品牌闪购】正品低价，精选大牌限时抢购！',//分享描述 - 必选
            shareCallback:function(sharetype,retmsg,appret){

            }
    	}
    	for(var i in arg){
    		shareConfig[i]=arg[i];
    	}
		isWX?wxInit():sqInit();//加载API
	};
});