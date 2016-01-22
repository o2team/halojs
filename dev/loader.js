/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 图片加载器 -- js/css/audio/view这些资源不支持，原因兼容不好
    @ 用法： 
    $.loader(
        {
            source:[],
            onchange:function(percent){
                console.log(percent);
            },
            complete:function(){
                //加载完成
            }
        }
    );
*/
define("loader",function(require,exports,module){
    var _loader=function(arg){
        if(typeof(arg)=="undefined")return ;
        var source=arg.source||[],onchange=arg.onchange||function(){},complete=arg.complete||function(){},total=source.length,loaded=0,percent=0;
        for(var i=0;i<total;++i){
            ~function(i){
                var img=new Image();
                img.onload=img.onerror=function(){
                    percent=(++loaded/total) * 100 + '%';
                    onchange(percent);
                    if(loaded==total){
                        //加载成功
                        complete();
                    }
                };
                img.src=source[i];
            }(i);
        }
    };
    window.$&&($.loader=_loader);
    return _loader;
});




