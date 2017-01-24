var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/basic', function(req, res, next) {
  res.render('grid/basic', { title: 'Basic Grid'});
});

module.exports = router;
