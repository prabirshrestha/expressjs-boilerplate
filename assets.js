
var stylus = require('stylus'),
	less = require('less'),
	uglify = require('uglify-js'),
	Snockets = require('snockets'),
	snockets = new Snockets(),
	assets = {};

exports.uglifyJsOptimize = function (file, path, index, isLast, callback) {
	var ast = uglify.parser.parse(file);
	ast = uglify.uglify.ast_mangle(ast);
	ast = uglify.uglify.ast_squeeze(ast);
	callback(uglify.uglify.gen_code(ast));
};

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
	if(path.match(/\.styl$/)) {
		stylus.render(file, { filename: path }, function (err, css, js) {
			if(css) {
				callback(css);
			} else {
				console.log(err);
				callback(err);
			}
		});
	} else {
		callback(file);
	}
};

exports.less = function (file, path, index, isLast, callback) {
	if(path.match(/\.less$/)) {
		less.render(file, function (err, css) {
			if(css) {
				callback(css);
			}	else {
				console.log(err);
				return callback(err);
			}
		});
	} else {
		callback(file);
	}
};

assets.jquery = {
	'route': /\/jquery.[a-z0-9]+.*\.js/,
	'path': './public/javascripts/',
	'dataType': 'javascript',
	'files': [
		'_libs/jquery-1.7.2.js'

	],
	postManipulate: {
		'^': []
	}
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
	postManipulate: {
		'^': []
	}
};

assets.css = {
	'route': /\/style-[a-z0-9]+.*\.css/,
	'path': './public/stylesheets/',
	'dataType': 'css',
	'files': [
		'style.styl'
	],
	preManipulate:{
		'^': [exports.stylus, exports.less]
	}
};

exports.assets = assets;