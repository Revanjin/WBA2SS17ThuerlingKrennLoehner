var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var request = require('request');
var dUrl = 'https://fm2.herokuapp.com';
//var dPort = 8000;
//var dUrl = dHost + ':' + dPort;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});

router.get('/get-data', function(req, res, next)  {
  var url = dUrl + '/users/posts';
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var options =
  {
    uri: url,
    method: 'GET',
    headers:
    {
      'Content-Type': 'application/json'
    }
  }
  request(options, function (err, response, doc){
    doc = JSON.parse(doc);
    var userPosts =
     {
       "_id"     : req.body.id,
       "title"   : req.body.title,
       "content" : req.body.content,
       "author"  : req.body.author
     }
     if (req.header('Content-Type') == 'application/json')
       {
         res.json(doc);
         console.log(req.body.title);
       }
       else
       {
         res.render('dashboard', {items: doc});
       }
  });
});
router.post('/insert', function(req, res, next)  {
  var url = dUrl + '/users/posts';
  var doc = {
    "id"     : req.body.id,
    "title"   : req.body.title,
    "content" : req.body.content,
    "author"  : req.body.author
 }
 var options = {
   uri : url,
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   json: doc
 }
     if (req.header('Content-Type') == 'application/json')
       {
       	request(options, function(err, response, data){
       		res.json(data);
       	});
       }
       else
       {
         request(options, function(err, response, data){
        		res.redirect('/dashboard');
        	});
         //res.redirect('/dashboard');
       }
});
router.post('/update', function(req, res, next)  {
  var url = dUrl + '/users/posts';
  var data = {
    "id"     : req.body.id,
    "title"   : req.body.title,
    "content" : req.body.content,
    "author"  : req.body.author
 }
 var options = {
   uri : url,
   method: 'PUT',
   headers: {
     'Content-Type': 'application/json'
   },
   json: data
 }
     if (req.header('Content-Type') == 'application/json')
       {

       	request(options, function(err, response, doc){
       		res.json(doc);
       	});
       }
       else
       {
         request(options, function(err, response, doc){
        		res.redirect('/dashboard');
        	});
         //res.redirect('/dashboard');
       }
});
router.post('/delete', function(req, res, next)  {
  var url = dUrl + '/users/posts';
  var doc = {
    "id"     : req.body.id,
    "title"   : req.body.title,
    "content" : req.body.content,
    "author"  : req.body.author
 }
 var options = {
   uri : url,
   method: 'DELETE',
   headers: {
     'Content-Type': 'application/json'
   },
   json: doc
 }
 if (req.header('Content-Type') == 'application/json')
   {
    request(options, function(err, response, data){
      res.json(data);
    });
   }
   else
   {
     request(options, function(err, response, data){
        res.redirect('/dashboard');
      });
   }
});

module.exports = router;
