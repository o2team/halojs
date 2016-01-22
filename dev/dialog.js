/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-12
    @ 通用弹窗 ---- 放弃原来的actbox，太重了。只保留最基础的几种形式，并加入预扩展的事件，为定制弹窗提供可能性
    @ 用法： 
    $.dialog(
        {
            type:"success",
            text:"你好，这是普通的消息",
            closeBtn:{//关闭按钮
                show: 1,//显示，默认为0 -- 不显示
                css: '',//内联样式
                className: '',//样式类名
                attr: {},
                close: 1,//自动关闭弹窗，默认为 1
                cb: function(){
                    //点击回调
                    this.close();//调用this.close()可以关闭弹窗
                }
            },
            btns:[
                {
                    text: "知道了",
                    close: 0,//自动关闭弹窗，默认为 1
                    cb:function(){
                        //点击回调
                        this.close();//调用this.close()可以关闭弹窗
                    },
                    addEvent:{//添加事件
                        "touchmove":function(e){
                            //调用this.close可以关闭弹窗
                            e.stopPropagation();
                            console.log("btn move");
                        }
                    }
                },
                {
                    text: "知道了",
                    close: 0,//自动关闭弹窗，默认为 1
                    cb:function(){
                        //点击回调
                        this.close();//调用this.close()可以关闭弹窗
                    },
                    addEvent:{//添加事件
                        "touchmove":function(e){
                            //调用this.close可以关闭弹窗
                            e.stopPropagation();
                            console.log("btn move");
                        }
                    }
                },
                {
                    text: "去百度",
                    attr:{
                        href: "http://www.baidu.com"
                    },
                    close: 0,//自动关闭弹窗，默认为 1
                    cb:function(){
                        //点击回调
                        this.close();//调用this.close()可以关闭弹窗
                    },
                    addEvent:{//添加事件
                        "touchmove":function(e){
                            //调用this.close可以关闭弹窗
                            e.stopPropagation();
                            console.log("btn move");
                        }
                    }
                }
            ],
            mask:{//蒙层相关的属性，目前只有css(内联样式),className 类名,attr - 属性（attribute）
                className: '',
                css: '',
                attr: {},
                addEvent:{//添加事件
                    "touchmove":function(){
                        //调用this.close可以关闭弹窗
                        console.log("mask move");
                    }
                }
            },
            box:{//窗口相关的属性，目前只有css(内联样式),className 类名,attr - 属性（attribute）
                className: '',
                css: '',
                attr: {},
                addEvent:{//添加事件
                    "touchmove":function(e){
                        //调用this.close可以关闭弹窗
                        e.stopPropagation();
                        console.log("box move");
                    }
                }
            }
        }
    );
