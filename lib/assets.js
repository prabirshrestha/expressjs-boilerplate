
module.exports = (function(assetsFolder) {

    var assets = require('connect-assets');
    var path = require('path');
    var uglify = require('uglify-js');

    var minifyJs = function(js) {
        var ast, jsp, pro;
        jsp = uglify.parser;
        pro = uglify.uglify;
        ast = jsp.parse(js);
        ast = pro.ast_mangle(ast);
        ast = pro.ast_squeeze(ast);
        return pro.gen_code(ast);
    };

    assets.jsCompilers.jss = {
        match: /\.jss$/,
        compileSync: function (sourcePath, source) {
            var key = sourcePath.replace(/\\/g,'/').substring(assetsFolder.length);

            if(key.lastIndexOf('js/_libs/') === 0) {
                key = key.substring('js/_libs/'.length);
            } else if(key.lastIndexOf('js/', 0) === 0) {
                key = key.substring('js/'.length);
            }

            var extIndex = key.lastIndexOf('.');
            if(extIndex>0) {
                key = key.substring(0, extIndex);
            }

            var suffixIndex = key.lastIndexOf('-router');
            if(suffixIndex>0) {
                key = key.substring(0, suffixIndex);
            }

            suffixIndex = key.lastIndexOf('-view');
            if(suffixIndex>0) {
                key = key.substring(0, suffixIndex);
            }

            if (process.env.NODE_ENV === 'production') {
                source = minifyJs(source);
            }

            return 'JSS["'+ key + '"]=' + JSON.stringify(source) + ';';
        }
    };

    assets.jsCompilers.htm = assets.jsCompilers.html = {
        match: /\.(html|htm)$/,
        compileSync: function (sourcePath, source) {
            var key = sourcePath.replace(/\\/g,'/').substring(assetsFolder.length);
            if(key.lastIndexOf('templates/', 0) === 0) {
                key = key.substring('templates/'.length);
            }

            var extIndex = key.lastIndexOf('.');
            if(extIndex>0) {
                key = key.substring(0, extIndex);
            }
            
            return 'JST["'+ key + '"]=' + JSON.stringify(source) + ';';
        }
    };

    return assets;

});
