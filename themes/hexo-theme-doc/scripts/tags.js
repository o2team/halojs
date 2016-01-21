/* 注册标签
	hexo.extend.tag.register(
		tagname,
		function (args, content) {
			return '';
		}, {
			ends: true,
			async: true
		});
*/
var url = require('url'),
	path = require('path'),
	author,
	host;

author = hexo.config.author;

hexo.extend.tag.register(
	'alert',
	function (args, content) {
		switch (args[0]) {
		case 'error':
			return '<p class="post_content_error">' + content + '</p>';
		case 'warn':
			return '<p class="post_content_warn">' + content + '</p>';
		case 'info':
			return '<p class="post_content_info">' + content + '</p>';
		}
	}, {
		ends: true
	}
);


// {% demo root + demo/cardSlider.html title%}
hexo.extend.tag.register(
	'demo',
	function (args) {
		return [
			'<div class="post_content_demo fix">',
				'<a href="',
				url.resolve(hexo.config.url, path.join(hexo.config.root, args[0])),
				'" target="_blank" >',
				args[1],
				'</a>',
				'<div class="post_content_dbtn" data-url="',
					url.resolve(hexo.config.url, path.join('/haloDoc', args[0])),
					'">显示二维码',
					'<div></div>',
				'</div>',
			'</div>'
		].join('');
	}
);



// {% url btnname %}
hexo.extend.tag.register(
	'download',
	function (args) {
		var deps = this.deps || [];
		return '<div class="post_content_download"><a id="j_post_content_download" href="javascript:;" data-files="uncmd ' + deps.join(' ') + ' ' + this.title + '">' + args[0] + '</a></div>';
	}
)