/*特有代码*/
switch (hexo.path.split('/')[0]) {
	case 'api':
		var API = require('./modules/api.js');
		API.init();
		break;
	case 'download':
		var Download = require('./modules/download.js');
		Download.init();
		break;
	case "index.html":
		break;
}
