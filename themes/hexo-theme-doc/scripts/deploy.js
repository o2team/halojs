var child_process = require('child_process'),
	fs = require('fs');

var git,
	setup,
	push;

git = function () {
	var len = arguments.length,
		args = new Array(len);
	for (var i = 0; i < len; i++){
		args[i] = arguments[i];
	}
	return child_process.spawn('git', args, {
		cwd: deployDir,
		verbose: verbose
	});
};

setup = function () {
	// Create a placeholder for the first commit
	return fs.writeFile(pathFn.join(deployDir, 'placeholder'), '')
		.then(function(){
			return git('init');
		})
		.then(function(){
			return git('add', '-A');
		}).then(function(){
			return git('commit', '-m', 'First commit');
		});
};

push = function (repo){
	return git('add', '-A')
	.then(function(){
		return git('commit', '-m', message).catch(function(){
		  // Do nothing. It's OK if nothing to commit.
		});
	})
	.then(function(){
		return git('push', '-u', repo.url, 'master:' + repo.branch, '--force');
	});
};

commitMessage = function(args){
	var message = args.m || args.msg || args.message || 'Site updated: {{ now(\'YYYY-MM-DD HH:mm:ss\') }}';
	return swig.compile(message)(swigHelpers);
};
