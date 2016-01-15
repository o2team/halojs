/*
	@ author leeenx
	@ version 1.0.0
	@ data: 2015-12-07
	@ 领券方法
	@ 使用方法：
	$.fetchCoupon(
		{
			url: "http://wq.jd.com/active/active_draw",  //可选项，表示更换接口的url地址
			data:
			{
				activeid: "active_name",
				level: 0
			},
			callback: function(json){
				//json.ret 结果码，常见码如下：
				//0 -- 成功
				//2 -- 未登录
				//3～6 -- 已经领过券
				//7 -- 优惠券已经派完
				//101 -- 活动不存在
				//103 -- 活动未开始
				//104 -- 活动已结束
			}
		}
	);
*/
define("fetchCoupon",function(require,exports,module){
	var isWX=window.WeixinJSBridge||navigator.userAgent.indexOf("micromessenger")>=0,jsonp=require("jsonp"),g_tk=require("g_tk"),
	lock=0,//因为callback固定为ActiveLotteryCallBack，所以所有操作需要做串行操作
    couponArr=[],
    fetch=function(active,level,cb,apiUrl){
        if(lock){
            couponArr.push([active,level,cb,apiUrl]);
            return ;
        }
        lock=1;//锁定
        var _do=function(active,level,cb){//执行领取操作
            //检查环境
            var ext=isWX?"hj:w":"hj:q";//环境判断
            var data={
                ext:ext,
                active:active,
                level:level,
                g_tk:g_tk()
            };
            for(var i in arg){//除了active,level外的参数
                data[i]=arg[i];
            }
            if(typeof(level)=='undefined')delete data.level;//抽奖不需要level
            jsonp({
                url: apiUrl?apiUrl:'http://wq.jd.com/active/active_draw',
                data:data,
                jsonp:"callback",
                jsonpCallback:"ActiveLotteryCallBack",
                callback:function(json){
                    typeof(cb)=="function"&&cb(json);
                    if(!couponArr.length){
                        //队列里没有东西
                        lock=0;//解锁
                    }else{
                        //执行队列里
                        var cpn=couponArr.shift();
                        _do(cpn[0],cpn[1],cpn[2]);
                    }
                }
            });
        };
        var arg={};
        if(typeof(active)=="object"){
            for(var i in active){
                if('active'!=i&&'level'!=i&&'cb'!=i){
                    //除了active,level,cb外的参数都存起来
                    typeof(active[i])=="string"&&(arg[i]=active[i]);
                }
            }
            _do(active.active,active.level,active.cb);
        }else{
            _do(active,level,cb);
        }
    };
    module.exports=function(arg){
    	if("[object Object]"==Object.prototype.toString.call(arg)&&arg.data&&arg.data.activeid){
    		fetch(arg.data.activeid,arg.data.level,arg.callback,arg.apiUrl)
    		return ;
    	}
    	throw("fetchCoupon: parse error!");
    }
})