var browserify = require('browserify'),
	Path = require('path'),
	fs = require('fs');

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


var b = browserify(),
	inStream,
	writeStream,
	root;

root = process.cwd();

b.add(Path.join(root, 'themes/' + hexo.config.theme + '/source/_js/main.js'));

hexo.theme.process().then(function () {
	hexo.theme.addProcessor('source/_js/*path', function (file) {
		inStream = b.bundle();
		writeStream = fs.createWriteStream(Path.join(root, 'themes/' + hexo.config.theme + '/source/js/bundle.js'));
		inStream.pipe(writeStream);
	});
});