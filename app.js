var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var index = require('./routes/index');
var users = require('./routes/users');
var uuid = require('node-uuid');

var app = express();

// trust first proxy
app.set('trust proxy', 1)



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'sUyC2IAOnzPpfjHRjSDpUUgQvmANfW9i3dOeNtqChnj6iMG5BzK1n3vjZkrW' }));

/* 静态资源文件 托管静态文件 */
app.use('/assets', express.static('node_modules'));
app.use('/js', express.static('public/javascripts'));
app.use('/css', express.static('public/stylesheets'));
app.use('/img', express.static('public/images'));
app.use('/jslib', express.static('public/jslib'));

/* 登录拦截器 */
app.use(function(req, res, next) {
  console.log('user session:', req.session.user);
  var isLogin = req.session.user;
  // 解析用户请求的路径
  var arr = req.url.split('/');
  // 去除 GET 请求路径上携带的参数
  for (var i = 0, length = arr.length; i < length; i++) {
    arr[i] = arr[i].split('?')[0];
  }
  if (isLogin) { // 判断用户是否登录
    if (arr.length > 2 && arr[1] == 'user' && arr[2] == 'login') {
      res.redirect('/'); // 已经登录跳转首页
    }
    next();
  } else {
    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
    if (arr.length > 1 && arr[1] == '') {
      // next();
      res.redirect('/user/login'); // 将用户重定向到登录页面
    } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
      next();
    } else { // 登录拦截
      req.session.originalUrl = req.originalUrl ? req.originalUrl : null; // 记录用户原始请求路径
      //req.flash('error', '请先登录');
      res.redirect('/user/login'); // 将用户重定向到登录页面
      // next();
    }
  }
});

// 路由配置
app.use('/', index);
app.use('/user', users);

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
