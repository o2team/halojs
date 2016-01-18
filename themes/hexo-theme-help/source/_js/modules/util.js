/*通用工具*/
module.exports = {
	randomStr: function (len) {
		/*随机字符串生成*/
		var tmp = [],
			n;
		while (len--) {
			n = ~~(26 * Math.random());
			tmp.push(n > 9 ? String.fromCharCode(n + 87) : n);
		}
		return tmp.join('');
	},
	saveFlow: function (func, to) {
		/*函数节流*/
		var lock = false;
		return function () {
			if (!lock) {
				lock = true, func.apply(null, arguments);
				setTimeout(function () {
					lock = false;
				}, to);
			}
		}
	},
	appendScript: function (src, onload) {
		var script = document.createElement('script');
		script.src = src;
		script.onload = onload;
		document.body.appendChild(script);
	}
};
