var express = require('express');
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
  console.log(req.session);
  req.session.user = data;

  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/login');
});

module.exports = router;
