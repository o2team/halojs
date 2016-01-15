var Path = require('path'),
	Url = require('url'),
	fs = require('fs'),
	express = require('express'),
	child_process = require('child_process');

var preview = (function () {
	var static,
		srcDir,
		internalDir,
		externalDir,
		generate,
		serve,
		preview,
		init;

	srcDir = Path.join(process.cwd(), hexo.config.public_dir);
	internalDir = Path.join(process.cwd(), hexo.config.internal_dir);
	externalDir = Path.join(process.cwd(), hexo.config.external_dir);

	static = {};
	static['internal'] = express();
	static['external'] = express();
	static['internal'].use(
		hexo.config.root,
		express.static(Path.join(process.cwd(), hexo.config.internal_dir))
	);
	static['external'].use(
		hexo.config.root,
		express.static(Path.join(process.cwd(), hexo.config.external_dir))
	);

	serve = function (data) {
		return new Promise(function (resolve) {
			static[data.type].listen(data.port, function () {
				var url = Url.format({
					hostname: '0.0.0.0',
					port: data.port,
					protocol: 'http',
					pathname: hexo.config.root
				});
				console.log(data.type + ' version served at ' + url);
				child_process.exec('open ' + url).on('close', resolve);
			});
		});
	};

	generate = function (type) {
		return function () {
			return new Promise (function (resolve) {
				child_process.exec('hexo g --' + type)
					.on('close', function () {
						fs.copy(srcDir, type === 'internal' ? internalDir : externalDir)
							.then(resolve.bind(null, {
								type: type,
								port: type === 'internal' ? (hexo.config.internal_port || 3000) : (hexo.config.external_port || 3001)
							}));
				});
			});
		}
	};

	return function(args){
		console.log('Generating');
		generate('external').call()
			.then(serve)
			.then(generate('internal'))
			.then(serve)
	};
})();

hexo.extend.console.register('preview', 'Preview two versions', preview);
