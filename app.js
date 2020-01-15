var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var authRouter = require('./routes/auth');
var mediaRouter = require('./routes/media');
var app = express();

// DB Connect
mongoose.connect('mongodb+srv://alphaButtFucker:sullichiku@laniakea-1hblj.mongodb.net/students?retryWrites=true', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then((db) => {
	console.log("connected to laniakea");
}).catch((reason) => {
	console.log("failed to connect to laniakea -> " + reason);
});

// Session setup
app.use(session({
	secret: 'keybOard-warriOr'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/auth', authRouter);
app.use('/api/media', mediaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('_error');
});

module.exports = app;
