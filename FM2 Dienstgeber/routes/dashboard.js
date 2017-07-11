var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;
var models = require('./index')

var userDataSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: String,
  author: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);
//var User = mongoose.model('myuser', UserSchema);
/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    return res.status(401).send();
  }

  return res.render('dashboard');
  res.status(200).send("Welcome");
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
      .then(function(doc) {
        res.render('dashboard', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: models.username
  };

  var data = new UserData(item);
  data.save();

  res.redirect('/dashboard');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  })
  res.redirect('/dashboard');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/dashboard');
});
module.exports = router;
