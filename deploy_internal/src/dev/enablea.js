/*
	@ author leeenx
	@ version 1.0.0
	@ create: 2015-12-07
	@ modify: 2015-12-07
	@ 使用a标签在 e.preventDefault下仍然可以使用
	@ 目前使用新代码，而非原HALO.JS的代码（原来的代码被反馈点击比较慢）。
*/
define("enablea",function(require,exports,module){
	var _prevent=window.TouchEvent.prototype.preventDefault,touchType='',X=-1,Y=-1;
	window.TouchEvent.prototype.preventDefault=function(){
		if("touchstart"==this.type||"touchmove"==this.type||"touchend"==this.type||"touchcancel"==this.type)touchType=this.type;
		_prevent.apply(this,arguments);
	};
	document.body.addEventListener("touchstart",_touchstart,true);
	document.body.addEventListener("touchend",chkPrevent,true);
	document.body.addEventListener("touchcancel",chkPrevent,true);
	function _touchstart(e){
		var touches=e.targetTouches||e.changedTouches||[],touch=touches[0];
		if(!touch)return ;
		X=touch.pageX,Y=touch.pageY;
	};
	function chkPrevent(e){
		var touches=e.changedTouches||[],touch=touches[0];
		if(X<0||Y<0||!touch)return ;//表示touchstart没被触发 ---- 直接中断
		var x=touch.pageX,y=touch.pageY,offsetX=Math.abs(X-x),offsetY=Math.abs(Y-y);
		X=-1,Y=-1;//重置为0
		if(offsetX>5||offsetY>5){//touchmove 如果触发了，那个偏移量在5px都认为是没touchmove
			return ;
		}
		if(""!=touchType){
			//表示在touchstart,touchmove处理已经preventDefault了，需要程序来触发点击
			chkEl(e);
		}else{
			//touchstart,touchmove未执行preventDefault。需要延迟 50ms 再判断touchend有没有触发preventDefault;
			setTimeout(function(){
				if(""!=touchType){//touchend触发了preventDefault，需要程序来触发点击
					chkEl(e);
				}
				//未触发preventDefault，让浏览器来处理
			},50);
		}
	}
	function deptchClick(comment){
		var ev = document.createEvent('HTMLEvents');
		 ev.initEvent('click', true, true);
		 comment.dispatchEvent(ev);
	}
	function chkEl(e){
		var target=e.target;
		//触发click事件
		deptchClick(target);
		return ;//如果各个机型都成立的话，可以把下面的代码删除
		if(target&&target.tagName=='A'){
			//是A元素
			chkA(target.href);
		}else{
			chkParent(target);
		}
	}
	function chkA(href){
		if(!!href&&href.indexOf('javascript:')!=0){
			//是href链接
			location.href=href;
		}else if(href.indexOf('javascript:')==0){//表示执行一段js代码
			var evalString=href.replace('javascript:','');
			eval(decodeURIComponent(evalString));
		}
	};
	function chkParent(el){
		var parent=el.parentNode;
		while('BODY'!=parent.tagName&&'HTML'!=parent.tagName){
			if('A'==parent.tagName){
				//是A元素，不止
				chkA(parent.href);
				break;
			}
			parent=parent.parentNode;
		}
	};
	module.exports={};
});


