/*
    @ author leeenx
    @ version 1.0.0
    @ data: 2015-12-07
    @ 当前对象是否为DOM对象
    @ 用法：$.isDom(obj);
*/

define("isDom",function(require,exports,module){
    'use zeptojs';
	var chk=(typeof HTMLElement==='object') ?
        function(obj){
            return obj instanceof HTMLElement;
        } :
        function(obj){
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        };
    window.$&&($.isDom=chk);
	return chk;
});