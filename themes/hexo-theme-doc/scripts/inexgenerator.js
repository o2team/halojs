var Path = require('path'),
	fs = require('fs'),
	minimist = require('minimist');

Array.prototype.each = function (opt) {
	/*
		 opt = {
		 	func(val, idx, arr, finish)
			onprogress()
			ondone()
		 }
	*/
	var len = this.length,
		i = len,
		completed = 0,
		finish = function () {
			++completed >= len && opt.ondone && opt.ondone.call(this);
			opt.onprogress && opt.onprogress.call(this);
		};
	if (len === 0) {
		opt.ondone && opt.ondone.call(this);
	}
	while (i--) {
		opt.func.apply(null, [this[i], i, this, finish]);
	}
};

fs.walk = function (path, opt) {
	return new Promise(function (resolve) {
		path = Path.normalize(path);
		var _files = [];
		opt = opt || {};
		fs.readdir(path, function (err, files) {
			var len = files.length,
				i = 0;
			if (len === 0) {
				resolve([]);
			}
			files.each({
				func: function (val, idx, arr, finish) {
					var _path = Path.join(path, val);
					fs.stat(_path, function (err, stat) {
						if (stat.isDirectory()) {
							fs.walk(_path)
								.then(function (__files) {
									_files = _files.concat(__files);
									finish();
								});
						} else {
							_files.push(_path);
							finish();
						}
					})
				},
				ondone: function () {
					resolve(_files);
				}
			});
		});
	});
};

fs.mkdirs = function (dir) {
	return new Promise(function (resolve) {
		fs.mkdir(dir, function (err) {
			if (err) {
				switch (err.code) {
					case 'ENOENT':
						fs.mkdirs(Path.resolve(dir, '../'))
							.then(function () {
								fs.mkdir(dir, resolve);
							});
						break;
					default:
						resolve();
				}
			} else {
				resolve();
			}
		});
	})
};

fs.copy = function (src, dest) {
	if (fs.statSync(src).isDirectory()) {
		return new Promise(function (resolve, reject) {
			fs.walk(src)
				.then(function (files) {
					return Promise.all(
						files.map(function (fn) {
							return new Promise(function (resolve, reject) {
								fs.copy(fn, Path.join(dest, Path.relative(src, fn)))
									.then(resolve);
							})
						})
					)
				})
				.then(resolve);
		});
	}
	return new Promise(function (resolve) {
		fs.mkdirs(Path.dirname(dest))
			.then(function () {
				var ws = fs.createWriteStream(dest);
				ws.on('finish', resolve);
				fs.createReadStream(src)
					.pipe(ws);
			});
	});
};

var HCMD,
	argv;

argv = minimist(process.argv.slice(2));

HCMD = (function () {
	var _generate,
		_deploy,
		_test;

	hexo.extend.filter.register('template_locals', function(locals){
		locals.environment = argv['external'] ? 'external' : 'internal';
		return locals;
	});

	_clean = function () {
		
	};

	_deploy = function () {

	};

	init = function () {
		hexo.on('ready', function () {
			switch (argv._[0]) {
				case 'g':
				case 'generate':
				case 'd':
				case 'deploy':
					console.log('environment:', argv.external ? 'external' : 'internal');
					_deploy();
					break;
				case 'clean':
					_clean();
					break;
			}
		});
	};

	return {
		init: init
	}
})();

HCMD.init();
