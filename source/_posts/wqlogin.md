title: 'wqlogin'
order: 16
group: 业务模块
deps:
	- request
	- cookie
---

## 功能

微信手Q登录

> author leeenx
> version 1.0.0
> data: 2015-12-12

## Official Usage

```javascript
$.wqlogin(
	{
		type: "auto", //登录方式 -- 三个值 auto|qq|wx
		scope: "snsapi_base", //微信授权方式
		status: function(res){
			//当前登录状态 -- 根据当前cookie判断的登录状态，所以，退登不能与自动登录同时执行
			res||this.login();
		}
	}
);
//退登
$.wqlogin(
	{
		logout: 1//非0就表示退登
	}
);
```

## Lazy Usage

```javascript
$.wqlogin();
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| type | string | optional | 登录的方式选项：auto,qq,wx。默认值：auto（表示自己识别环境）。 |
| scope | string | optional | 微信登录授权选项：snsapi_base 和 snsapi_userinfo。默认值：snsapi_base |
| status | function | optional | 监听当前登录状态。返回 res 参数。true - 已经登录，false - 未登录 |
| logout | int | optional | 0不退登录，非0退登 |


## DEMO

{% demo demo/wqlogin.html 点击查看wqlogin %}
