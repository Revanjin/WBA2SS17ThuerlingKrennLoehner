var http = require('http');
var path = require('path');
var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var dashboard = require('./routes/dashboard');

var dHost = 'http://localhost';
var dPort = 8000;
var dUrl = dHost + ':' + dPort;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"asdfasdfasdfasdfasdf", resave: false, saveUninitaialized:true}))
app.use(express.static(path.join(__dirname, 'public')));

// - routen definieren
app.use('/', index);
app.use('/dashboard', dashboard);

// -- Errorhandling --
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
