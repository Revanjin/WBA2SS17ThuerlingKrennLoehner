var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var hbs = require('express-handlebars');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/dashboard');

var app = express();

var dHost = 'http://localhost';
var dPort = 8000;
var dUrl = dHost + ':' + dPort;

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', LayoutsDir: __dirname +  '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"asdfasdfasdfasdfasdf", resave: false, saveUninitaialized:true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/dashboard', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
