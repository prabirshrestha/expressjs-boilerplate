
var Snockets = require('snockets'),
	snockets = new Snockets(),
	assets = {};

exports.snockets = function(file, path, index, isLast, callback) {
	return snockets.getConcatenation(path, function(err, js) {
		if (js) {
			return callback(js);
		} else {
			return callback(err);
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
		'style.css'
	],
	debug: false
};

exports.assets = assets;