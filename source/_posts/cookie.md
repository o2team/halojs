title: cookie
order: 3
---

## 功能

操作COOKIE。目前支持删除，修改和添加

> author leeenx
> version 1.0.0
> data: 2015-12-12

## Official Usage

```javascript
// 获取cookie值 -- zepto.js默认是没有cookie
$.cookie(
    {
        type: "get",
        key: "name",
        index: 0//多值cookie下可以取按索引取值 -- option
    }
);
// 添加/修改cookie
$.cookie(
    {
        type: "set",
        key: "name",
        value: "val",
        expires: 30,//单位分钟 -- option
        domain: "jd.com",//域名 -- option
        path: "/", //路径 -- option
        unit: "minute" //expires的单位，默认是天（为了兼容jq）。可选的值： second,minute,hour,day,week,year
    }
);
// 删除cookie
$.cookie(
    {
        type: "delete",
        key: "name",
        domain: "jd.com",//域名 -- option
        path: "/" //路径 -- option
    }
);
```
## Lazy Usage

```javascript
// 取cookie值
$.cookie("key");

//简单添加或修改
$.cookie("key","value");
//详细设置
$.cookie("key","value",{expire:"xx",domain:"xx",path:"xx",unit: "xx"})

//删除cookie
$.cookie("key",null);
```

## 参数列表

| name | 类型 | 必选 | 描述 | 约束条件 |
| :----: | :----: | :----: | :---- | :----: |
| type | string | compulsory | 操作的类型。共有三值可选：get,set,delete| - |
| key | string | compulsory | cookie的键名 | - |
| index | int | optional | 按索引取同名cookie的值 | type:"get" |
| value | string | compulsory | cookie的键值 | type: "set" |
| expires | int | optional | cookie过期时长，默认单位为分钟。可以通过unit设置单位 | type: "set" |
| domain | string | optional | cookie的域名| type: "set" |
| path | string | optional | cookie的存储路径，默认是"/" | type: "set" |
| unit | string | optional | expires的单位，默认为minute。可选值如下：<br />second,minute,hour,day,week,year | type: "set" |



## DEMO 

{% demo demo/cookie.html 点击查看cookie %}

