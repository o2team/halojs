var $ = require('./jquery')
module.exports = (function () {
	var _bind,
		$mlist,
		$dl;

	$mlist = $('#j_dlist');
	$dl = $('#j_dl');

	_bind = function () {
		$mlist.on('click', function (evt) {
			var $target = $(evt.target)
			if ($target.is('.j_dlist_toggleon')) {
				$target.closest('.j_dlist_item').addClass('j_dlist_item_on');
			}
			if ($target.is('.j_dlist_toggleoff')) {
				$target.closest('.j_dlist_item').removeClass('j_dlist_item_on');
			}
		});

		$dl.on('click', function (evt) {
			var href = ['uncmd.js'];
			// var href = [];
			$('.j_dlist_item_on a').each(function (idx, el) {
				href.push($(el).data('src'));
			});
			if (href.length === 0) {
				$('.j_dlist_item a').each(function (idx, el) {
					href.push($(el).data('src'));
				});
			}
			$.ajax({
				url: 'http://aotu.jd.com/common/api/rcombo',
				type: 'POST',
				async: false,
				data: {
					root: 'http://wq.360buyimg.com',
					files: JSON.stringify(href),
					download_name: 'halojs.js',
					isCompress: 1,
					isDownload: 1,
					encoding: 'utf8'
				},
				success: function (data) {
					window.open(data.url);
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
