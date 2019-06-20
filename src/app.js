import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './routes';
import apiRoutes from './routes/api';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import expressValidator from 'express-validator';
import configPassport from './config/passport';
import keepValues from './config/keepValues';
// import apiMiddleWare from './middlewares/apiMiddleware';
const app = express();

//config passport
configPassport(passport);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressValidator());

//Session
app.use(session({
  secret: 'pms-session',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 7200000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg =req.flash('success_msg');
  res.locals.error_msg =req.flash('error_msg');
  res.locals.error =req.flash('error');
  next();
});

//keep values when validation fail
app.use(keepValues);

app.use('/', routes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
