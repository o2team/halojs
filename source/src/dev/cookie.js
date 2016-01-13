/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-12
    @ cookie 用法如下：
    @ 获取cookie值 -- zepto.js默认是没有cookie
    $.cookie(
        {
            type: "get",
            key: "name",
            index: 0//多值cookie下可以取按索引取值 -- option
        }
    );
    @ 添加/修改cookie
    $.cookie(
        {
            type: "set",
            key: "name",
            value: "val",
            expires: 30,//单位分钟 -- option
            domain: "jd.com",//域名 -- option
            path: "/", //路径 -- option
            unit: "minute" //expires的单位，默认是天（为了兼容jq）。可选的值： second,minute,hour,day,week,year
        }
    );
    @ 删除cookie
    $.cookie(
        {
            type: "delete",
            key: "name",
            domain: "jd.com",//域名 -- option
            path: "/" //路径 -- option
        }
    );
    @ 为了兼容zepto.js的方法，所以有以下简单方法
    $.cookie("key"); -- 取cookie
    $.cookie("key","value",{expire:xx,domain:xx,path:xx,unit: xx}); -- 添加或修改
    $.cookie("key",null); -- 删除cookie
*/
define("cookie",function(require,exports,module){
    'use zeptojs';
    var setCookie=function(name,value,expires,domain,path,unit){
        if(!name){
            return ;//空值或空方法
        }
        var cookie_expires='',cookie_path=';path=/',cookie_domain='',_unit=function(){
            var _res=1000;
            switch(unit){
                case "second": _res=1000;break;
                case "minute": _res=60*1000;break;
                case "hour": _res=60*60*1000;break;
                case "day": _res=24*60*60*1000;break;
                case "week": _res=7*24*60*60*1000;break;
                case "year": _res=365*24*60*60*1000;break;
                default: _res=24*60*60*1000;
            }
            return _res;
        }();
        if(typeof(expires)=='number')cookie_expires=';expires='+new Date(parseInt(expires)*_unit+new Date().getTime()).toGMTString();//以分钟计算
        if(typeof(path)=="string")cookie_path=';path='+path;
        if(typeof(domain)=='string')cookie_domain=';domain='+domain;
        if("[object Null]"==Object.prototype.toString.call(value)){
            deleteCookie(name,domain,path);
        }else{
            document.cookie=name+'='+escape(value)+cookie_expires+cookie_path+cookie_domain;
        }
    }
    var deleteCookie=function(name,domain,path){
        if(!name)return ;//空方法
        var cookie_path=';path=/',cookie_domain='';
        if(typeof(path)=="string")cookie_path=';path='+path;
        if(typeof(domain)=='string')cookie_domain=';domain='+domain;
        else cookie_domain='';
        document.cookie=name+'=;expires='+new Date().toGMTString()+cookie_domain+cookie_path;
    }
    var getCookie=function(name,index)
    {
        if(!name||!document.cookie){//没有cookie时或空方法
            return null;
        };
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)","g"));
        if(typeof(index)=='undefined'&&!!arr){
            //默认取第一个有实的cookie
            var value;
            for(var i=0;i<arr.length;++i){
                var key_value=unescape(arr[i]);
                value=key_value.substring(key_value.indexOf('=')+1,key_value.length);
                value=value.replace(/\;$/,'');
                if(!!value){
                    return value;break;
                }
            }
            return value;
        }else{
            if(arr != null&&!!arr[index])
            {
                var key_value=unescape(arr[index]),value=key_value.substring(key_value.indexOf('=')+1,key_value.length-1);
                return value;
            }
        }
        return null;
    };
    return function(key,value,arg){
        if("[object Object]"==Object.prototype.toString.call(key)){
            //表示所有的参数都以object形式传入
            switch (key.type){
                case "delete": return deleteCookie(key.key,key.domain,key.path);
                case "get": return getCookie(key.key,key.index);
                case "set": return setCookie(key.key,key.value,key.expires,key.domain,key.path,key.unit);
                default: return ;
            }
        }
        if(1==arguments.length&&typeof(key)=="string"){
            //只有一个参数，表示获取cookie值
            return getCookie(key);
        }
        if(2<=arguments.length&&typeof(key)=="string"&&(typeof(value)=="string"||typeof(value)=="number"||"[object Null]"==Object.prototype.toString.call(value))){
            //两个以上参数，表示是setCookie
            arg="[object Object]"==Object.prototype.toString.call(arg)?arg:{};
            return setCookie(key,value,arg.expires,arg.domain,arg.path,arg.unit);
        }
    }
});