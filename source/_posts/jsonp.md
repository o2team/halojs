title: 'jsonp'
order: 19
---

## 功能

jsonp的调用方法。

## Official Usage

```javascript
$.jsonp(
	{
		url: "http://wqs.jd.com/xxx.jsonp",
		data:{
			p1:"p1"
		},
		jsonp: "callback",
		jsonpCallback: "halo_callback",
		callback: function(json){
			//todo
		},
		timeout: 10000,
		charset: 'UTF-8'
	}
);
```

## Example

```javascript
//一般常用如下：
$.jsonp(
	{
		url: 'xxx',
		data: {xx:"xx"},
		callback: function(json){
			//todo
			if("abort"==json){
				//中断请求
			}else if("timeout"==json){
				//请求超时
			}else if("parseerror"==json){
				//格式错误
			}else{
				//有正常报文了
			}
		}
	}
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| url | string | compulsory | 请求地址 |
| data | object | optional | 参数列表: <key:value> |
| jsonp | string | optional | 接口指定的函数名的参数的键名，默认为：callback |
| jsonpCallback | string | optional | 接口指定的函数名的参数的键值，默认为：HALO_XXXXX |
| timeout | string | optional | 超时时长，单位毫秒。默认6000ms。 |
| charset | string | optional | jsonp报文的编码。默认与当前页面一致 |

## 方法列表

| name | 描述 |
| :----: | :----: |
| abort | 中断请求 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |



## DEMO

{% demo demo/jsonp.html 点击查看jsonp %}
