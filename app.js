
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    assetManager = require('connect-assetmanager'),
    assets = require('./assets');

var app = express(),
    assetsMiddleware = assetManager(assets.assets);

var routes = {
    index: require('./routes')
};

app.configure('development', function () {
    for(var asset in assets.assets) {
        if(asset !== 'forEach' && !asset.debug){
            assets.assets[asset].debug = true;
        }
    }
});

app.configure(function () {
    // settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
});

app.configure(function() {
    // middleware
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(assetsMiddleware);

    app.use(app.router);

    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.locals.use(function (req, res, next) {
   res.locals.assetsCacheHashes = assetsMiddleware.cacheHashes;
   next();
});

app.get('/', routes.index.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
