title: 'wxSDKConfig'
order: 18
group: 业务模块
deps:
	- fetchWXSign
---

## 功能

微信JS SDK的页面配置信息，自动将JD的签名配置上去。

> author leeenx
> version 1.0.0
> data: 2016-01-03

## Official Usage

```javascript
$.wxconfig(
	{
		jsApiList:[],
		success:function(){
			alert("配置成功");
		},
		fail: function(res){
			alert(res);
		}
	}
);
```

## Lazy Usage

```javascript
$.wxconfig();
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| jsApiList | array | optional | 微信API接口启用列表。<br />可选项请看：[jsApiList](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.952-.E6.89.80.E6.9C.89JS.E6.8E.A5.E5.8F.A3.E5.88.97.E8.A1.A8) <br />默认开启：<br />"onMenuShareTimeline",<br />"onMenuShareAppMessage",<br />"onMenuShareQQ",<br />"onMenuShareWeibo",<br />"onMenuShareQZone"<br /> |
| success | function | optional | 配置成功回调 |
| fail | function | optional | 配置失败回调。回传 `res` 参数表示错误信息 |


## DEMO

{% demo demo/wxSDKConfig.html 点击查看wxSDKConfig %}




