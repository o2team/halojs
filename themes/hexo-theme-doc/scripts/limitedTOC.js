hexo.extend.helper.register('limitedTOC', function (data, opt) {
	var level,
		reg,
		str,
		matched,
		anchor,
		grow,
		cur,
		cap;
	str = [];
	level = hexo.theme.config.TOClevel || [1, 2, 3, 4, 5, 6];
	reg = new RegExp('<h([' + level.join('') + ']) id=[\'\"]([\\s\\S]*?)[\'\"]><a[\\s\\S]*?><\/a>([\\s\\S]*?)<\/h\\1>', 'g');
	grow = function (lvnow, e) {
		cur = matched[0];
		cur.replace(reg, function (mat, g1, g2, g3) {
			anchor = [
				'<a href="',
				opt.path,
				'#',
				g2,
				'">',
				g3,
				'</a>'
			].join('');
			if (g1 - lvnow > 0) {
				e || (cap = str.pop());
				str.push('<ul>');
				grow(1 + lvnow, true);
				str.push('</ul>');
				e || cap && str.push(cap);
				matched.length && grow(lvnow);
			}
			if (g1 - lvnow === 0) {
				str.push('<li>');
				str.push(anchor);
				str.push('</li>');
				matched.shift();
				matched.length && grow(lvnow, false);
			}
		});
	};
	matched = data.match(reg);
	matched && grow(level.reduce(function (prev, curr) {
		return Math.min(prev, curr);
	}) - 1);
	return str.join('');
});
