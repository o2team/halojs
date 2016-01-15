var $ = require('./jquery'),
	util = require('./util');
module.exports = (function () {
	var _bind,
		$mlist,
		$dl;

	$mlist = $('#j_dlist');
	$dl = $('#j_dl');

	_bind = function () {
		$mlist.on('click', function (evt) {
			var $target = $(evt.target),
				deps = $target.closest('.j_dlist_item').data('deps');
			if ($target.is('.j_dlist_toggleon')) {
				$target.closest('.j_dlist_item').addClass('j_dlist_item_on');
			}
			if ($target.is('.j_dlist_toggleoff')) {
				$target.closest('.j_dlist_item').removeClass('j_dlist_item_on');
			}
		});

		$dl.on('click', function (evt) {
			var href = [],
				obj = {},
				url = ['uncmd.js'];

			$('.j_dlist_item_on').each(function (idx, el) {
				href.push($(el).data('src'));
				if ($(el).data('deps')) {
					$.each($(el).data('deps').split(' '), function (idx, val) {
						href.push(val);
					});
				}
			});
			$.each(href, function (idx, val) {
				obj[val] = true;
			});
			if (href.length === 0) {
				$('.j_dlist_item a').each(function (idx, el) {
					href.push($(el).data('src'));
				});
			}
			for (var i in obj) {
				url.push(i + '.js');
			}
			$.ajax({
				url: 'http://aotu.jd.com/common/api/rcombo',
				type: 'POST',
				async: false,
				data: {
					root: 'http://wq.360buyimg.com/js/ho2/min/',
					files: JSON.stringify(url),
					download_name: 'halojs.js',
					isCompress: 0,
					isDownload: 1,
					encoding: 'utf8'
					// version: util.randomStr(16)
				},
				success: function (data) {
					window.open(data.url, '_blank');
				}
			});
		});
	}
	var init = function () {
		_bind();
	};
	return {
		init: init
	}
})()
