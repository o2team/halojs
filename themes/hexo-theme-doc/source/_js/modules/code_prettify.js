/*代码高亮*/
var Util = require('./util'),
	$ = require('./jquery'),
	prettify = require('./google_code_prettify');

var _apilist,
	_prettify,
	_pre,
	init;
_$apilist = $('#j_apilist');
_$pre = $("pre");

init = function () {
	_$pre.each(function (idx, el) {
		$(el).addClass("linenums prettyprint");
	});
	prettify.prettyPrint();
};
module.exports = {
	init: init
};
