/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-15
    @ 拉取mcoss卖块
    @ 用法如下：
    $.mcoss(
		{
			data:{
		        actid: '61887',//活动id
		        areaid:'99562,99563',//地区id,多个id之间用”，“间隔
		        pc:100,//如果没有限定数量的话，默认传100
		        pcs:0//这个参数保证返回数据的绝对正确
		    },
		    callback:function(json){
		    	//json.ret 结果码， 0 -- 返回成功
		    }
		}
    );
*/
define("mcoss",function(require,exports,module){
	var jsonp=require("jsonp");
	return function(arg){
		if(!arg)return ;
		var url="http://wq.jd.com/mcoss/mmart/show",
		_data={
			actid:'',
			areaid:'',
			pc :'10',
			ptag : '1000.1.1',
			options : 1 // 默认加上options=1 
		},
		data=arg.data||{};
		for(var i in _data){
			data[i]||(data[i]=_data[i]);//如果不存在这个参数，就使用默认的参数
		}
		jsonp(
			{
				url: url,
				data: data,
				callback:function(json){//完成
					arg.callback&&arg.callback(json);
				}
			}
		);
	}
});