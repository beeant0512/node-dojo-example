var express = require('express');
var md5 = require('crypto-js/md5');
var mysql = require('../lib/mysql').mysql;
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('user/login', {title: 'Login'});
});

router.post('/login', function (req, res, next) {
  // 获取post参数
  var data = req.body;
  mysql.execute('select * from user where account = ?', [data.username], function (err, rows, fields) {
    if (1 === rows.length) {
      var user = rows[0];
      if (user.password === md5(data.password).toString()) {
        req.session.user = user;
        res.location('/');
        res.json({success: true, msg: '/'});
      } else {
        res.json({code: 2, msg: '密码错误', data: null, success: false});
      }
    } else {
      res.json({code: 1, msg: '用户不存在', data: null, success: false});
    }
  });
});

router.get('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/login');
});

module.exports = router;
