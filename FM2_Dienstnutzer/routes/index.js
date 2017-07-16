var express = require('express');
var router = express.Router();
var request = require('request');
var dHost = 'http://localhost';
var dPort = 8000;
var dUrl = dHost + ':' + dPort;
var bodyParser = require('body-parser');
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login FM2' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register FM2' });
});


router.post('/login',bodyParser.json(), function(req, res, next)  {
  var url = dUrl + '/session';

  var userData =
  {
    "username" : req.body.username,
    "password" : req.body.password
  }
  var options =
  {
    uri: url,
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    }
  }
  if (req.header('Content-Type') == 'application/json')
    {
      request(options, function(err, response){
        res.json(userData);
      });
    }
    else
    {
      res.redirect('dashboard');
    }

});

router.post('/register',bodyParser.json(),function(req, res, next){
  var url = dUrl + '/session';

  var userData =
  {
    "username" : req.body.username,
    "password" : req.body.password
  }
  var options =
  {
    uri: url,
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    }
  }
  if (req.header('Content-Type') == 'application/json')
    {
      request(options, function(err, response){
        res.json(userData);
      });
    }
    else
    {
      res.redirect('login');
    }

});
module.exports = router;
