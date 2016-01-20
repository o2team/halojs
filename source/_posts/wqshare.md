title: 'wqshare'
order: 17
group: 业务模块
deps:
	- wxSDKConfig
---

## 功能

兼容手Q微信原来的方法，使用window.shareConfig对象来配置对象

> author leeenx
> version 1.0.0
> date: 2016-01-03

## Official Usage

```javascript
window.shareConfig = {
    img_url: 'http://wqs.jd.com/promote/2015/childrensday/images/share.png',//分享图标 - 必选
    img_width: 80,//分享图片尺寸之宽 - 可选
    img_height: 80,//分享图片尺寸之高 - 可选
    link: location.href,//分享地址 - 必选
    title: '乐享六一，儿童节礼物免费领',//分享标题 - 必选
    desc: '京东六一送大礼！积木、泰迪熊、遥控汽车、早教机，5000元旅游基金免费领哟！动动手指就有机会获得~',//分享描述 - 必选
    shareCallback:function(sharetype,retmsg,appret){
        /*
            @sharetype:分享类型
            @retmsg:分享结果信息
            @appret:手Q或微信接口返回的原始信息
            @@手Q对应的参数
                sharetype有四个值："ShareToQQ","ShareToQzone","ShareToWX","ShareToPYQ"
                retmsg有两个值：ok,cancel
                appret有两个值：0和1。分别对就上面的ok和cancel。表示分享成功和取消
            @@微信对应的参数
                sharetype 有3个值："sendAppMessage","shareTimeline"，"shareQQ" -- 分享到QZONE或是QQ好友，都是shareQQ,并且不管有没有成功都提示成功
                retmsg有两个值：ok,cancel（理论上还有一个fail分享失败）
                appret有8个值(分享给好友4个与分享朋友圈4个)：
                分享给微信好友:
                'share_timeline:cancel' - 用户点取消
                'share_timeline:fail' - 分享失败
                'share_timeline:confirm' - 分享成功
                'share_timeline:ok' - 分享成功
                分享到朋友圈：
                'send_app_msg:cancel' - 用户点取消
                'send_app_msg:fail' - 分享失败
                'send_app_msg:confirm' - 分享成功
                'send_app_msg:ok' - 分享成功
        */
        //简单地只需要判断retmsg为ok与cancel就可以了
        if("ok"==retmsg){
            alert("分享成功");
        }else{
            alert("用户取消分享");
        }
    }
};
```

## Lazy Usage

```javascript
window.shareConfig = {
    img_url: 'http://wqs.jd.com/promote/2015/childrensday/images/share.png',//分享图标 - 必选
    link: location.href,//分享地址 - 必选
    title: '乐享六一，儿童节礼物免费领',//分享标题 - 必选
    desc: '京东六一送大礼！积木、泰迪熊、遥控汽车、早教机，5000元旅游基金免费领哟！动动手指就有机会获得~'
};
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| img_url | string | compulsory | 分享图标 |
| link | string | compulsory | 分享地址 |
| title | string | compulsory | 分享标题 |
| desc | string | compulsory | 分享描述 |
| img_width | int | optional | 分享图标宽度 |
| img_height | int | optional | 分享图标高度 |
| shareCallback | function | optional | 分享回调。会返回三个参数: sharetype,retmsg,appret。<br />参见sharetype,retmsg,appret详解|


## sharetype 详解

> 分享类型

| 环境 | 值 |
| :----: | :---- |
| 微信 | sendAppMessage - 分享给好友,&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <br />shareTimeline - 分享到朋友圈，<br />shareQQ -- 分享到QZONE或是QQ好友 |
| 手Q | ShareToQQ - 分享给QQ好友或QQ群,<br />ShareToQzone - 分享到QZONE,<br />ShareToWX - 分享给微信好友,<br />ShareToPYQ - 分享到微信朋友圏|

## sharemsg 详解

> 分享结果信息

| 环境 | 值 |
| :----: | :---- |
| 微信 | ok - 分享成功；cancel - 取消分享 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |
| 手Q | ok - 分享成功；cancel - 取消分享 |

## appret 详解

> 接口返回的原始信息

| 环境 | 值 |
| :----: | :---- |
| 微信 | 分享给微信好友: <br />&nbsp; &nbsp; &nbsp; &nbsp; 'share_timeline:cancel' - 用户点取消<br />&nbsp; &nbsp; &nbsp; &nbsp; 'share_timeline:fail' - 分享失败<br />&nbsp; &nbsp; &nbsp; &nbsp; 'share_timeline:confirm' - 分享成功<br />&nbsp; &nbsp; &nbsp; &nbsp; 'share_timeline:ok' - 分享成功<br />分享到朋友圈：<br />&nbsp; &nbsp; &nbsp; &nbsp; 'send_app_msg:cancel' - 用户点取消<br />&nbsp; &nbsp; &nbsp; &nbsp; 'send_app_msg:fail' - 分享失败<br />&nbsp; &nbsp; &nbsp; &nbsp; 'send_app_msg:confirm' - 分享成功<br />&nbsp; &nbsp; &nbsp; &nbsp; 'send_app_msg:ok' - 分享成功 |
| 手Q | 0和1。分别对就上面的ok和cancel。表示分享成功和取消 |

## DEMO

{% demo demo/wqshare.html 点击查看wqshare %}







