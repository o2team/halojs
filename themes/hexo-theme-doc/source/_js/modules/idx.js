// var PIXI = require('./pixi.js');
var IDX = (function () {
	var renderer,
		ctn,
		_width,
		_height,
		bound,
		padding,
		stage,
		init,
		randPos,
		animate,
		circles,
		lines,
		addCircle,
		addLine,
		addText,
		animateID;

	padding = 40;
	circles = [];
	lines = [];

	randPos = function () {
		return [_width * Math.random(), _height * Math.random()];
	};

	addCircle = function () {
		var pos = randPos(),
			radius,
			g;
		radius = Math.random() * 5 + 20;
		g = new PIXI.Graphics();
		g.interactive = true;
		g.position.x = pos[0];
		g.position.y = pos[1];
		g.vx = Math.random() - .5;
		g.vy = Math.random() - .5;
		g.lineStyle(Math.random() * 4 + 8, '0x6DA1EF', 1);
		g.drawCircle(-radius * .5, -radius * .5, radius);
		circles.push(g);
		stage.addChild(g);
	};

	addLine = function () {
		var pos = randPos(),
			len,
			g;
		len = Math.random() * 10 + 45;
		g = new PIXI.Graphics();
		g.interactive = true;
		g.position.x = pos[0];
		g.position.y = pos[1];
		g.vr = (Math.random() - .5) * .04;
		g.vx = Math.random() - .5;
		g.vy = Math.random() - .5;
		g.beginFill('0x6DA1EF');
		g.drawRect(-len * .5, -5, Math.random() * 10 + 45, 10);
		g.endFill();
		g.rotation = Math.random() * 3.14;
		lines.push(g);
		stage.addChild(g);
	};

	addText = function () {
		var text = new PIXI.Text('解放程序员双手的神器', {
			font: 'bold 42px Arial',
			fill: '#ffffff'
		});
		text.position.x = _width / 2 - text.width / 2;
		text.position.y = _height / 2 - text.height / 2;
		stage.addChild(text);
	};

	init = function () {
		var c;
		c = document.getElementById('j_canvas');
		_width = document.documentElement.getBoundingClientRect().width;
		_height = 477;
		bound = new PIXI.Rectangle(-padding, -padding, _width + 2 * padding, _height + 2 * padding);
		bound.left = -padding;
		bound.top = -padding;
		bound.right = bound.width - padding;
		bound.bottom = bound.height - padding;
		renderer = new PIXI.autoDetectRenderer(_width, _height, {
			view: c,
			backgroundColor: '0x6691E4',
			antialias: true,
			autoResize: true,
			resolution: 1
		});
		stage = new PIXI.Container();
		cnt = ~~(_width / 100);
		while (cnt--) {
			addCircle();
			addLine();
		}
		// addText();
	};

	animate = function () {
		renderer.render(stage);
		circles.forEach(function (val) {
			val.position.x += val.vx;
			val.position.y += val.vy;
			if (val.position.x > bound.right) {
				val.position.x -= bound.width;
			} else if (val.position.x < bound.left) {
				val.position.x += bound.width;
			}
			if (val.position.y > bound.bottom) {
				val.position.y -= bound.height;
			} else if (val.position.y < bound.top) {
				val.position.y += bound.height;
			}
		});
		lines.forEach(function (val) {
			val.position.x += val.vx;
			val.position.y += val.vy;
			val.rotation += val.vr;
			if (val.position.x > bound.right) {
				val.position.x -= bound.width;
			} else if (val.position.x < bound.left) {
				val.position.x += bound.width;
			}
			if (val.position.y > bound.bottom) {
				val.position.y -= bound.height;
			} else if (val.position.y < bound.top) {
				val.position.y += bound.height;
			}
		});
		animateID = requestAnimationFrame(animate);
	};

	start = function () {
		animate();
	};

	stop = function () {
		cancelAnimationFrame(animateID);
	};

	return {
		init: function () {} || init,
		start: function () {} || start,
		stop: function () {} || stop
	}
})();

module.exports = IDX;
