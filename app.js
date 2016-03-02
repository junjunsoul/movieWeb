/**
 * Created by Administrator on 2016-01-23.
 */
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var mongoStore = require("connect-mongo")(express);

var port = process.env.PORT || 3000;
var app = express();
var dbURL = 'mongodb://localhost/imooc';
mongoose.connect(dbURL);
mongoose.connection.on('error', function(err) {
    console.error('mongodb连接错误: ' + err);
    process.exit(-1);
});

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({
    secret: 'imooc',
    store: new mongoStore({
        url: dbURL,
        collection: 'sessions'
    })
}));
if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(express.logger(':method:url:status'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}
app.locals.moment = require('moment');
app.use(express.static(path.join(__dirname, 'public')));


require('./config/routes')(app);

app.listen(port);
console.log('start server' + port);
