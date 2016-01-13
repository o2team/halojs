/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-11-11
    @ 图片轮播
    @ 用法如下：
    var imgplayer=require("imgPlayer");
    imgplayer(container,"X");

    @ $("#container").imgPlayer(
        {
            motion: "X",
            showNumList: 1,//显示图片小icon列表
            duration: 4000,//图片切换的动画时长
            autoPlay: 1 //自动轮播
        }
    );
*/
define("imgPlayer",function(require,exports,module){
    'use zeptojs';
    var webkit=require("prefix"),klass=require("klass"),addClass=klass.addClass,removeClass=klass.removeClass,stylesheet=require("stylesheet"),css=require("css"),isDom=require("isDom");
    //添加滚动效果
    stylesheet.add('.halo_page_drag_keep{'+webkit+'transition:'+webkit+'transform .2s linear;}');//竖屏
    stylesheet.add('.halo_page_drag_h_keep{'+webkit+'transition:'+webkit+'transform .2s linear;}');//横屏
    stylesheet.add('.halo_page_drag_restore{'+webkit+'transition:'+webkit+'transform .1s linear;}');//弹性
    var _imgplayer=function(args){
        if(typeof(args)=="undefined"){
            throw("imgPlayer: takes no arguments, expected 1");
            return ;
        }
        if(typeof(args)!="object"){
            throw("imgPlayer: takes bad arguments, expected object");
            return ;
        }
        var dom=args.selector,motion=args.motion,showNumList=args.showNumList;
        if(!dom){
            if(isDom(this)){
                dom=this;
            }else if(isDom(this[0])){
                dom=this[0];
            }else{
                throw("imgPlayer: \'this\' isn't a HTMLDivElement!");
                return;
            }
        }else if(typeof(dom)==="string"){
            var domStr=dom;
            dom=document.querySelector(dom);
            if(!isDom(dom)){
                throw("imgPlayer: \'"+domStr+"\' is invalid!");
                return;
            }
        }
        if(typeof(showNumList)=='undefined')showNumList=true;
        motion=motion||'X',motion=motion.toUpperCase();//默认的绑定方向是X轴
        var positon=css(dom,'positon');
        if('static'==positon||!positon)dom.style.position='relative';//默认要是relative
        var container=document.createElement("div");
        container.style.cssText='position:absolute; width:100%; height:100%; left:0; top:0;';
        var childNodes=dom.childNodes,len=0,images=[];
        while(childNodes.length){
            if(childNodes[0].nodeType==1)childNodes[0].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0; '+(0==len?'display:block;':' display:none;'),++len,images.push(childNodes[0]);
             container.appendChild(childNodes[0]);
        }
        dom.appendChild(container);
        if(len<=1)return ;//1个图片以下不作处理
        //展示小icon
        var numListController={move:function(){}};
        if(showNumList){
            var numList=document.createElement('div'),out='border:1px solid rgba(0,0,0,.3); background-color:rgba(255,255,255,.3);',iconCss='position:relative; display:inline-block; width:8px; height:8px; overflow:hidden; border-radius:5px;',on='border:1px solid rgba(0,0,0,0); background-color:#e62548;',str='',icons=[];
            numList.style.cssText='position:absolute; width:auto; height:10px; text-align:center; left:0; bottom:10px; left:50%; '+webkit+'transform:translate(-50%,0);';
            for(var i=0;i<len;++i){
                var icon=document.createElement('i');
                icon.style.cssText=iconCss+(0==i?on:(out+' margin-left:8px;'));
                numList.appendChild(icon);
                icons.push(icon);
            }
            dom.appendChild(numList);
            numListController.move=function(c,n){
                icons[c]&&(icons[c].style.cssText+=out),icons[n]&&(icons[n].style.cssText+=on);
            };
        }
        //滚动时的样式选择
        var keep='X'==motion?'halo_page_drag_h_keep':'halo_page_drag_keep',restore='halo_page_drag_restore';
        var fix_page=function(num){
            //使页码正确
            //if(num==len)return num;//临界值
            if(num>=0){
                return num%len;
            }else{
                return (len+num%len);
            }
        };
        //处理事件
        var lock=false,start_x=0,start_y=0,cur=0,previous=fix_page(-1),next=fix_page(1),offset=0,cur_motion='none',orientation='none',_orientation='none',pre,hasFinger=false;
        var _touchstart=function(e){
            autoTimer&&clearTimeout(autoTimer);//阻止自动播放
            if(o.stop)return;
            //e.stopPropagation(),e.preventDefault();//阻止冒泡
            hasFinger=true;
            if(lock)return ;
            var touchers=e.changedTouches||e.targetTouches;
            start_x=touchers[0].pageX,start_y=touchers[0].pageY;
        },
        _touchmove=function(e){
            if(o.stop)return;
            hasFinger=true;
            // e.stopPropagation(),e.preventDefault();//阻止冒泡
            if(lock)return ;
            var touchers=e.changedTouches||e.targetTouches,_x=touchers[0].pageX,_y=touchers[0].pageY;
            if('none'==cur_motion){
                //手势同步判断
                var offset_x=_x-start_x,offset_y=_y-start_y;
                if(Math.abs(offset_x)==Math.abs(offset_y)){
                    e.preventDefault(),e.stopPropagation();
                    return ;//分不出方向，等待分清方向
                }else if(Math.abs(offset_x)>Math.abs(offset_y)){
                    cur_motion='X';
                }else{
                    cur_motion="Y";
                }
                if(motion!=cur_motion){
                    //方向不一致，解绑事件
                    container.removeEventListener('touchstart',_touchstart,false);
                    container.removeEventListener('touchmove',_touchmove,false);
                    container.removeEventListener('release',_release,false);
                    //手指离开后，重新绑定原来的事件
                    container.addEventListener('touchend',rebind,false);
                    container.addEventListener('touchcancel',rebind,false);
                    return ;
                }
            }
            e.stopPropagation(),e.preventDefault();//阻止冒泡
            if('X'==motion){
                offset=_x-start_x;
                images[cur].style[webkit+'transform']='translate3d('+offset+'px,0,0)';
            }else{
                offset=_y-start_y;
                images[cur].style[webkit+'transform']='translate3d(0,'+offset+'px,0)';
            }
            if(offset>0){
                //向下或向右
                orientation='X'==cur_motion?'right':'up';
            }else if(offset<0){
                //向上或向左
                orientation='X'==cur_motion?'left':'down';
            }else{
                //没有方向
                orientation='none';
            }
            if(orientation!=_orientation){
                //变向
                if(offset>0){
                    'X'==cur_motion?(images[previous].style.left='-100%'):(images[previous].style.top='-100%');
                    images[previous].style.display='block',images[next].style.display='none';
                    pre=previous;
                }else if(offset<0){
                    'X'==cur_motion?(images[next].style.left='100%'):(images[next].style.top='100%');
                    images[next].style.display='block',images[previous].style.display='none';
                    pre=next;
                }
                _orientation=orientation;
            };
            if('X'==motion){
                images[pre].style[webkit+'transform']='translate3d('+offset+'px,0,0)';
            }else{
                images[pre].style[webkit+'transform']='translate3d(0,'+offset+'px,0)';
            }
            o.ondrag&&o.ondrag(offset,cur,pre);//正在拖曳
        },
        _release=function(e){
            if(o.stop)return ;
            o.auto&&autoplay();//恢复自动播放
            if(lock)return ;
            lock=true;//锁定手指
            var absoffset=Math.abs(offset),_restore=absoffset<30;
            o.release&&o.release(_restore,cur,pre);//拖曳后手指松开
            if(_restore&&absoffset!=0){
                //小于自动移动的最小偏移量
                addClass(images[cur],restore),addClass(images[pre],restore);
                images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d(0,0,0)';
                setTimeout(function(){
                    removeClass(images[cur],restore),removeClass(images[pre],restore);
                    images[pre].style.display='none';
                    offset=0,cur_motion='none',orientation='none',_orientation='none',lock=false,hasFinger=false;//重置参数
                },200);
            }else if(absoffset!=0){
                move();
            }else{
                lock=false;
                hasFinger=false;
            }
        },
        move=function(){
            //松手后的位移
            addClass(images[cur],keep),addClass(images[pre],keep),p=offset>0?'':'-';
             if('X'==motion){
                //images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d('+p+'100%,0,0)';
                images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d('+p+images[cur].offsetWidth+'px,0,0)';
            }else{
                //images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d(0,'+p+'100%,0)';
                images[pre].style[webkit+'transform']=images[cur].style[webkit+'transform']='translate3d(0,'+p+images[cur].offsetHeight+'px,0)';
            }
            setTimeout(function(){
                removeClass(images[cur],keep),removeClass(images[pre],keep);
                offset=0,cur_motion='none',orientation='none',_orientation='none',lock=false,hasFinger=false;//重置参数
                //隐藏滑过的页面
                images[cur].style.display='none';
                if(typeof(o.onchange)=='function')o.onchange(cur,pre);//回调通知
                numListController.move(cur,pre);//小icon切换
                //页码更改
                cur=pre,previous=fix_page(cur-1),next=fix_page(cur+1);
                //保持当前页面永远为left/top 0 translate3d(0,0,0)
                images[cur].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:0; top:0;';
            },300);
        },
        moveto=function(n){
            //js移动时，需要锁定
            if(lock||hasFinger)return ;
            if(n==cur){
                if(typeof(o.onchange)=='function')o.onchange(cur,n);//回调通知
                return ;
            }
            lock=true;//把touchstart,touchmove,touchend锁定住
            pre=n;
            move();//开始移动
        },
        rebind=function(e){
            //重绑事件
            offset=0,cur_motion='none',orientation='none',_orientation='none',lock=false,hasFinger=false;//重置参数
            this.removeEventListener('touchend',rebind,false);
            this.removeEventListener('touchcancel',rebind,false);
            this.addEventListener('touchstart',_touchstart,false);
            this.addEventListener('touchmove',_touchmove,false);
            this.addEventListener('touchend',_release,false);
            this.addEventListener('touchcancel',_release,false);
            o.auto&&autoplay();//恢复自动播放
        },autoplay=function(){
            autoTimer=setTimeout(function(){
                var n=fix_page(cur+1);
                images[n].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:100%; top:0;';//预定位
                //alert(n);
                setTimeout(function(){
                   o.auto&&moveto(n); 
                },60);
                autoplay();
            },o.duration);
        },autoTimer,
        moveprev=function(){
            var n=fix_page(cur-1);
            images[n].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:100%; top:0; '+webkit+'transform:translate3d(0,0,0)';//预定位
            autoTimer&&clearTimeout(autoTimer);//阻止自动播放
            setTimeout(function(){
                moveto(n);
                setTimeout(function(){
                    o.auto&&autoplay();//恢复自动播放
                },300);
            },60);
        },
        movenext=function(){
            var n=fix_page(cur+1);
            images[n].style.cssText='position:absolute; width:100%; height:100%; overflow:hidden; left:-100%; top:0; '+webkit+'transform:translate3d(0,0,0)';//预定位
            autoTimer&&clearTimeout(autoTimer);//阻止自动播放
            setTimeout(function(){
                offset=1;
                moveto(n);
                setTimeout(function(){
                    o.auto&&autoplay();//恢复自动播放
                },300);
            },60);
        };
        container.addEventListener('touchstart',_touchstart,false);
        container.addEventListener('touchmove',_touchmove,false);
        container.addEventListener('touchend',_release,false);
        container.addEventListener('touchcancel',_release,false);
        var o={move:moveto,prev:moveprev,next:movenext,autoPlay:typeof(args.autoPlay)=="undefined"?1:args.autoPlay,duration:args.duration||4000,totalPage:len};//最终要返回的对象
        autoplay();//自动轮播
        return o;
    }
    module.exports=_imgplayer;
});