'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var auth = require( './routes/auth' );
var diary = require( './routes/diary' );
var entry = require( './routes/entry' );  
var index = require( './routes/index' );  
var user = require( './routes/user' );  

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
  secret: sessSecret,
  resave: false,
  saveUnintialized: true,
  cookie: cookie,
  name: sessName
} ) );

//////////////////
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use( '/', auth );
app.use( '/', diary );
app.use( '/', entry );
app.use( '/', index );
app.use( '/', user );

app.use(notFoundHandler);
app.use(errorHandler);


module.exports = app;
