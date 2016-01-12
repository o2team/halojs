/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 懒人加载优化版
    @ 用法：$.ezLoader(
        {
            fadeIn: 0,
            preload: document.documentElement.clientHeight,
            zoom: 1
        }
    );
    @ 后续方向，支持fn扩展与支持指定容器的ezLoader
*/
define("ezLoader",function(require,exports,module){
    'use zeptojs';
	var prefix=require("prefix");
	return function(fadein,preload_distance,zoom){
        zoom=zoom||1;
        fadein=typeof(fadein)=='undefined'?1:fadein;
        var getTop = function(e) {
            var parent=e.offsetParent;
            if(parent==null)return -1;//祖先被display:none了
            var offset = e.offsetTop;
            while(parent.tagName!='BODY'&&parent.tagName!='HTML'){
                offset+=parent.offsetTop;
                parent=parent.offsetParent;
            }        
           return offset*zoom;
        },wh=window.screen.height,listenscroll=function(){
            window.addEventListener('scroll',load)
        },unlistenscroll=function(){
            window.removeEventListener('scroll',load)
        },load=function(){
            var st=document.body.scrollTop||document.documentElement.scrollTop||window.HALO_ST||0;
            for(var i=0,len=shake.length;i<len;++i){
                if(st+preload_distance>=shake[i][0]){
                    shake[i][2]||(function(i){
                        var _i=shake[i][3];
                        _shake[_i].onload=_shake[_i].onerror=function(){
                            if(typeof(o.load_change)=='function'){
                                o.load_change(_shake[_i]);
                            }
                            if(++has_loaded==len){
                                unlistenscroll();//取消监听
                            };
                            fadein&&(this.style.opacity='1');
                        };
                        shake[i][2]=1;//表示不用再加载了
                        _shake[_i].src=shake[i][1];
                    }(i));
                }
            }
        },has_loaded=0,_shake=document.querySelectorAll('[halo-data-ez]'),shake=[];
        for(var i=0,len=_shake.length;i<len;++i){
            var _top=getTop(_shake[i]);
            if(_top<0)continue;//如果节点所在的祖先节点中有display:none;的话，不回收halo-data-ez
            shake.push([_top,_shake[i].getAttribute('halo-data-ez'),0,i]);
            _shake[i].removeAttribute('halo-data-ez');
            fadein&&(_shake[i].style.opacity=0,_shake[i].style[prefix+'transition']='opacity .6s linear');
        };
        preload_distance=preload_distance||0;
        preload_distance+=wh;
        load();//载入第一屏
        listenscroll();//开始监听
        var o={};
        return o;
    }
});