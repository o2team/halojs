title: 'fetchCoupon'
order: 4
group: 业务模块
deps:
	- jsonp
	- g_tk
---

## 功能

领券或抽奖接口

> author leeenx
> version 1.0.0
> data: 2015-12-07

## Official Usage

```javascript
$.fetchCoupon(
	{
		url: "http://wq.jd.com/active/active_draw",  //可选项，表示更换接口的url地址
		data:
		{
			activeid: "active_name",
			level: 0
		},
		callback: function(json){
			//json.ret 结果码，常见码如下：
			//0 -- 成功
			//2 -- 未登录
			//3～6 -- 已经领过券
			//7 -- 优惠券已经派完
			//101 -- 活动不存在
			//103 -- 活动未开始
			//104 -- 活动已结束
		}
	}
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| data | object | compulsory | 参见 data 参数 |
| callback | function | optional | 返回数据回调。返回对象参见 json列表 |

## data 参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| activeid | string | compulsory | 活动名 |
| level | int | optional | 抽奖的等级或兑换券的等级。根据实际情况决定要不要加这个参数 |

## json列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| ret | string | 结果码：<br /> 0: 成功，<br />2: 未登录, <br />3~6: 已经领过券（抽过奖）<br />7: 优惠券已经派完<br />101: 活动不存在<br />103: 活动未开始<br />104: 活动已结束 |

## DEMO

{% demo demo/fetchCoupon.html 点击查看fetchCoupon %}

