title: 'queryPreSaleSKU'
order: 10
group: 业务模块
deps:
	- jsonp
	- g_tk
---

## 功能

通过skuid查询微信手Q下预约商品的三个关键参数：cosspresaleid,globalpresaleid,salestarttime。

> author leeenx
> version 1.0.0
> data: 2015-12-15

## Official Usage

```javascript
$.queryPreSaleSKU(
	{
		skuid: '2205402',
		callback: function(retArr){
			//参见retArr列表
	        if(retArr.length){
	            //返回成功
	        }
	    }
	}
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| skuid | string | compulsory | skuid |
| callback | function | optional | 回调函数。返回数据参见 retArr列表|

## retArr列表

| 索引 | 描述 |
| :----: | :---- |
| 0 | skuid |
| 1 | cosspresaleid |
| 2 | globalpresaleid |
| 3 | salestarttime |


## DEMO

{% demo demo/queryPreSaleSKU.html 点击查看queryPreSaleSKU %}

