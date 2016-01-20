title: 'querySubscribe'
order: 12
group: 业务模块
deps:
	- jsonp
	- g_tk
---

## 功能

查询预约结果。单活动验证，如果是多活动验证，可以使用 `getSubscribeList` 来获取所有的预约活动来做筛选

> author leeenx
> version 1.0.0
> data: 2015-12-15

## Official Usage

```javascript
$.querySubscribe(
	{
		activeId: '10001',
		callback:function(json){
			//"retCode":"0",//0为已预约，10003为未预约，文档未标明未登录的错误码，估计是 10004 为未登录
		}
	}
);
```




## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| activeId | string | compulsory | 活动ID |
| callback | function | optional | 回调函数。返回数据参见 json 列表|

## json 列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| retCode | string | 结果码：0 - 已预约，10003 - 未预约，其它未预约 |

## DEMO

{% demo demo/querySubscribe.html 点击查看querySubscribe %}