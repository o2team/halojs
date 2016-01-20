title: 'cpc'
order: 1
group: 业务模块
deps:
	- jsonp
---

## 功能

拉取cpc焦点广告

> author leeenx
> version 1.0.0
> data: 2015-12-15

## Official Usage

```javascript
$.cpc(
	{
		data:{
	        gids: '2163',
	        pcs: '9555:100',
			pc:'2'
	    },
	    callback:function(json){
	    	//json.ret 结果码， 0 -- 返回成功
	    }
	}
);
```

## Example

```javascript
//如果没有locationid,可以使用以下方式调用
$.cpc(
	{
		data:{
	        gids: '2163',
			pc:'2' //返回广告总数
	    },
	    callback:function(json){
	    	//json.ret 结果码， 0 -- 返回成功
	    }
	}
);

//如果有locationid，可以使用以下方法调用
$.cpc(
	{
		data:{
	        gids: '3604',
		    pcs: '9555:100'//使用locationid:number的方法指定返回locationid广告的个数。如果有多个locationid，可以传: locationid1:pc1,locationid2:pc2
	    },
	    callback:function(json){
	    	//json.ret 结果码， 0 -- 返回成功
	    }
	}
);
```

## 参数列表

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| data | object | compulsory | 参见 data 参数 |
| callback | function | optional | 拉取CPC数据成功后的回调。 |

## data参数

| name | 类型 | 必选 | 描述 |
| :----: | :----: | :----: | :---- |
| gids | string | compulsory | gid参数 |
| pc | int | optional | 返回的记录的个数 |
| pcs | string | optional | 为指定locationid返回指定的记录数。格式： locationid:number |

{% alert warn %}
由于后台接口的不确定性，cpc模块会自动检查pc与pcs是否同时存在，如果同时存在的话，分三种情况：<br />
1. pcs所有的locationid没指定个数<br />
2. pcs部分locationid没指定个数，部分指定了个数<br />
3. pcs所有的locationid都指定了个数<br />
<br />

如果是1，那么cpc会将pc均分给各个locationid<br />
如果是2, 直接提示用户传参数出错<br />
如果是3，cpc会将pc设置为0，避免干涉pcs的返回<br />
{% endalert %}


## DEMO

{% demo demo/cpc.html 点击查看cpc %}

