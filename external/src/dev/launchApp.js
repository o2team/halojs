/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-11-12
    @ 在网页打开APP
    @ 用法如下：
    $.launcthApp(
        {
            packageName: "com.jingdong.app.mall", -- android对应的packagename
            scheme: "openApp.jdMobile://", -- ios使用的scheme(其实android也会用这个)
            downloadUrl:'http://h5.m.jd.com/active/download/download.html?channel=jd-shhd3',//通用下载地址，有时候有些下载需要做统计，会使用这个参数
            downloadAndroid:'http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850',//安卓的下载地址
            downloadIOS:'https://itunes.apple.com/cn/app/id414245413'//ios的app_store地址
        }
    );
*/
define("launcthApp",function(require,exports,module){
    'use zeptojs';
    return _open=function(){
        var isSQ=-1,
        isAndroid=navigator.userAgent.indexOf('Android')>-1,
        download=function(arg){//下载操作
            if(arg.downloadUrl){
                location.href=arg.downloadUrl;//有统一的下载页面，直接跳统一下载页面
                return ;
            }
            location.href=isAndroid?arg.downloadAndroid:arg.downloadIOS;
        },
        wxopenapp=function(arg){
            if(!window.WeixinJSBridge){
                webopenapp(arg);//没有WeixinJSBridge当做是普通web页面
                return ;
            }
            WeixinJSBridge.invoke("getInstallState", {//其实不准，只能获用户有没有安装过，如果用户删除了。。。这里会没反应
                packageName: arg.packageName,
                packageUrl: arg.scheme
            }, function(a) {
                var c = a.err_msg;
                if(c.indexOf("get_install_state:no") > -1){
                    //未安装 - 打开下载页面
                    download(arg);
                }else{
                    if(isAndroid){
                        androidopenapp(arg,1);//安卓的打开方式，微信与网页都一样
                        return ;
                    }
                    //安装过
                    var ts=new Date().getTime();
                    location.href=arg.scheme;
                }
            });
        },
        sqopenapp=function(arg){
            var value=isAndroid?arg.packageName:arg.scheme.replace('://','');
             mqq.app.isAppInstalled(value, function(result){
                if(result){
                    //安装了
                    if(isAndroid){//安卓只能通过download来实现自动打开
                        location.href=arg.downloadAndroid;
                        return ;
                    }
                    mqq.app.launchApp({
                        name: value//启用程序
                    });
                }else{
                    //未安装
                    download(arg);
                }
            });
        },
        webopenapp=function(arg){
            if(isAndroid){
                //安卓
                androidopenapp(arg);
            }else{
                //ios
                iosopenapp(arg);
            }
        },
        androidopenapp=function(arg,wx){
            //安卓打开app
            var ts=new Date().getTime();
            ifr.src=arg.scheme;
            wx=!!wx;//xiaomi js-hack
            if(wx)return ;
            setTimeout(function(){
                if(new Date().getTime()-ts>1000){
                    return ;
                }
                download(arg);
            },600);
        },
        iosopenapp=function(arg){
            //ios打开app
            download(arg);//直接进入app_store或统一的下载地址即可
        },
        _openapp=function(arg){
            //未确认状态
            if(isSQ==-1){
                setTimeout(function(){
                    _openapp(arg);
                },500);
            }else if(1==isSQ){
                sqopenapp(arg);
            }else{
                webopenapp(arg);
            }
        },
        openapp=function(arg){
            if(navigator.userAgent.indexOf('MicroMessenger')>-1){
                //微信环境下
                wxopenapp(arg);
            }else if(window.mqq&&mqq.device){
                mqq.device.isMobileQQ(function(res){
                    isSQ=res?1:0;
                });
                _openapp(arg);
            }else{
                //普通的页面
                webopenapp(arg);
            }
        };
        if(isAndroid){
            var ifr=document.createElement("iframe");
            ifr.style.display='none';
            document.body.appendChild(ifr);
        }else{
            var ifr={src:''};
        }
        return openapp;
    }();
});