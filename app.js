var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Load Custom API
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

// Settings Credentials
var settings = require('./config/settings');

//Load Routing
var indexRouter = require('./routes/computer_assets');
var operationsRouter = require('./routes/operations');
var pdfRouter = require('./routes/pdf');


var app = express();

// Database Connection
mongoose.connect(settings.mongoDB.link, {useNewUrlParser:true}, function (err) {
    if(err){
        console.log("Database Connection Error : "+err);
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', exphbs({
    defaultLayout:'layout',
    extname:'.hbs',
    partialDir: __dirname+'/views/partials',
    layoutDir: __dirname+'/views/layouts',
    helpers:{
        equals:(value, ref, output)=>{
            if(value===ref)
            {
                return output;
            }else{
                return null;
            }
        }
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/operations', operationsRouter);
app.use('/pdf', pdfRouter);

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
