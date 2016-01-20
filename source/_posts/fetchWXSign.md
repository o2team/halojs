title: 'fetchWXSign'
order: 5
group: 业务模块
deps:
	- jsonp
---

## 功能

获取当前url下的签名信息。在获取到签名后才能调用微信的各种接口，<br />详情可以查看:  [http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS%E6%8E%A5%E5%8F%A3](http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS%E6%8E%A5%E5%8F%A3)

## Official Usage

```javascript
$.fetchWXSign(
	function(json){
        console.log(json);// 具体参见 json 列表
    }
);
```
## json列表

| name | 类型 | 描述 |
| :----: | :----: | :---- |
| errCode | string | 错误码：0 - 返回正确，其它 - 错误 |
| errMsg | string | 错误信息 |
| appId | string | wqs.jd.com的appid |
| timestamp | string | 签名的时间戳 - 有效期为：7200s |
| nonceStr | string | 生成签名的随机串 |
| signature | string | 签名 |
| jsapi_ticket | string | 票据 |

## DEMO

{% demo demo/fetchWXSign.html 点击查看fetchWXSign %}


