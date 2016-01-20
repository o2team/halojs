title: 'mcoss'
order: 8
group: 业务模块
deps:
	- jsonp
---

## 功能

拉取mcoss卖块

> author leeenx
> version 1.0.0
> data: 2015-12-15

## Official Usage

```javascript
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
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| data | object | compulsory | 参见 data 列表 |
| callback | function | optional | 回调函数。返回数据参见 json 列表 |

## data 列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :---- |
| actid | string | compulsory | 活动id |
| areaid | string | optional | 地区id,多个id之间用”,“间隔 |
| pc | int | optional | 返回数据的总数，默认：100 |
| pcs | int | optional | 默认为0,确保返回数据准确。 |

## json 列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| ret | string | 结果码：0 - 返回正确，其它 - 错误 |

## DEMO

{% demo demo/mcoss.html 点击查看mcoss %}
