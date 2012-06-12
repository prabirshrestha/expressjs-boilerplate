
/**
 * Module dependencies.
 */

var   express = require('express')
    , routes =  {
        index: require('./routes')
    }
    , http = require('http')
    , gzippo = require('gzippo')
    , connectAssets = require('connect-assets')({ src: __dirname + '/public' });
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(function (req, res, next) {
        res.removeHeader("X-Powered-By");
        next();
    });
    app.use(app.router);

    // app.use(express.static(__dirname + '/public'));
    app.use(gzippo.staticGzip(__dirname + '/public'));

    css.root = "stylesheets";
    js.root = "javascripts";
    app.use(connectAssets);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