*/
define("dialog",function(require,exports,module){
    var _arg={//默认配置
        type: 'messagebox',
        text: '',
        closer: 1,
        btns:[],
        zoom: 1,//缩放值
        closeBtn:{//关闭按钮
            show: 1,
            close: 1
        },
        stroke:{
            width: 1,
            color: '#fff'
        },
        mask:{//蒙层相关的属性，目前只有css(内联样式),className 类名,attr - 属性（attribute）
            className: '',
            css: '',
            attr: {}
        },
        box:{//窗口相关的属性，目前只有css(内联样式),className 类名,attr - 属性（attribute）
            className: '',
            css: '',
            attr: {}
        }
    },
    __arg={},//__arg -- 表示当前的配置
    enablea=require("enablea"),
    styleSheet=require("stylesheet"),
    compare=require("compare"),
    prefix=require("prefix"),
    styleSheetIndex=-1,
    changeStyle=function(){
        styleSheetIndex>=0&&styleSheet.remove(styleSheetIndex);
        styleSheetIndex=styleSheet.add('\
.halo-dialog-mask{position: fixed; width: 100%; height: 100%; left: 0; top: 0; text-align: center;}\
.halo-dialog-mask::before{content: ""; display: inline-block; width: 0; height: 100%; overflow: hidden; vertical-align: middle;}\
.halo-dialog-box{position: relative; display:inline-block; width: 240px; height: auto; padding: 15px; background-color: rgba(0,0,0,.9); vertical-align: middle; border-radius: 3px; color: #fff; zoom: '+__arg.zoom+';}\
.halo-dialog-alert,.halo-dialog-error,.halo-dialog-success{display: block; position: relative; width: 50px; height: 50px; border-radius: 25px; box-sizing: border-box; border: '+__arg.stroke.width+'px solid '+__arg.stroke.color+'; margin: 0 auto 20px;}\
.halo-dialog-alert::before{content: ""; display: block; width: '+__arg.stroke.width+'px; height: 20px; background-color: '+__arg.stroke.color+'; margin: 10px auto 2px;}\
.halo-dialog-alert::after{content: ""; display: block; width: 10px; height: 10px; margin: 0 auto; border: 1px solid '+__arg.stroke.color+'; border-radius: 6px; '+prefix+'transform-origin: center top; '+prefix+'transform: scale(.3) translate3d(2px,0,0);}\
.halo-dialog-error::before{content: ""; display: block; position: absolute; width: '+__arg.stroke.width+'px; height: 24px; background-color: '+__arg.stroke.color+'; left: 50%; top: 50%; margin: -12px 0 0 0; '+prefix+'transform: rotate(45deg);}\
.halo-dialog-error::after{content: ""; display: block; position: absolute; width: '+__arg.stroke.width+'px; height: 24px; background-color: '+__arg.stroke.color+'; left: 50%; top: 50%; margin: -12px 0 0 0; '+prefix+'transform: rotate(-45deg);}\
.halo-dialog-success::before{content: ""; display: block; position: absolute; width: 24px; height: 12px; border-left: '+__arg.stroke.width+'px solid '+__arg.stroke.color+';  border-bottom:'+__arg.stroke.width+'px solid '+__arg.stroke.color+'; top: 22px; left: 20px; '+prefix+'transform-origin: left bottom; '+prefix+'transform: rotate(-45deg);}\
.halo-dialog-text{margin: 20px; overflow: hidden;}\
.halo-dialog-one-btn,.halo-dialog-one-btn:active,.halo-dialog-one-btn:visited{display: block; position: relative; width: 210px; height: 30px; line-height: 30px; text-align: center; text-decoration: none; border-radius: 3px; color: #fff; background-color: #3985ff; margin: 10px auto 0;}\
.halo-dialog-two-btn,.halo-dialog-two-btn:active,.halo-dialog-two-btn:visited{display: block; position: relative; width: 100px; height: 30px; line-height: 30px; text-align: center; text-decoration: none; border-radius: 3px; color: #fff; background-color: #3985ff; left: -55px; margin: 10px auto 0;}\
.halo-dialog-two-btn:nth-child(even),.halo-dialog-two-btn:active:nth-child(even),.halo-dialog-two-btn:visited:nth-child(even){margin-top: -30px; left: 55px; background-color: #f3f3f3; color: #333;}\
.halo-dialog-close{position: absolute; width: 20px; height: 20px; border: 10px solid transparent; top: 0; right: 0; display: block;}\
.halo-dialog-close::before,.halo-dialog-close::after{content: ""; position: absolute; display: block; width: '+__arg.stroke.width+'px; height: 20px; left: 50%; top: 0; background-color: '+__arg.stroke.color+'; '+prefix+'transform: rotate(45deg) translate3d(-50%,0,0);}\
.halo-dialog-close::after{content: ""; '+prefix+'transform: rotate(-45deg) translate3d(-50%,0,0);}\
.halo-dialog-loading-box{position: relative; display: inline-block; width: 100px; height: 100px; background-color: rgba(0,0,0,.5); padding: 10px; border-radius: 3px; zoom: '+__arg.zoom+';}\
.halo-dialog-loading{background:url(data:image/png;base64,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) 0 0 no-repeat; background-size:100%; width:50px; height:50px; margin: 16px auto 0; '+prefix+'animation: halo-dialog-loading-round 1.6s linear infinite;}\
.halo-dialog-loading-box .halo-dialog-text{margin: 10px; color: #fff; white-space: nowrap; overflow: hidden;}\
@'+prefix+'keyframes halo-dialog-loading-round{0%{'+prefix+'transform: rotate(0deg);}100%{'+prefix+'transform: rotate(360deg);}}\
');
    },
    makeAttr=function(arr){
        var type=Object.prototype.toString.call(arr),_this=this;
        if('[object Object]'==type){
            //object对象
            arr=[arr];
        }else if("[object Undefined]"==type){//undefined
            return ;
        }else if('[object Array]'!=type){
            console.log("wrong type for makeAttr");
            return ;//类型不对
        }
        for(var i=0,len=arr.length;i<len;++i){
            var dom=arr[i].dom,arg=arr[i].arg;
            arg["className"]&&(dom.className=arg["className"],delete arg["className"]);
            arg["css"]&&(dom.style.cssText=arg["css"],delete arg["css"]);
            var attr=arg["attr"]||{},events=arg["addEvent"];
            for(var j in attr){
               dom.setAttribute(j,attr[j]);
            }
            for(var j in events){
                ~function(dom,events,j){
                    setTimeout(function(){//避免事件是步添加与弹窗的事件冲突
                        dom.close=_this.close;
                        typeof(events[j])=="function"&&typeof(j)=="string"&&dom.addEventListener(j,events[j]);
                    },100);
                }(dom,events,j);
            }
        }
    },
    prevent=function(){
        document.body.addEventListener("touchstart",_prevent);
    },
    unPrevent=function(){
        document.body.removeEventListener("touchstart",_prevent);
    },
    _prevent=function(e){
        e.preventDefault();
    },
    resize=function(){
        var cw=document.documentElement.clientWidth||document.body.clientWidth||0,maxWidth=640,minWidth=320;
        cw=Math.min(Math.max(cw,minWidth),maxWidth);
        _arg.zoom=cw/minWidth;//_arg.zoom更改了
    };
    resize();
    window.addEventListener("resize",resize);
    var _dialog=function(arg){
        prevent();//禁止滚动
        for(var i in _arg){//查漏补缺
            arg[i]||(arg[i]=_arg[i]);
        }
        compare(arg,__arg)||(__arg=arg,changeStyle());
        var mask=document.createElement("div"),box=document.createElement("div"),str='',hideDialog=function(){
            try{
                document.body.removeChild(mask);
            }catch(e){}
            unPrevent();
        };
        mask.className="halo-dialog-mask",box.className="halo-dialog-box";
        makeAttr.call(
            {close: hideDialog},
            [
                {dom: mask, arg: arg.mask},
                {dom: box, arg: arg.box}
            ]
        );
        mask.appendChild(box);
        if("alert"==arg.type){
            str+='<div class="halo-dialog-alert"></div>';
        }else if("error"==arg.type){
            str+='<div class="halo-dialog-error"></div>';
        }else if("success"==arg.type){
            str+='<div class="halo-dialog-success"></div>';
        }else if("loading"==arg.type){
            arg.closeBtn={show: 0};
            box.className="halo-dialog-loading-box";
            str+='<div class="halo-dialog-loading"></div>';
        }
        str+='<div class="halo-dialog-text">'+arg.text+'</div>';
        box.innerHTML=str;
        var len=arg.btns.length;
        if(1<=len){
            var btnClassName=1==len?"halo-dialog-one-btn":"halo-dialog-two-btn",btnsWrp=document.createElement("div");//按钮的默认样式
            var lastIndex=len-1,odd=len%2;
            for(var i=0,btns=arg.btns;i<len;++i){
                var btn=document.createElement("a"),btnArg=arg.btns[i];
                btnArg.text&&(btn.innerHTML=btnArg.text,delete btnArg.text);
                btn.className=btnClassName;
                i==lastIndex&&odd&&(btn.className="halo-dialog-one-btn");
                makeAttr.call({close: hideDialog},{dom: btn,arg:btnArg});
                //添加事件
                ~function(i,btnArg){
                    btn.addEventListener("click",function(){
                        btnArg.close&&hideDialog();//自动关闭
                        typeof(btnArg.cb)=="function"&&btnArg.cb.call({close: hideDialog});
                    });
                }(i,btnArg);
                btnsWrp.appendChild(btn);
            }
            box.appendChild(btnsWrp);
        }
        //关闭按钮
        var closeBtn=document.createElement("a");
        closeBtn.className="halo-dialog-close";
        makeAttr.call({close: hideDialog},{dom: closeBtn, arg: arg.closeBtn});
        if(!arg.closeBtn.show){
            //关闭按钮是否显示
            closeBtn.style.display="none";
        }
        closeBtn.addEventListener("click",function(){
            arg.closeBtn.close&&hideDialog();
            typeof(arg.closeBtn.cb)=="function"&&arg.closeBtn.cb.call({close: hideDialog});
        });
        box.appendChild(closeBtn);
        document.body.appendChild(mask);
    };
    $.dialog=_dialog;
    return _dialog;
});