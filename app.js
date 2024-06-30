var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
// Debugging the imported routers
// console.log('Index Router Type:', typeof indexRouter); // Should log 'function'
// console.log('Users Router Type:', typeof usersRouter); // Should log 'function'


     /* connecting to mongodb start  */

       // we are connecting the backend to database

  

//  method 1

  // ;( async () => {
  //   try {
      // mongoose.connect('mongodb://127.0.0.1:27017/chaiaurcodeyoutube');
  //   } catch (error) { 
  //     console.log(error);
  //   }
  // })

// method 2    
// and this is most sufficient method for connecting tha database to mongodb

      const connectDB = async () => {
        try {
          const connectionInstance = await mongoose.connect('mongodb://127.0.0.1:27017/chaiaurcodeyoutube');
        } catch (error) {
          console.log("database error  "+error)
          process.exit(1);
        }
      }

      //   it give s the promicess thats why we can use the .then() ,catch()
      connectDB()
      .then(() => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log(err)
      })

    /*  connecting to mongodb end  */


    /*     all for this is for importing the model from the routes START      */

       poodf

    /*     all for this is for importing the model from the routes END     */


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);




//    to handle the routers from the Routes folder

// http://localhost:3000/api/v1/users/register

app.use('/api/v1/users', usersRouter);       //   this route is for getting all the user data

app.use('/api/v1/vedios',)






















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
