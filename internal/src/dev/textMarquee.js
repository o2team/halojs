/*
    @ author leeenx
    @ version 1.0.0
    @ create: 2015-11-11
    @ modidy: null
    @ 走马灯文字 -- 水平
    @ 用法如下：
    var textMarquee=require("textMarquee");
    textMarquee(
        {
            speed: 50,//移动的速度，单位为px/s option
            container: DOM, //文字走马灯的容器 option
            define: "halo_text_marquee" //自定义的属性名(halo_text_marquee为缺省值) option 如果有container，程序会自动忽略define。如果没有container，程序会获取带define 属性名的节点作为container
        }
    );
*/
define("textMarquee",function(require,exports,module){
    'use zeptojs';
    var webkit=require("prefix"),
        styleSheet=require("stylesheet"),
        isDom=require("isDom"),
        marquee_classes={},
        make_marquee_class=function(duration){
            if(!duration)return '';
            var marquee_class=('halo_marquee'+duration+'').replace(/\./g,"_");
            if(!marquee_classes[marquee_class]){//还没有对应的样式名
                marquee_classes[marquee_class]=1;
                setTimeout(function(){//延迟.5生成样式
                    styleSheet.add('@'+webkit+'keyframes '+marquee_class+'{0%{'+webkit+'transform:translate3d(0,0,0);}100%{'+webkit+'transform:translate3d(-100%,0,0);}}');
                    styleSheet.add('.'+marquee_class+'_move{'+webkit+'animation: '+marquee_class+' '+duration+'s linear infinite;}');
                },500);
            }
            return marquee_class+'_move';
        },
        make_marquee=function(args){//speed表示速度，默认是 50，表示50px/s
            args=args||{},speed=args.speed||50,args.define=args.define||"halo_text_marquee";
            if(!args.container){
                //没传入container参数
                if(isDom(this)){
                    make(this,speed);
                }else if(this.length>0){
                    for(var i=0,len=this.length;i<len;++i){
                        make(this[i],speed);
                    }
                }else{
                    var containers=document.querySelectorAll("["+args.define+"]");
                    for(var i=0,len=containers.length; i<len; ++i){
                        make(containers[i],speed);
                    }
                }
            }else{
                if(typeof(args.container)==="string"){
                    var containers=document.querySelectorAll(args.container);
                    for(var i=0,len=containers.length; i<len; ++i){
                        make(containers[i],speed);
                    }
                }else if(isDom(args.container)){
                    make(args.container,speed);
                }
            }
        },
        make=function(container,speed){
            var duration=0,marquee=document.createElement("span");
            container.style.overflow="hidden";
            marquee.style.cssText="display:inline-block; white-space:nowrap; position:relative; left:100%;";
            marquee.innerHTML=container.innerHTML;
            container.innerHTML='',container.appendChild(marquee);
            var width=marquee.offsetWidth,
                coh=container.offsetWidth,
                diff=width-coh;
            if(coh<=0)return ;//不需要滚动
            //100px走2s
            duration=(diff+coh)/speed;
            var space='<span style="display:inline-block; width:'+coh+'px;"></span>';
            marquee.innerHTML=marquee.innerHTML+space;
            marquee.className=make_marquee_class(duration);
        };
    return make_marquee;
});

