var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var request = require('request');
var dHost = 'http://localhost';
var dPort = 8000;
var dUrl = dHost + ':' + dPort;


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
       //"username" : req.body.username,
       //"password" : req.body.password
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



  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var options =
  {
    uri: url,
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    }
  }
  request(options, function (err, response){

    var userPosts =
     {
       //"username" : req.body.username,
       //"password" : req.body.password
       "title"   : req.body.title,
       "content" : req.body.content,
       "author"  : req.body.author
     }
     var item = {
       title: req.body.title,
       content: req.body.content,
       author: req.body.author
     };
     //item = JSON.parse(item);
     if (req.header('Content-Type') == 'application/json')
       {
         res.json(item);
         console.log(req.body.title);
       }
       else
       {
         console.log(req.body.title);
         console.log(req.body.content);
         console.log(req.body.author);
         res.json(item);
         //res.redirect('/dashboard');
       }
  });

});

router.get('/update', function(req, res, next)  {
  var url = dUrl + '/users/posts';



  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var options =
  {
    uri: url,
    method: 'PUT',
    headers:
    {
      'Content-Type': 'application/json'
    }
  }
  request(options, function (err, response, doc){
    doc = JSON.parse(doc);
    var userPosts =
     {
       //"username" : req.body.username,
       //"password" : req.body.password
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
         res.redirect('/dashboard');
       }
  });

});


module.exports = router;
