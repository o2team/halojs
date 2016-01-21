module.exports = {
	generify: function (func) {
		var args,
			incb;
		return function () {
			args = Array.prototype.slice.call(arguments);
			args.push(function () {
				incb && incb.apply(null, arguments);
			});
			func.apply(null, args);
			return function (cb) {
				incb = cb;
			}
		};
	},
	future: function (func) {
		var gen = func(),
			kickoff,
			result;
		kickoff = function (data) {
			var result = gen.next(data);
			if (!result.done) {
				result.value.call(null, function () {
					kickoff(Array.prototype.pop.call(arguments));
				});
			}
		};
		kickoff();
	}
};