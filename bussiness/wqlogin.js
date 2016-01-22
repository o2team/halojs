/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-12
    @ 作用微信手Q登录
    @ 精简优化原来的方案 -- 取消跨域登录（因为有安全隐患）
    @ 简单用法: $.wqlogin();
    //配置登录参数 ---- 如果$.wqlogin是用于配置，那么它就不会自动登录，需要在status回调中调用this.login();来完成登录
    $.wqlogin(
    	{
			type: "auto", //登录方式 -- 三个值 auto|qq|wx
			scope: "snsapi_base", //微信授权方式
			status: function(res){
				//当前登录状态 -- 根据当前cookie判断的登录状态，所以，退登不能与自动登录同时执行
				res||this.login();
			}
    	}
    );
    //退登
    $.wqlogin(
		{
			logout: 1//非0就表示退登
		}
    );
 */
 define("wqlogin",function(require,exports,module){
 	var request=require("request"),crossOrigin=!/^jd.com$|\.jd.com/ig.test(document.domain),//是否跨域
 		arg=_arg={
			type: "auto", //登录方式 -- 三个值 auto|qq|wx
			scope: "snsapi_base", //微信授权方式
			status: function(){},
			logout: 0 //是否执行登录
    	},
 		cookie=require("cookie");
 	var ua = navigator.userAgent.toLowerCase(),isWX=window.WeixinJSBridge||ua.indexOf("micromessenger")>=0,
    status=function(){
        var _isLogin=(cookie("wg_skey") && cookie("wg_uin") || cookie("p_skey") && cookie("p_uin") || cookie("skey") && cookie("uin") || cookie("wq_skey") && cookie("wq_uin"))?true:false;
        return _isLogin;
    },
    wxlogin=function(ru){
    	var scope=('snsapi_userinfo'==arg.scope?'snsapi_userinfo,snsapi_event_v2':_arg.scope);//授权作用域
    	location.href='http://wq.jd.com/mlogin/wxv3/login_BJ'+'?appid=1&rurl=' + ru + "&scope="+scope;;
    },
    sqlogin=function(ru){
    	location.href='http://wq.jd.com/mlogin/h5v1/cpLogin_BJ?rurl=' + ru;
    },
    delCookie=function(key){
    	cookie(
    		{
    			type:"delete",
    			key: key,
    			domain: document.domain
    		}
    	);
    	cookie(
    		{
    			type:"delete",
    			key: key,
    			domain: "jd.com"
    		}
    	);
    },
    login=function(){
    	if(crossOrigin){
    		throw("The login request was denied. Invalid origin!");
    		return ;
    	}
    	var ts=new Date().getTime(),hash=location.hash;
    	if(ts-wqlogin_ts<30000){
            //30s内的登录，就不再进行登录尝试
            alert('登录失败');
            return;
        }
        //生成ru
        var ru_search=function(){
        	var _search='',index=0;
        	for(var i in para){
        		'wqlogin_ts'==i&&(para[i]=ts);//时间更换成当前时间
        		_search+=(0==index++?'?':'&')+i+'='+para[i];
        	}
        	0==index&&(_search='?wqlogin_ts='+ts);
        	return _search;
        }(),
        ru=encodeURIComponent(path+ru_search+hash);
    	//以下是登录通道选择
    	"wx"==arg.type
		?
		wxlogin(ru)
		:
		(
			"qq"==arg.type
			?
			sqlogin(ru)
			:
			(/*其它值，都认为是auto*/
				isWX?wxlogin(ru):sqlogin(ru)
			)
		)
    },
    logout=function(){//退登
    	delCookie("wg_skey"), delCookie("wg_uin"), delCookie("p_skey"), delCookie("p_uin"), delCookie("skey"), delCookie("uin"), delCookie("wq_skey"), delCookie("wq_uin");
    },
    path=window.location.protocol+'//'+window.location.host+window.location.pathname,
    para=request()||{},
    wqlogin_ts=parseInt(para['wqlogin_ts'])||0;
 	module.exports=function(__arg){
 		if(typeof(__arg)=="undefined"){//没有传入参数，表示直接登录
 			login();
 			return ;
 		}
 		if("[object Object]"!=Object.prototype.toString.call(__arg))return ;
 		for(var i in _arg){
 			__arg[i]||(__arg[i]=_arg[i]);
 		}
 		__arg.logout&&logout();
 		arg=__arg;
 		typeof(__arg.status)=="function"&&__arg.status.call({login:login},status());
 	}
 });



