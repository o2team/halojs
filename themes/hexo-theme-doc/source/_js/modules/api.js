/*API页面相关*/
var Util = require('./util'),
	$ = require('./jquery'),
	CodePrettify = require('./code_prettify');

var Search,
	Template,
	Demo,
	Panel,
	init;

Template = function (temp) {
	this.tempStr = temp;
};

Template.prototype.render = function (data) {
	var str = this.tempStr;
	str = str.replace(/{{ *#(\w+?) *}}([\s\S]*?){{ *\/\1 *}}/g, function (m, g1, g2, pos, ori) {
		if (!(g1 in data)) {
			return '';
		}
		var _d = data[g1],
			_t = new Template(g2),
			_a = [];
		if (/array/i.test(Object.prototype.toString.call(_d))) {
			_d.forEach(function (val, idx, arr) {
				_a.push(_t.render(val));
			});
		} else {
			_a.push(_t.render(_d));
		}
		return _a.join('');
	}).replace(/{{ *(\w+?) *}}/g, function (m, g, pos, ori) {
		return data[g];
	});
	return str;
};

Search = (function () {
	var init,
		_$wrapper,
		_$searchWrapper,
		_map,
		_genMap,
		_render,
		_bindSearch,
		//		_isModified,
		_template;

	_map = [];
	_$wrapper = $('#j_api');
	_$searchWrapper = $('#j_api_list_search');
	_template = new Template($('#j_template').html());

	_genMap = function () {
		var _$listTitle = $('#j_api_list_normal .api_list_item'),
			tit,
			$title,
			_tmp;
		_$listTitle.each(function (idx, parent) {
			$title = $('a', parent);
			tit = $title[0].innerHTML;
			$title.each(function (idx, child) {
				_tmp = {
					href: child.href,
					title: child.innerHTML
				};
				if (idx != 0) {
					_tmp.parent = {
						title: tit
					}
				}
				_map.push(_tmp);
			});
		});
	};

	_search = function (str) {
		try {
			str = str.trim();
			if (str == '') {
				_render();
				return;
			}
			var reg = new RegExp(str, 'i'),
				res = _map.filter(function (val) {
					return reg.test(val.title);
				});
			_render(res, reg);
		} catch (e) {
			_render([]);
		}

	};

	_render = function (map, reg) {
		_$searchWrapper.removeClass('api_list_search_complete');
		var str = [];
		if (!map) {
			_$wrapper.removeClass('j_stat_search');
			return;
		}
		if (map.length == 0) {
			_$searchWrapper.html('<li class="api_list_search_empty">根据相关法律法规和政策, <br>部分搜索结果未予显示。</li>');
			return;
		}
		map.forEach(function (val) {
			var obj = val.parent ? {
				title: val.title.replace(reg, function (m) {
					return '<i>' + m + '</i>';
				}),
				href: val.href,
				parent: val.parent
			} : {
				title: val.title.replace(reg, function (m) {
					return '<i>' + m + '</i>';
				}),
				href: val.href
			};
			str.push(_template.render(obj));
		});
		_$searchWrapper.html(str.join(''));
		setTimeout(function () {
			_$searchWrapper.addClass('api_list_search_complete');
		}, 100);
	};

	_bind = function () {
		var $search = $('#j_api_search_input');
		// search.addEventListener('blur', function () {
		// 	setTimeout(function () {
		// 		Util.removeClass(_wrapper, 'j_stat_search');
		// 		search.value = '';
		// 	}, 100);
		// });
		$search.on('keyup', function (evt) {
			_$wrapper.addClass('j_stat_search');
			_search(this.value);
		});
	};

	init = function () {
		_genMap();
		_bind();
	};

	return {
		init: init
	}
})();

Demo = (function () {
	var init,
		genCode,
		loaded,
		showCode,
		hideCode;

	loaded = false;
	showCode = function (target, _text) {
		if (!$(target).data('showed')) {
			new QRCode(target, {
				text: _text,
				width: 128,
				height: 128,
				colorDark : "#000000",
				colorLight : "#ffffff",
				correctLevel : QRCode.CorrectLevel.H
			});
			$(target).data('showed', true);
		}
		$(target).addClass('post_content_dbtn_qrcode');
	};
	hideCode = function (target) {
		$(target).removeClass('post_content_dbtn_qrcode');
	};
	init = function () {
		$(document.body).on('mouseover', function (evt) {
			if ($(evt.target).hasClass('post_content_dbtn')) {
				if (!loaded) {
					loaded = true;
					Util.appendScript(hexo.config.root + 'js/qrcode.js', function () {
						showCode($('div', evt.target)[0], $(evt.target).data('url'));
					});
					if ('QRCode' in window) {
						showCode($('div', evt.target)[0], $(evt.target).data('url'));
					}
				}
				else {
					showCode($('div', evt.target)[0], $(evt.target).data('url'));
				}
			}
		});
		$(document.body).on('mouseout', function (evt) {
			if ($(evt.target).hasClass('post_content_dbtn')) {
				hideCode($('div', evt.target)[0]);
			}
		});
	};
	return {
		init: init
	}
})();

Panel = (function () {
	var init,
		_bind,
		_$menu,
		_$body,
		_$panel;

	_$menu = $('#j_menu');
	_$body = $(document.body);
	_$panem = $('#j_panel');

	_bind = function () {
		_$menu.on('click', function () {
			if (_$body.hasClass('open_panel')) {
				_$body.removeClass('open_panel');
			}
			else {
				_$body.addClass('open_panel');
			}
		});
	};

	init = function () {
		_bind();
	};
	return {
		init: init
	}
})();
init = function () {
	CodePrettify.init();
	Demo.init();
	Search.init();
	Panel.init();
};

module.exports = {
	init: init
};
