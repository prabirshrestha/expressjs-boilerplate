var express = require('express'),
    http = require('http');

var app = express();

app.configure(function () {
    // settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
});

app.configure(function () {
    // middleware
    app.use(express.favicon());
    app.use(express.logger('dev'));

    var h5bp = require('./h5bp');
    app.use(h5bp.ieEdgeChromeFrameHeader());
    app.use(h5bp.suppressWww(true));
    app.use(h5bp.protectDotfiles());
    app.use(h5bp.blockBackupFiles());
    app.use(h5bp.removePoweredBy());

    app.use(require('./assets')());
    app.use(express.query());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());

    app.use(require('gzippo').compress());

    app.use(app.router);

    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

var routes = {
    home: require('./routes/home')
};

app.get('/', routes.home.index);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
