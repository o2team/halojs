/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 拉取cpc焦点广告
    @ 用法如下：
    //如果没有locationid,可以使用以下方式调用
    $.cpc(
		{
			data:{
		        gids: '2163',
				pc:'2' //返回广告总数
		    },
		    callback:function(json){
		    	//json.ret 结果码， 0 -- 返回成功
		    }
		}
    );
    //如果有locationid，可以使用以下方法调用
    $.cpc(
		{
			data:{
		        gids: '3604',
			    pcs: '9555:100'//使用locationid:number的方法指定返回locationid广告的个数。如果有多个locationid，可以传: locationid1:pc1,locationid2:pc2
		    },
		    callback:function(json){
		    	//json.ret 结果码， 0 -- 返回成功
		    }
		}
    );

   	由于后台接口的不确定性，cpc模块会自动检查pc与pcs是否同时存在，如果同时存在的话，分三种情况：
   	1. pcs所有的locationid没指定个数
   	2. pcs部分locationid没指定个数，部分指定了个数
   	3. pcs所有的locationid都指定了个数

   	如果是1，那么cpc会将pc均分给各个locationid
   	如果是2, 直接提示用户传参数出错
   	如果是3，cpc会将pc设置为0，避免干涉pcs的返回
*/
define("cpc",function(require,exports,module){
	var jsonp=require("jsonp"),
	_data={
		pc: 0//默认是0条记录，为了保证pcs的准确度
	},
	chkPcsParse=function(arg){
		var pcs=arg.pcs,pc=arg.pc,pcsArr=pcs.split(/\s*\,\s*/),hasNumber=pcsArr[0].indexOf(":")>=0,reg=/^\d+(\:\d+)?$/,locationidNum,lastLocationidNum;
		~function(){
			var len=pcsArr.length,fixedNum=len-pc%len;
			locationidNum=(pc+fixedNum)/len,lastLocationidNum=locationidNum-fixedNum;
		}();
		for(var i=0,len=pcsArr.length;i<len;++i){
			if(!reg.test(pcsArr[i])||(pcsArr[i].indexOf(":")>=0)!=hasNumber){//格式不对
				return false;
			}
			hasNumber||(pcsArr[i]+=':'+(len>i+1?locationidNum:lastLocationidNum));
		}
		if(!hasNumber&&!pc){
			//即没有指定locationid，pc又为0
			return false;
		}
		if(hasNumber)arg.pc=0;
		else{
			arg.pcs=pcsArr.join(",");
			arg.pc=0;
		}
		return 1;//默认为对的
	};
	module.exports=function(arg){
		if("[object Object]"!=Object.prototype.toString.call(arg))return ;
		var data=arg.data;
		for(var i in _data)data[i]||(data[i]=_data);
		if(typeof(data.gids)=="undefined"){//参数缺失
			throw("Losing primary argument: gids. ");
			return ;
		}
		if("undefined"==typeof(data.pcs)){
			if(!data.pc){//没有pcs也没有pc
				throw("Expect the argument: pc.");
				return ;
			}
		}else{
			//有pcs
			if(!chkPcsParse(data)){//检查pcs的格式
				throw("Parse error: locationid");
				return ;
			}
		}
		jsonp(
			{
				url: 'http://wq.jd.com/mcoss/focusbi/show',
				data: data,
				callback:function(json){
					arg.callback&&arg.callback(json);
				}
			}
		);
	};
});


