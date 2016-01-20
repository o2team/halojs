title: 'subscribeNumber'
order: 14
group: 业务模块
deps:
	- jsonp
	- g_tk
---

## 功能

查看商品预约人数

> author leeenx
> version 1.0.0
> data: 2015-12-14

## Official Usage

```javascript
$.subscribeNumber(
    {
        sku: '2205402',
        callback:function(number,json){
            //没有结果码，无须登录
            //number预约人数，json 返回数据。能查到其它信息（如果预开始时间和结束时间等）
            alert("预约人数："+number);
        }
    }
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| sku | string | compulsory | 商品的sku |
| callback | function | optional | 回调函数。返回两个参数：num和json。<br />num即返回的预约人数。json请参见json 列表|

## json 列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| type | int | 预约类型 |
| num | int | 预约人数 |
| d | int | - |
| category | string | 所属栏目ID |
| flag | boolean | - |
| stime | string | 预约开始时间 |
| etime | string | 预约结束时间 |
| state | int | 当前预约状态 |
| sku | string | 当前商品的sku |
| url | string | - |
| isJ | int | - |
| info | string | 描述信息 |



## DEMO

{% demo demo/subscribeNumber.html 点击查看subscribeNumber %}

