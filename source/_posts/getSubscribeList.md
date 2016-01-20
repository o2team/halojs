title: 'getSubscribeList'
order: 7
group: 业务模块
deps:
	- jsonp
	- g_tk
---

## 功能

获取当前用户的所有已经预约的活动

> author leeenx
> version 1.0.0
> data: 2015-12-31

## Official Usage

```javascript
$.getSubscribeList(
	{
		callback:function(json){
			//详见 json 列表
		}
	}
);
```

## Lazy Usage

```javascript
$.getSubscribeList(
    function(json){
        //详见 json 列表
    }
);
```

## json列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| retCode | string | 结果码：0 - 正常， 13 - 未登录， 10003 - 为未预约, 其它 - 错误 |
| retMsg | string | 结果信息 |
| total | int | 已预约活动总数 |
| pin | string | pin码 |
| activeList | array | 已经预约活动列表，参见 activeList成员 |

## activeList 成员

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| activeID | string | 预约活动的ID |
| source | string | 来源: 1 - 微信，2 - 手Q |
| startTime | string | 活动开始时间 |
| endTime | string | 活动结束时间 |
| yuyueTime | string | 预约时间 |
| skuName | string | skuName |
| imgUrl | string | 预约活动的图片 |
| title | string | 活动名称 |
| desc | string | 活动描述 |
| url | string | 链接地址 |

## DEMO

{% demo demo/getSubscribeList.html 点击查看getSubscribeList %}





