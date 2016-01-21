var $ = require('./jquery');
module.exports = (function () {
	var _bind,
		_date,
		$mlist,
		$dl,
		$btns;

	_date = new Date();
	$mlist = $('#j_dlist');
	$dl = $('#j_dl');
	$btns = $('#j_dtxt');

	_bind = function () {
		$mlist.on('click', function (evt) {
			var $w = $(evt.target).closest('.j_dlist_item');
			if ($w.hasClass('j_dlist_item_on')) {
				$w.removeClass('j_dlist_item_on');
			}
			else {
				$w.addClass('j_dlist_item_on');
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
				$('.j_dlist_item').each(function (idx, el) {
					obj[$(el).data('src')] = true;
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
					encoding: 'utf8',
					version: [
						_date.getFullYear(),
						_date.getMonth(),
						_date.getDate(),
						_date.getHours()
					].join('')
				},
				success: function (data) {
					window.open(data.url, '_blank');
				}
			});
		});

		$btns.on('click', function (evt) {
			if ($(evt.target).hasClass('j_dtxt_sa')) {
				$('.j_dlist_item', $mlist).addClass('j_dlist_item_on');
				return;
			}
			if ($(evt.target).hasClass('j_dtxt_sr')) {
				$('.j_dlist_item', $mlist).each(function (idx, el) {
					if ($(el).hasClass('j_dlist_item_on')) {
						$(el).removeClass('j_dlist_item_on');
					}
					else {
						$(el).addClass('j_dlist_item_on');
					}
				})
				return;
			}
		})
	}
	var init = function () {
		_bind();
	};
	return {
		init: init
	}
})()
