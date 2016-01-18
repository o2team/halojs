var Hexo = require('hexo'),
	minimist = require('minimist');

var hexo,
	argv;

argv = minimist(process.argv.slice(2))
hexo = new Hexo(process.cwd(), {
	config: 'config/_external.yml'
});



hexo.init().then(function(){
	console.log('environment: external');
	hexo.call(argv._[0], argv)
		.catch(function () {

		});
});
