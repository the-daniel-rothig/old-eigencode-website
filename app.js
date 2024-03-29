var express = require('express');
var handlebars = require('express-handlebars');
var expressLess = require('express-less');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var routes = require('./routes/index');

var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', expressLess(__dirname + '/less'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*app.use(function(req,res,next){
  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
    return req.method === "GET"
        ? res.redirect(['https://', req.get('Host'), req.url].join(''))
        : res.sendStatus('400');
  }
  else
    next();
});*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (process.env.NODE_ENV === 'production') {
    setInterval(function() {
        http.get("http://eigencode.herokuapp.com");
    }, 300000);
}


module.exports = app;
