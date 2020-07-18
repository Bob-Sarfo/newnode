var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

//connecting to db
mongoose.connect('127.0.0.1:27017/mongo_db',()=>{
  console.log("successful connection");
}).then(
  success=>console.log('no-error' + success),
  error => {console.log("App starting error : ",error.stack),
  process.exit(1);
}
  
)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./controllers/users');
const fs = require("file-system");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//read file from controllers
fs.readdirSync('controllers').forEach((file) => {
  if(file.substr(-3)===".js"){
    console.log('./controllers/'+file);
    const route = require('./controllers/'+file);
    route.controller(app);
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
