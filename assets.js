
var stylus = require('stylus'),
	Snockets = require('snockets'),
	snockets = new Snockets(),
	assets = {};

exports.snockets = function(file, path, index, isLast, callback) {
	snockets.getConcatenation(path, function(err, js) {
		if (js) {
			callback(js);
		} else {
			callback(err);
		}
	});
};

exports.stylus = function (file, path, index, isLast, callback) {
	stylus.render(file, { filename: path }, function (err, css, js) {
		if(css) {
			callback(css);
		} else {
			console.log(err);
			callback(err);
		}
	});
};

assets.jquery = {
	'route': /\/jquery.[a-z0-9]+.*\.js/,
	'path': './public/javascripts/',
	'dataType': 'javascript',
	'files': [
		'_libs/jquery-1.7.2.js'

	],
	debug: false
};

assets.js = {
	'route': /\/app-[a-z0-9]+.*\.js/,
	'path': './public/javascripts/',
	'dataType': 'javascript',
	'files': [
		'main.js'
	],
	preManipulate:{
		'^': [exports.snockets]
	},
	debug: false
};

assets.css = {
	'route': /\/style-[a-z0-9]+.*\.css/,
	'path': './public/stylesheets/',
	'dataType': 'css',
	'files': [
		'style.styl'
	],
	preManipulate:{
		'^': [exports.stylus]
	},
	debug: false
};

exports.assets = assets;