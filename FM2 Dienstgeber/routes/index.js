var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    //firstname: String,
    //lastname: String

}, {collection: 'myuser'});

var User = mongoose.model('myuser', UserSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username, password: password}, function(err, user){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    if(!user){
      return res.status(404).send();
    }
    req.session.user = user;
    //return res.status(200).send();
    res.redirect('/dashboard');
  })

})
/*router.get('/dashboard'), function(req, res){
  if(!req.session.user){
    return res.status(401).send();
  }
  return res.status(200).send("Welcome");
}
*/
router.get('/logout', function(req, res){
  req.session.destroy();
  //return res.status(200).send();
  return res.redirect('/');
});

/* Register. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  //var firstname = req.body.firstname;
  //var lastname = req.body.lastname;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;
  //newuser.firstname = firstname;
  //newuser.lastname = lastname;
  newuser.save(function(err, savedUser){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
      return res.status(200).send();
      res.send('User angelegt');
  })
  res.redirect('/');

});

module.exports = router;
