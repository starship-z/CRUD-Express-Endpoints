var express = require('express');
var router = express.Router();

/* GET home page. */
// localhost:3000/api/ana
router.get('/api/ana', function(req, res, next) {
  res.send({status: true, name: "ana"})
});

// localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
