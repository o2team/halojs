/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-11-12
    @ 通用分享蒙层
    @ 用法如下：
    $.shareTips({text:"..."});
*/
define("shareTips",function(require,exports,module){
    var _shareTips=function(){
        var mask=document.createElement('div'),icon=document.createElement('div'),h3=document.createElement('h3'),webkit=require("prefix");
        var icons_src='data:image/png;base64,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';
        mask.style.cssText='position:fixed; width:100%; height:100%; background-color:rgba(0,0,0,.5); left:0; top:0; '+webkit+'transition:opacity .3s linear; opacity:0; z-index:999;';
        icon.style.cssText='display:block; width:74px; height:102px; overflow:hidden; position: absolute; background:url('+icons_src+') 0 0 no-repeat; background-size:100% 100%; right:10px; top:10px;';
        h3.style.cssText='padding:0 0 0 0; position: absolute; width:100%; height:auto; text-align:center; top:132px; font-size:20px; line-height:28px; color:#fff;';
        mask.appendChild(icon),mask.appendChild(h3);
        mask.addEventListener(('ontouchstart' in window)?'touchstart':'mouseup',function(e){
            hide();
        },false);
        var show=function(text){
            text=typeof(text)=="object"?text.text:text;
            h3.innerHTML=text||decodeURIComponent('%E8%AF%B7%E7%82%B9%E5%87%BB%E5%8F%B3%E4%B8%8A%E8%A7%92')+'<br />'+decodeURIComponent('%E9%80%9A%E8%BF%87%20%E3%80%90%E5%8F%91%E9%80%81%E7%BB%99%E6%9C%8B%E5%8F%8B%E3%80%91%E5%8A%9F%E8%83%BD')+'<br />'+decodeURIComponent('%E6%8A%8A%E5%A5%BD%E6%B6%88%E6%81%AF%E5%91%8A%E8%AF%89%E5%B0%8F%E4%BC%99%E4%BC%B4%E5%93%9F~');
            document.body.appendChild(mask);
            setTimeout(function(){mask.style.opacity=1;},60);
        },hide=function(){
            mask.style.opacity=0;
            setTimeout(function(){
                try{document.body.removeChild(mask);}catch(e){};
            },400)
        };
        show.hide=hide;
        return show;
    }();
    window.$&&($.shareTips=_shareTips);
    return _shareTips;
});

