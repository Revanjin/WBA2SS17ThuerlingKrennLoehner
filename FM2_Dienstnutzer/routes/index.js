var express = require('express');
var router = express.Router();

var dHost = 'http://localhost';
var dPort = 8000;
var dUrl = dHost + ':' + dPort;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', function(req, res, next)  {
  var url = dUrl + '/users';
  var username = req.body.username;
  var password = req.body.password;

  var newuser = new User();

  newuser.username = username;
  newuser.password = password;

  var options = {
    uri: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }}
    request(options, function(err, res, body){
      res.json(body);
    });
});
module.exports = router;
