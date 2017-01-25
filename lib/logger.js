var app = require('express')();
var log4js = require('log4js');
log4js.configure(require('./log4j.json'));
//var logger = log4js.getLogger(name);
//logger.setLevel('INFO');

exports.setAppLogger = function (app) {
  app.use(log4js.connectLogger(log4js.getLogger('normal'), {
      level: 'auto',
      format: ':remote-addr - :method :url HTTP/:http-version :status :content-length :response-time ms :user-agent',
      nolog:'\\.(gif|jpe?g|png|css|map|js|woff2)$'
    })
  );
};

exports.getLogger = function (name) {
  if (name === undefined) {
    name = 'normal';
  }
  var logger = log4js.getLogger(name);
  return logger;
};

exports.getSqlLogger = function(){
  var logger = log4js.getLogger('sql');
  return logger;
}