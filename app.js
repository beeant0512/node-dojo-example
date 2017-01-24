var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');
var dot = require('express-dot-engine');

var app = express();

// trust first proxy
app.set('trust proxy', 1);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'html');
app.engine('html', dot.__express);
//线上环境开启缓存
app.set('view cache', false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// logger
var logDirectory = __dirname + '/log';
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});
// setup the logger
app.use(logger(':method :url :response-time', {
  stream: accessLogStream,
  skip: function (req, res) {
    return res.statusCode < 400
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'sUyC2IAOnzPpfjHRjSDpUUgQvmANfW9i3dOeNtqChnj6iMG5BzK1n3vjZkrW'}));

var __dirname = path.resolve();
var configFile = path.join(__dirname, 'config.json');
console.log('read config from: %s', configFile);
var config = fs.readFileSync(configFile, 'utf8');
config = eval("[" + config + "]")[0];
var ststics = [];
/* 静态资源文件 托管静态文件 */
for (var idx in config.statik) {
  app.use(config.statik[idx].prefix, express.static(config.statik[idx].path));
}

// 路由配置
for (var idx in config.routes) {
  app.use(config.routes[idx].prefix, require(config.routes[idx].path));
}

/* 登录拦截器 */
app.use(function (req, res, next) {
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

// error handler
app.use(function (err, req, res, next) {
  err.status = 500;
  var message = '500';
  if (-1 !== err.message.indexOf('lookup view')) {
    err.status = 404;
    message = 'Page Not Found';
  }
  // set locals, only providing error in development
  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
