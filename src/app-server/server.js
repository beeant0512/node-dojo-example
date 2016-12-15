define([
  "dojo/node!fs",
  "dojo/node!http",
  "dojo/node!path",
  'dojo/node!express',
  'dojo/node!compression',
  'dojo/node!morgan',
  'dojo/node!cookie-parser',
  'dojo/node!cookie-session',
  'dojo/node!serve-favicon',
  'dojo/node!serve-static',
  'dojo/node!juicer',
  'dojo/node!marked',
  'dojo/node!highlight',
  'dojo/node!stylus',
  'dojo/node!nib',
  'dojo/node!express-ejs-layouts',
  'dojo/node!colors',
  'app-server/config'
], function (fs, http, path, express, compress, morgan, cookieParser, cookieSession, favicon, serveStatic, juicer, marked,
             highlightjs, stylus, nib, expressEjs, colors, config) {
  /* Express Application */
  var app = express(),
    appPort = process.env.PORT || config.port || 8002,
    env = process.env.NODE_ENV || 'local',
    __dirname = path.resolve(),
    serveStaticAry = [['/_static', './_static'], ['/lib', './lib'], ['/src', './src'], ['/nodelib', './node_modules']];

  function compile(str, path) {
    return stylus(str).set('filename', path).use(nib());
  }

  // Configure the application
  app.set('view engine', 'html');
  app.engine('html', function (path, options, fn) {
    fs.readFile(path, 'utf8', function (err, str) {
      if (err) return fn(err);
      str = juicer(str, options);
      fn(null, str);
    });
  });
  app.set('views', path.join(__dirname, 'views'));
  app.use(compress());
  app.use(morgan(env === 'production' ? 'combined' : 'dev'));
  app.use(cookieParser());
  app.use(cookieSession({secret: 'sUyC2IAOnzPpfjHRjSDpUUgQvmANfW9i3dOeNtqChnj6iMG5BzK1n3vjZkrW'}));
  app.use(favicon('./_static/favicon.ico'));
  app.use(stylus.middleware({
    src: '.',
    compile: compile,
    compress: true
  }));

  for (var i = 0; i < serveStaticAry.length; i++) {
    console.log(serveStaticAry[i][0]);
    console.log(serveStaticAry[i][1]);
    app.use(serveStaticAry[i][0], serveStatic(serveStaticAry[i][1]));
  }

  app.get('/500', function (request, response, next) {
    next(new Error('All your base are belong to us!'));
  });

  /**
   * local request
   */
  // GET method route
  app.get('/*', function (request, response, next) {
    if (request.params[0] == '404' || /^_static/.test(request.params[0]) || /^assets/.test(request.params[0]) || /^src/.test(request.params[0])) {
      next();
    } else {
      /**
       * 没有登录，跳转登录页面
       */
      if (!request.session.user) {
        response.render(config.app.login, request.query);
      } else {
        var pathname = request.params[0];

        if (pathname.substring(0, 1) == "/") {
          pathname = pathname.substring(1);
        }
        pathname = pathname.replace(';onlybody=true', "");
        var file = "";
        if (pathname.indexOf('.md') == pathname.length - 3) {
          file = path.join(__dirname, 'markdown', pathname);
          console.log("read md file:", file);
          createNoneExistFile(file);
          fs.readFile(file, 'utf8', function (err, data) {
            var fileContent = "file not exist";
            if (err) {
              console.log("read error:" + err);
            } else {
              marked.setOptions({
                highlight: function (code) {
                  return highlightjs.highlight(code).value;
                }
              });
              fileContent = marked(data);
            }

            response.send(fileContent);
            response.end();
          });
        } else {
          file = path.join(__dirname, 'views', pathname);
          createNoneExistFile(file);
          response.render(pathname, request.query);
        }
      }
    }
  });

  /**
   * route to remote server
   */
  // all post method
  app.post('/*', function (req, res) {
    if (env == "local") {
      console.log("return local json ");
      // if do login, session the user data
      console.log(req.path, config.server.login);
      if (req.path == config.server.login) {
        req.session.user = {'username': 'admin', 'userId': "1", "gender": "m"};
      }
      res.sendFile(path.join(__dirname, 'data', req.path + '.json'));
    } else {
      var options = {
        hostname: config.server.hostname,
        port: config.server.port,
        path: config.server.content + req.url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      var body = [];
      req.on("data", function (data) {
        var request = http.request(options, function (response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
            // if do login, session the user data
            /*
             * check login status
             *   if login success, session user
             *   else do nothing
             */
            if (req.path == config.server.login) {
              var loginRst = JSON.parse(chunk);
              if (loginRst.success) {
                console.log("login success");
                req.session.user = chunk;
              }
            }
            body.push(new Buffer(chunk));
          }).on("end", function () {
            // return to web
            // return a string
            // body = Buffer.concat(body);
            // res.write(body);

            res.contentType('json'); //返回的数据类型
            res.send(body.toString()); //给客户端返回一个json格式的数据
            res.end();
          });
        }).on('error', function (e) {
          res.status(500).send({error: 'Error ', data: e});
        });
        request.write(data);
        request.end();
      });
    }
  });

  app.use(function (request, response, next) {
    response.status(404);
    if (request.accepts('html')) {
      response.render('404', {url: request.url});
      return;
    } else if (request.accepts('json')) {
      response.send({error: 'Not Found', url: request.url});
      return;
    }

    response.type('text').send('Not Found');
  });

  // error handler
  app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    if (request.accepts('html')) {
      response.render('500', {
        error: error
      });
    } else if (request.accepts('json')) {
      response.send({error: error});
    } else {
      response.type('text').send(error);
    }
  });

  // Start Listening
  app.listen(appPort);
  console.log('HTTP server started on port: '.grey + appPort.toString().cyan);

  function createNoneExistFile(file) {
    // check folder is exist
    var slashPos = file.lastIndexOf('\\');
    if (slashPos == -1) {
      slashPos = file.lastIndexOf(path.sep);
    }
    var fileFolder = file.substring(0, slashPos);
    fs.stat(fileFolder, function (err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          console.log("create a folder: " + fileFolder);
          mkdirsSync(fileFolder);
        }
      }
    });

    fs.stat(file, function (err, stats) {
      if (err && err.code === 'ENOENT') {
        // create a file if the file not exist
        console.log("create a file: " + file);
        fs.writeFileSync(file, '// todo');
      }
    });
  }

  function mkdirsSync(dirpath, mode) {
    if (mode == undefined) {
      mode = 0777;
    }
    if (!fs.existsSync(dirpath)) {
      var pathtmp = path.sep;
      dirpath.split(path.sep).forEach(function (dirname) {
        if (pathtmp && dirname.substring(0,1) == path.sep) {
          pathtmp = path.join(pathtmp, dirname);
        } else {
          pathtmp = dirname;
        }
        if (pathtmp !== '' && !fs.existsSync(pathtmp)) {
          if (!fs.mkdirSync(pathtmp, mode)) {
            return false;
          }
        }
      });
    }
    return true;
  }
});
