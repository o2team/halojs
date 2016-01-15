hexo.extend.helper.register('sidebar', function (className, environment) {
	var that,
		group,
		groups,
		found,
		pagelink,
		current,
		str,
		items,
		children,
		addGroup;

	that = this;
	type = that.page.path.split('/')[0];
	groups = that.site.data.sidebar[type];
	pagelink = that.page.canonical_path.split('/').pop();
	pagetitle = that.page.title;
	str = [];

	that.site.posts.data.sort(function (a, b) {
		return a.order - b.order;
	});
	//page.canonical_path带***.html, page.path不带.
	addGroup = function (isothers) {
		return function (group) {
			current = false;
			children = [];
			items = that.site.posts.data.filter(function (obj, idx, arr) {
				if (isothers) {
					return !('group' in obj);
				}
				return obj.group === group;
			});
			items.forEach(function (val) {
				if (pagetitle === val.title) {
					current = true;
					children.push('<li class="' + className + '_list_item current">');
				}
				else {
					children.push('<li class="' + className + '_list_item">');
				}
				children.push('<a href="' + that.url_for(val.path) + '">' + val.title + '</a>');
				children.push('</li>');
			});
			str.push(items[0] ? '<li class="' + className + '_list_title">' + (isothers ? '其他组件' : group) + '</li>' : '');
			str.push(children.join(''));
		};
	};
	groups.forEach(function (val) {
		if (environment === 'external' && val === '业务模块') {
			return;
		}
		addGroup(false)(val);
	});
	addGroup(true)();
	return str.join('');
});

hexo.extend.helper.register('is', function (type) {
	return this.page.path.split('/')[0] === type;
});

hexo.extend.helper.register('download_list', function (environment) {
	var that = this,
		str = [];
	that.site.posts.data.sort(function (a, b) {
		return a.order - b.order;
	});
	str.push('<ul id="j_dlist" class="dlist">');
	that.site.posts.data.filter(function (val) {
		return !val.ignore;
	}).filter(function (val) {
		if (environment === 'internal') {
			return true;
		}
		return val.group === '业务模块' ? false : true;
	}).forEach(function (val, idx, arr) {
		str.push('<li id="dl_' + val.title + '" class="j_dlist_item dlist_item" '
				+ (val.deps ? 'data-deps="' + val.deps.join(' ') + '" ' : '')
				+ 'data-src="' + val.title +'"'
			 + '">')
		str.push('<div>');
		str.push('<span class="j_dlist_toggleoff dlist_item_toggleoff">取消选择</span>');
		str.push('<span class="j_dlist_toggleon dlist_item_toggleon">点击选择</span>');
		// str.push('<a class="dlist_item_doc" href="' + that.url_for(val.path) + '" target="_blank" title="点击查看文档">' + val.title + '</a>');
		str.push('<a class="dlist_item_doc" href="javascript:;" target="_blank" title="点击查看文档">' + val.title + '</a>');
		str.push('</div>');
		str.push('</li>');
	});
	str.push('</ul>');
	return str.join('');
})
