/*
	@ author: leeenx
	@ version: 1.2.0
	@ the core of HALO.JS; use only one process to load modules,make the ho2.js like sea.js 
*/
~function(){
	'use strict'
	//声明HO2对象
	window.HO2||(window.HO2={
		modules:{},
		require:function(id){
			//导入模块函数 现阶段只支持检查modules
			var modules=window.HO2.modules;
			if(modules[id]){
				if(!modules[id].exports){//有注册过，但是还未生成可用模块
					var fn=modules[id].fn;
					fn
					?
					(
						(
							typeof(fn)==="function"
							?
							(
								function(){
									var exports=fn(HO2.require,modules[id].exports,modules[id]);
									if(typeof(exports)==="object"&&modules[id].exports){
										for(var i in exports){
											modules[id].exports[i]=exports[i];
										}
									}else if(typeof(exports)!='undefined'){
										modules[id].exports=exports;
									}
								}()
							)
							:
							(modules[id].exports=fn)
						),
						delete modules[id].fn//删除注册在模块的执行fn
					)
					:
					(
						modules[id].exports = {}
					);
				}
				return modules[id].exports;
			}
			else{
				return {};
			}
		},
		_config:{
			base: ''
		},
		config:function(arg){
			for(var i in arg){
				this._config[i]=arg[i];
			}
		},
		chk:false,
		use:function(enter){
			//入口文件只能是一个
			enter=enter.replace(/^\.\//,'');//将入口文件路径转成id格式
			var _this=this;
			this.require.async(
				enter,
				function(){
					//模块文件加载完成
					var enterModule=_this.modules[enter].fn||'';
					if(typeof(enterModule)==="function"){
						_this.chk=true,loadSubModules(enterModule.toString(),function(){
							//加载成功
							enterModule(_this.require);
						});
					}
				}
			);
		}
	});
	//加载文件代码如下：
	var loadModule=function(arg,charset){
        var script=document.createElement("script"),hasLoaded=false,typeErr=true,isTimeout=false;
        script.type='text/javascript';
        charset&&(script.charset=charset);
        script.onload=function(){
            if(isTimeout)return;//表示已经执行过abort操作了
            hasLoaded=true;
            try{document.head.removeChild(script);}catch(e){}
            setTimeout(function(){
                typeErr&&abort('parseerror');//格式不正确
            },100);
        }
        var url=arg.url;
        script.src=url;
        var abort=function(err){
            err=err||'abort';
            arg.callback(err);
            try{document.head.removeChild(script);}catch(e){}
        };
        setTimeout(function(){hasLoaded||abort();isTimeout=true;},10000);
        document.head.appendChild(script);
        var o={};
        o.abort=abort;
        return o;
    },
    loadSubModules=function(fns,cb){
    	var subModules=[],loadedCount=0;
    	fns.replace(/[^\.]\s*require\((.+?)\)/mg,function(m,$1){
    		subModules.push($1.replace(/^\'|^\"|\'$|\"$/g,""));
    	});
    	var len=subModules.length;
    	if(len==0){
    		cb&&cb();
    	}else{
    		for(var i=0;i<len;++i){
	    		HO2.modules[subModules[i]]
	    		?
	    		(
	    			chkLoadedSubModules(++loadedCount,len,cb)
	    		)
	    		:
	    		(
	    			HO2.require.async(
	    				subModules[i],
	    				null,
	    				function(){
	    					chkLoadedSubModules(++loadedCount,len,cb);
	    				}
	    			)
	    		);
	    	}
    	}
    },
    chkLoadedSubModules=function(cur,total,cb){
    	if(cur==total)cb&&cb();
    };
	//异步加载方法
	var queue=[],//文件加载队列 -- 强兼容seajs
	queuing=false,//正在排队中
	MODULE_ID='',//表示最新载入的模块的 ID
	require_async=function(module_id,loaded,registerred){
		MODULE_ID=module_id=module_id.replace(/^\.\//,'');
		var url = (module_id.indexOf("://")>-1 ? module_id : HO2._config.base+module_id.replace(/\.js$/i,'')+'.js');
		HO2.modules[module_id]={cb:registerred,uri:url,exports:null,id:module_id};//模块注册完成的回调放在这里
		loadModule(
			{
				url: url,
				callback:function(json){//加载成功回调 -- 非模块注册成功
					if('abort'==json){
						//超时
						window.define(module_id,{status: json});
					}
					loaded&&loaded();//模块文件加载成功通知 -- 一个模块可能有包含其它模块，所以这个通知一般没什么用。当registerred触发时才表示一个模块可以使用
					if(queue.length==0){
						queuing=false;//空队
					}else{
						var _module=queue.shift();
						require_async(_module[0],_module[1],_module[2]);
					}
				}
			}
		);
	};
	HO2.require.async=function(module_id,loaded,registerred){
		if(queuing){
			queue.push([module_id,loaded,registerred]);
			return ;
		}
		queuing=true;//表示模块执行中，后面的模块加载需要排队
		require_async(module_id,loaded,registerred);
	};
	window.require||(window.require=HO2.require);
	var register=function(module_id,fn){
		HO2.modules[module_id]
		?
		(
			HO2.modules[module_id].fn=fn
		)
		:
		(
			HO2.modules[module_id]={
				id: module_id,
				exports:null,
				fn:fn
			}
		);
		//jquery或zepto兼容
		if(typeof($)==="function" && module_id && !$[module_id] && !$.fn[module_id]){//防止模块覆盖原有的方法 -- 例如 $.fn.css
			$.fn[module_id]=$[module_id]=function(){
				var _module=require(module_id);
				return typeof(_module)==="function"?_module.apply(this,arguments):_module;
			};
		}
	};
	if(typeof(window.define)!="undefined" && typeof(window.define)!="function"){//define被占用，并且类型不是函数，提示冲突
		console.log("'define' is conflict!");
	}else if(typeof(define)=="undefined"){
		window.define=function(){
			var len=arguments.length;
			if(len>3){
				throw("too many arguments to function define, execpted 1~3, have "+arguments.length);
				return ;
			}else if(0==len){
				throw("takes no arguments, execpted 1~3");
				return ;
			}
			var module_id='';
			if(1<len){
				//如果不做sea.js兼容，define函数默认是两个参数
				if(typeof(arguments[0])!="string"){
					throw("arguments[0] is bad!");
					return;
				}else{
					module_id=arguments[0];
				}
			}
			var fn=arguments[len-1];
			//注册模块
			module_id=module_id||MODULE_ID;
			register(module_id,fn);
			//如果处于use引入接口中
			if(HO2.chk){
				if(typeof(fn)==="function"){
					loadSubModules(fn.toString(),HO2.modules[module_id].cb);
					delete HO2.modules[module_id].cb//回调删除
				}else{//object, string等类型
					HO2.modules[module_id].cb&&HO2.modules[module_id].cb();
				}
			}
		}
	}
}();