var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/test');
var mongoduri = 'ds161012.mlab.com:61012/fm2/dbname -u dbuser -p dbpassword'
mongoose.connect(mongoduri);

var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

var userDataSchema = new mongoose.Schema({
  title: '',//{type: String, required: true},
  content: '',//String,
  author: '',//String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);
/* GET home page. */
router.get('/', function(req, res, next) {

  if(!req.session.user){
    return res.status(401).send();
  }
  if (req.header('Content-Type') == 'application/json')
  {

  }
});

router.get('/posts', function(req, res, next) {
  UserData.find().lean()
      .then(function(doc) {
        if (req.header('Content-Type') == 'application/json')
        {
          res.json(doc);
          console.log('Daten werden angezeigt!');
          res.end();
        }
      });
});

router.post('/posts', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  data.save();
  if (req.header('Content-Type') == 'application/json')
  {
    res.json(data);
    console.log('Post wurde mit '+ req.body.title +'hinzugefügt')
  }
});

router.put('/posts', function(req, res, next) {
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
  if (req.header('Content-Type') == 'application/json')
  {
    res.json(doc);
    console.log('Daten wurden verändert!');
  }
});

router.delete('/posts', function(req, res, next) {
  var id = req.body.id;

  if (req.header('Content-Type') == 'application/json')
  {
    UserData.findByIdAndRemove(id).exec();
    console.log('Der Post wurde gelöscht');
    res.end();
  }
  else {
    UserData.findByIdAndRemove(id).exec();
    res.redirect('/dashboard');
  }

});
module.exports = router;
