var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/basic', function(req, res, next) {
  res.render('example', { title: 'Basic Grid', script: '/grid/basic.js' });
});

module.exports = router;
