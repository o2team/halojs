/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 在PC打开的友好提示
    @ 用法： 
    $.PCPrompt(
        {
            title: "京东温馨提示",
            QRCode: '',//二维码URL
            link: location.href,
            hint: '请使用 手机/平板 等移动设备扫描二维码',
            description: '',//其它描述信息
            background: 'rgba(0,0,0,.4)',//蒙层背景
            color: '#fff',//整体颜色
            minWidth: 800//PC的最少宽度 -- 如果设置了这个值，代码会自动检查如果大于这个值，蒙层会自动显示
        }
    );
*/
define("PCPrompt",function(require,exports,module){
    'use zeptojs';
    var _arg={
        //默认的参数
        title: "温馨提示",
        QRCode: 'http://qr.liantu.com/api.php?&text='+encodeURIComponent(location.href),//二维码URL
        link: location.href,
        hint: '请使用 手机/平板 等移动设备扫描二维码',
        description: '',//其它描述信息
        background: 'rgba(0,0,0,.8)',//蒙层背景
        color: '#fff',//整体颜色
        minWidth: 0//PC的最少宽度 -- 如果设置了这个值，代码会自动检查如果大于这个值，蒙层会自动显示
    },
    styleSheet=require("stylesheet");
    module.exports=function(arg){
        var arg=arg||{};
        for(var i in _arg){
            arg[i]||(arg[i]=_arg[i]);
        }
        arg.minWidth=parseInt(arg.minWidth)||0;
        styleSheet.add(
'\
.halo-pcprompt-mask{position: absolute; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: '+arg.background+'; color: '+arg.color+'; text-align: center;}\
.halo-pcprompt-title{position: relative; text-align: center; color: #fff; padding: 0; margin: 80px auto 10px; font-size: 30px;}\
.halo-pcprompt-qrcode{position: relative; width: 300px; height: 300px; padding: 0; overflow: hidden; border-radius: 15px; background-color: #fff; margin: 20px auto 30px;}\
.halo-pcprompt-qrcode img{display: block; width: 100%; height: 100%;}\
.halo-pcprompt-hint{position: relative; font-size: 12px; height: 40px; line-height: 40px; border-radius: 20px; box-shadow: 0 0 0 #555,0 1px 1px #555,0 0 0 #555,0 -1px 1px #282828; background-color: rgba(0,0,0,0.05); display:inline-block; padding: 0 20px; opacity: .7;}\
.halo-pcprompt-description{display: block; margin: 20px auto; font-size: 12px; line-height: 1.5; opacity: .7;}\
'
        );
        var mask=document.createElement("div"),html='\
<div class="halo-pcprompt-title">'+arg.title+'</div>\
<div class="halo-pcprompt-qrcode">\
    <img src="'+arg.QRCode+'" />\
</div>\
<div class="halo-pcprompt-hint">'+arg.hint+'</div>\
<div class="halo-pcprompt-description">'+arg.description+'</div>\
        ';
        mask.className="halo-pcprompt-mask",mask.innerHTML=html;
        if(arg.minWidth>0){
            var cw=document.documentElement.clientWidth||document.body.clientWidth;
            if(arg.minWidth<cw){
                document.body.appendChild(mask);
            }
        }else{
            document.body.appendChild(mask);
        }
    }
});