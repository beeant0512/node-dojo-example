var express = require('express');
var mysql = require('../mysql').mysql;
var logger = require('../logger');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('user/login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  // 获取post参数
  var data = req.body;
  mysql.execute('select * from user where account = ?', [data.username], function (err, rows, fields) {
    console.log(err, rows, fields);
  });
  req.session.user = data;

  res.redirect('/index');
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/login');
});

module.exports = router;
