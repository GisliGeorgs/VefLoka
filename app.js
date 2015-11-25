'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

//var routes = require('./routes/index');
//var users = require('./routes/users');
var auth = require( './routes/auth' );
var diary = require( './routes/diary' );

var errorHandler = require('./middleware/errorHandler');
var notFoundHandler = require('./middleware/notFoundHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var sessSecret = process.env.SESSION_SECRET;
var sessName = process.env.SESSION_NAME;

var cookie = { domain: '', httpOnly: true, secure: false, expires: false };

app.use( session( {
  //secret: sessSecret,
  secret: "123123123",
  resave: false,
  saveUnintialized: true,
  cookie: cookie,
  name: sessName
} ) );

//////////////////
app.locals.pretty = true;
/*
app.use( function (req, res, next) {
  if (req.session.user) {
    app.locals.user = req.session.user;
  }
  next();
});
*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use( '/', auth );
//app.use( '/', diary );

app.use(notFoundHandler);
app.use(errorHandler);


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
// error handlers

// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
/*app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

module.exports = app;
