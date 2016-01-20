title: 'subscribeActive'
order: 13
group: 业务模块
deps:
	- jsonp
	- g_tk
---

## 功能

活动预约

> author leeenx
> version 1.0.0
> data: 2015-12-14

## Official Usage

```javascript
$.subscribeActive(
    {
        activeId: '173',//可以同时预约多个活动，不过上限是20个。多个活动预约的方式：activeId: "xxx,xxx,xxx"
        callback:function(json){
            //"retCode":"", 返回码，正常返回为空，13为未登录，10001参数错误，其他为系统错误
            //"replyCode":"0", 0预约成功 10006重复预约，10007不是预约活动，10008预约已结束，10009预约还未开始
        }
    }
);
```


## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| activeId | string | compulsory | 活动ID，可以同时预约多个活动（上限20个）。<br />多个活动预约的参数为:"activeId1,adtiveId2,..." |
| callback | function | optional | 回调函数。返回数据参见 json 列表|

## json 列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| retCode | string | 结果码：<br />0 - 正常，<br />13 - 未登录，<br />10001 - 参数错误， <br />其它 - 系统错误 |
| replyCode | string | 预约结果码：<br />0 - 预约成功，<br />10006 - 重复预约，<br />10007 - 不是预约活动，<br />10008 - 预约已结束，<br />10009 - 预约还未开始 |

## DEMO

{% demo demo/subscribeActive.html 点击查看querySubscribe %}