var Hexo = require('hexo'),
	deployer = require('./lib/deployer'),
	minimist = require('minimist'),
	util = require('util'),
	generator = require('./lib/generator');

var hexo,
	argv;

console.lookin = function (obj) {
	console.log(util.inspect(obj, {
		showHidden: true,
		depth: null,
		colors: true,
		customInspect: false
	}));
};

argv = minimist(process.argv.slice(2))
hexo = new Hexo(process.cwd(), {
	config: 'config/_internal.yml'
});

hexo.init().then(function () {
	console.log('environment: internal');
	hexo.extend.console.register('deploy', 'deploy your website', {

	}, function (args) {
		if (args.g) {
			hexo.call(argv._[0], {
				_: 'g'
			}).then(function () {
				deployer.deploy(hexo);
			});
		} else {
			deployer.deploy(hexo);
		}

	});
	hexo.call(argv._[0], argv)
		.catch(function () {
			hexo.call('help', {
				_: 'h'
			});
		});
});