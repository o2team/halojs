/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 页面翻页
    @ 用法： 
    $.cardslider(
        {
            container: "#wrap",
            direction:'Y',
            scale:true,
            offset:50,
            duration:300,
            infinite:true,
            onchange:function(o,i){
                //通过this[0]可以取对应的分页哦
                //o滑出页索引，i滑入页索引
                console.log(o,i);
            }
        }
    );
    或是直接:
    $("#wrap").cardSlider(
		{
            direction:'Y',
            scale:true,
            offset:50,
            duration:300,
            infinite:true,
            onchange:function(o,i){
                //通过this[0]可以取对应的分页哦
                //o滑出页索引，i滑入页索引
                console.log(o,i);
            }
        }
    );
*/

define("cardSlider",function(require,exports,module){
    'use zeptojs';
	var webkit=require("prefix"),isDom=require("isDom");
    var _cardSlider=function(arg){
        /*
            @参数改成object类型，调用更灵活，也能起到return object;一样的效果
            arg={
                dom:string|HTMLDOM,
                direction:'X'|'Y'
            }
        */
        var dom,isY,translateL='',translateR='',originXorY,pageXorY,ch=document.documentElement.clientHeight,needScale,transformOriginT,transformOriginB;
        if(typeof(arg.container)=="string"){
            dom=document.querySelector(arg.container);
            if(dom){
                throw('Container unexist!');//分页容器不存在
                return ;
            }
        }else if(!arg.container.nodeType||arg.container.nodeType!=1){
            throw('Container unexist!');//分页容器不存在
            return ;
        }else{
            dom=arg.container;
        }
        arg.onchange=typeof(arg.onchange)=="function"?arg.onchange:function(){};
        arg.duration=arg.duration||300;
        arg.duration2=arg.duration2||100;
        arg.direction=arg.direction||'Y';
        needScale=!!arg.scale;
        isY=arg.direction=="Y";
        isY?(translateL='translate3d(0,',translateR=',0)'):(translateL='translate3d(',translateR=',0,0)');//默认是垂直方向翻页
        pageXorY=isY?'pageY':'pageX';
        transformOriginT=isY?'center top':'left center';
        transformOriginB=isY?'center bottom':'right center';
        ch=isY?document.documentElement.clientHeight:document.documentElement.clientWidth;
        //var page=dom.querySelectorAll("[haloslider]");
        var page=function(){
        	//改用容器下的子元素为它的分页
        	var childNodes=dom.childNodes,res=[];
        	for(var i=0,len=childNodes.length;i<len;++i){
        		if(dom.childNodes[i].nodeType==1){
        			//是节点
        			res.push(dom.childNodes[i]);
        		}
        	}
        	return res;
        }();
        if(!page.length)return ;//没有分页存在
        var totalPage=page.length;
        arg.first=arg.first||0;//翻页初始化第一页
        if(arg.first>=totalPage)arg.first=totalPage-1;//超过最后一页，就认为是最后一页
        else if(arg.first<0)arg.first=0;//小于0，就认为是第一页
        var cur=arg.first,next=cur+1,prev=cur-1;
        if(arg.infinite){
            if(prev<0)prev=totalPage-1;
            if(next>totalPage-1)next=0;
        }
        dom.parentNode.style.overflow="hidden";
        window.addEventListener('resize',function(){//动态获取高度
            ch=isY?document.documentElement.clientHeight:document.documentElement.clientWidth;
        });
        var timeoutId,timeCb,
        _setTimeout=function(cb,time){
            //单线程setTimeout代替函数
            timeCb=cb;
            timeoutId=setTimeout(function(){
                cb();
                timeCb=cb=null;
            },time);
        },_finishedTimeout=function(){
            clearTimeout(timeoutId);
            typeof(timeCb)=="function"&&timeCb();
        };
        var isTopEdge=false,isBottomEdge=false;//触底触顶
        var _touchstart=function(e){
            var touches=e.targetTouches||e.changedTouches,touch=touches[0];
            x=touch.pageX,y=touch.pageY;
            originXorY=touch[pageXorY];
            _finishedTimeout();
        },
        _touchmove1=function(e){
            var touches=e.targetTouches||e.changedTouches,touch=touches[0],curXorY=touch[pageXorY];
            var offset=curXorY-originXorY;
            page[prev].style[webkit+"transform"]=translateL+(offset-ch)+'px'+translateR;
            //page[cur].style[webkit+"transform"]=translateL+offset+'px'+translateR;
            page[next].style[webkit+"transform"]=translateL+(offset+ch)+'px'+translateR;
            doScale(offset);
        },
        _touchmove2=function(e){
            var touches=e.targetTouches||e.changedTouches,touch=touches[0],curXorY=touch[pageXorY];
            var offset=curXorY-originXorY;
            if(cur<totalPage-1&&cur>0){
                page[prev].style[webkit+"transform"]=translateL+(offset-ch)+'px'+translateR;
                //page[cur].style[webkit+"transform"]=translateL+offset+'px'+translateR;
                page[next].style[webkit+"transform"]=translateL+(offset+ch)+'px'+translateR;
                doScale(offset);
                isTopEdge=isBottomEdge=false;
            }else{
                if(offset>0){
                    if(cur==0){
                        //触顶
                        page[cur].style[webkit+"transform"]=translateL+offset/3+'px'+translateR;
                        page[next].style[webkit+"transform"]=translateL+ch+'px'+translateR;
                        isTopEdge=true;
                    }else{
                        //向上
                        page[prev].style[webkit+"transform"]=translateL+(offset-ch)+'px'+translateR;
                        //page[cur].style[webkit+"transform"]=translateL+offset+'px'+translateR;
                        doScale(offset);
                        isBottomEdge=false;
                    }
                }else if(offset<0){
                    if(cur==totalPage-1){
                        //触底
                        page[cur].style[webkit+"transform"]=translateL+offset/3+'px'+translateR;
                        page[prev].style[webkit+"transform"]=translateL+(-1*ch)+'px'+translateR;
                        isBottomEdge=true;
                    }else{
                        //向下
                        //page[cur].style[webkit+"transform"]=translateL+offset+'px'+translateR;
                        page[next].style[webkit+"transform"]=translateL+(offset+ch)+'px'+translateR;
                        doScale(offset);
                        isTopEdge=false;
                    }
                }
            }
        },
        doScale=function(offset){
            //将scale操作单独封装起来，因为多次调用，且方法一样
            //需要scale模式
            if(needScale){
                if(offset>0){
                    page[cur].style[webkit+"transform-origin"]=transformOriginB;
                    page[cur].style[webkit+"transform"]="scale("+(1-.2*Math.abs(offset/ch))+") translateZ(0)";
                }else if(offset<0){
                    page[cur].style[webkit+"transform-origin"]=transformOriginT;
                    page[cur].style[webkit+"transform"]="scale("+(1-.2*Math.abs(offset/ch))+") translateZ(0)";
                }else{
                    page[cur].style[webkit+"transform-origin"]='';
                    page[cur].style[webkit+"transform"]='';
                }
            }
        },
        _touchend1=function(e){
            var touches=e.changedTouches||e.targetTouches,touch=touches[0],curXorY=touch[pageXorY];
            var offset=curXorY-originXorY;
            if(offset>0&&offset>=arg.offset){
                //往下
                var transition=webkit+'transform '+arg.duration/1000+'s linear';
                page[prev].style[webkit+'transition']=transition,page[prev].style[webkit+"transform"]=translateL+0+'px'+translateR;
                if(needScale){
                    page[cur].style[webkit+'transition']=transition,page[cur].style[webkit+"transform"]="scale(.8,.8) translateZ(0)";
                }
                if(next<=totalPage-1)page[next].style[webkit+"transform"]=translateL+ch+'px'+translateR;
                var _cur=cur,_prev=prev,_next=next;
                _setTimeout(function(){
                    page[_cur].style[webkit+'transition']='';
                    page[_cur].style[webkit+'transform']=translateL+ch+'px'+translateR;
                    page[_cur].style.zIndex='1';
                    page[_prev].style[webkit+'transition']='';
                    page[_prev].style.zIndex='0';
                    arg.onchange.call(page,_cur,_prev);
                },arg.duration);
                fixed(-1);
            }else if(offset<0&&-1*offset>=arg.offset){
                //往上
                var transition=webkit+'transform '+arg.duration/1000+'s linear';
                if(needScale){
                    page[cur].style[webkit+'transition']=transition,page[cur].style[webkit+"transform"]="scale(.8,.8) translateZ(0)";
                }
                page[next].style[webkit+'transition']=transition,page[next].style[webkit+"transform"]=translateL+0+'px'+translateR;
                if(prev>=0)page[prev].style[webkit+"transform"]=translateL+(-1*ch)+'px'+translateR;
                var _cur=cur,_prev=prev,_next=next;
                _setTimeout(function(){
                    page[_cur].style[webkit+'transition']='';
                    page[_cur].style[webkit+'transform']=translateL+(-1*ch)+'px'+translateR;
                    page[_cur].style.zIndex='1';
                    page[_next].style[webkit+'transition']='';
                    page[_next].style.zIndex='0';
                    arg.onchange.call(page,_cur,_next);
                },arg.duration);
                fixed(1);
            }else if(offset!=0){
                //回弹
                var transition=webkit+'transform '+arg.duration2/1000+'s linear';
                if(prev>=0)page[prev].style[webkit+'transition']=transition,page[prev].style[webkit+"transform"]=translateL+(-1*ch)+'px'+translateR;
                if(needScale){
                    page[cur].style[webkit+'transition']=transition,page[cur].style[webkit+"transform"]="scale(1,1) translateZ(0)";
                }
                if(next<=totalPage-1)page[next].style[webkit+'transition']=transition,page[next].style[webkit+"transform"]=translateL+ch+'px'+translateR;
                var _cur=cur,_prev=prev,_next=next;
                _setTimeout(function(){
                    if(!isMoving){
                        page[_cur].style[webkit+'transition']='';
                    }
                    if(prev>=0)page[_prev].style[webkit+'transition']='';
                    if(next<=totalPage-1)page[_next].style[webkit+'transition']='';
                },arg.duration2);
            }
        },
        isMoving=false,
        _touchend2=function(e){
            if(isTopEdge||isBottomEdge){
                //如触底或触顶了，回弹
                page[cur].style[webkit+'transition']=webkit+'transform '+arg.duration2/1000+'s linear'
                page[cur].style[webkit+"transform"]=translateL+0+'px'+translateR;
                _setTimeout(function(){
                    isTopEdge=isBottomEdge=false;
                    page[cur].style[webkit+'transition']='';
                },arg.duration2);
            }else{
                _touchend1(e);
            }
        },
        fixed=function(n){
            //确定cur,next,prev的数值
            cur=cur+n,prev=cur-1,next=cur+1;
            if(!arg.infinite)return;
            if(cur>=totalPage){
                cur=0;
                prev=totalPage-1;
                next=1;
            }else if(cur==totalPage-1){
                next=0;
            }else if(cur<0){
                cur=totalPage-1;
                prev=cur-1;
                next=0;
            }else if(cur==0){
                prev=totalPage-1;
            }
        },
        bindEvent=function(){
            for(var i=0,len=page.length;i<len;++i){
                page[i].addEventListener('touchstart',_touchstart);
                if(arg.infinite){
                    page[i].addEventListener('touchmove',_touchmove1);
                    page[i].addEventListener('touchend',_touchend1);
                    page[i].addEventListener('touchcancel',_touchend1);
                }else{
                    //将方法分拆写，可以提高touchmove的效率
                    page[i].addEventListener('touchmove',_touchmove2);
                    page[i].addEventListener('touchend',_touchend2);
                    page[i].addEventListener('touchcancel',_touchend2);
                }
            };
        },
        unbindEvent=function(){
            for(var i=0,len=page.length;i<len;++i){
                page[i].removeEventListener('touchstart',_touchstart);
                if(arg.infinite){
                    page[i].removeEventListener('touchmove',_touchmove1);
                    page[i].removeEventListener('touchend',_touchend1);
                    page[i].removeEventListener('touchcancel',_touchend1);
                }else{
                    //将方法分拆写，可以提高touchmove的效率
                    page[i].removeEventListener('touchmove',_touchmove2);
                    page[i].removeEventListener('touchend',_touchend2);
                    page[i].removeEventListener('touchcancel',_touchend2);
                }
            };
        };
        for(var i=0,len=page.length;i<len;++i){
            /*arg.first初始化首页*/
            page[i].style.cssText="position:absolute; left:0; top:0; width:100%; height:100%; "+(arg.first==i?" z-index:0;":webkit+"transform:"+translateL+ch+"px"+translateR+"; z-index:1;");
        }
        bindEvent();//初始化绑定
        var x=0,y=0;
        var o={};
        o.lock=function(){
            //锁定
            unbindEvent();
        },
        o.unlock=function(){
            //解锁
            bindEvent();
        },
        o.move=function(index){
            index=parseInt(index)||0;
            if(index==cur)return ;
            if(index>=0||index<=totalPage-1){
                //合法页码
                var transition=webkit+'transform '+arg.duration/1000+'s linear',flag=index>cur?-1:1;
                if(arg.infinite){
                    flag=page[index].style[webkit+'transform'].indexOf('-')>=0?1:-1;
                }
                console.log(flag);
                //page[cur].style[webkit+'transition']=transition,page[cur].style[webkit+"transform"]=translateL+(flag*ch)+'px'+translateR;
                if(needScale){
                    if(flag==-1){
                        page[cur].style[webkit+'transform-origin']=transformOriginT;
                    }else{
                        page[cur].style[webkit+'transform-origin']=transformOriginB;
                    }
                    page[cur].style[webkit+'transition']=transition,page[cur].style[webkit+"transform"]='scale(.8,.8) translateZ(0)';
                }
                page[index].style[webkit+'transition']=transition,page[index].style[webkit+"transform"]=translateL+0+'px'+translateR;
                isMoving=true;
                var _cur=cur,_next=index;
                _setTimeout(function(){
                    isMoving=false;
                    page[_cur].style[webkit+'transition']='';
                    page[_cur].style[webkit+'transform-origin']='';
                    page[_cur].style[webkit+'transform']='';
                    page[_cur].style.zIndex=1;
                    page[_cur].style[webkit+'transform']=translateL+(flag*ch)+'px'+translateR;
                    page[_next].style[webkit+'transition']='';
                    page[_next].style.zIndex=0;
                    arg.onchange.call(page,_cur,_next);
                },arg.duration);
                if(arg.infinite){
                    cur=index,prev=cur-1,next=cur+1;
                    if(prev<0)prev=totalPage-1;
                    if(next>totalPage-1)next=0;
                }
                else{
                    cur=index,prev=cur-1,next=cur+1;
                }
            }
        };
        return o;
    };
    module.exports=function(arg){
    	if(isDom(this)){
    		//是fn扩展过来的
    		arg.container=this;
    		_cardSlider(arg);
    	}else if(Object.prototype.toString.call(this)=="[object Array]"){
    		for(var i=0,len=this.length;i<len;++len){
    			arg.container=this[i];
    			isDom(this[i])&&_cardSlider(arg);
    		}
    	}else{
    		_cardSlider(arg);
    	}
    };
});
