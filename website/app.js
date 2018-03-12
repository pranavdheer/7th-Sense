var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var mongodb=require("mongodb");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var multer = require("multer");
var index = require('./routes/index');
var fs = require('fs');
var session = require("express-session");
mongoose.connect("mongodb://admin:admin@ds047812.mlab.com:47812/slocket");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(session({
  secret: "c2c",
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (u, done) {
  done(null, u.id);
});

passport.deserializeUser(function (id, done) {
  user.User.findById(id, function (err, u) {
    done(err, u);
  });
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);

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
