var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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


    
    
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







/*     all for this is for importing the model from the routes START      */

  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var vediosRouter = require('./routes/vedios');
  var commentRouter = require('./routes/comment');
  var tweetRouter = require('./routes/tweet');
  var likesRouter = require('./routes/like');
  var healthCkeckRouter = require('./routes/healcheck');
  var dashboardRouter = require('./routes/dashboard');
  var playlistRouter = require('./routes/playlist');
  var subscriptionsRouter = require('./routes/subscription');

/*     all for this is for importing the model from the routes END     */



//    to handle the routers from the Routes folder

// http://localhost:3000/api/v1/users/register

  /*   declaration of routes START     */

app.use('/', healthCkeckRouter);

app.use('/api/v1/users', usersRouter);        //   this route is for getting all the user data

app.use('/api/v1/vedios', vediosRouter);      //   this route is for getting all the vedios data

app.use('/api/v1/comment', commentRouter);    //   this route is for getting all the comment data

app.use('/api/v1/tweet', tweetRouter);      //   this route is for getting all the tweet data of users

app.use('/api/v1/likes', likesRouter);      //   this route is for getting all the likes data of users

app.use('/api/v1/dashboard', dashboardRouter);      //   this route is for getting dashboard data of users

app.use('/api/v1/playlist', playlistRouter);      //   this route is for getting playlist data of users

// WE MADE THE BELOW ROUTE BUT NOT TEST TILL YET

// app.use('/api/v1/subscription', subscriptionsRouter);      //   this route is for getting playlist data of users

/*    declaration of routes END     */


















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
