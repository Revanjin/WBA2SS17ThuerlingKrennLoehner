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

/*
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
      res.status(200).send();
      res.redirect('/dashboard');


  })

});
*/
router.post('/login', function(req, res)
{
var username = req.body.username;
var password = req.body.password;
  if (req.header('Content-Type') == 'application/json') {
    User.findOne({username: username, password: password}, function(err, user)
    {
      if(!user)
      {
        return res.status(404).send();
      }
      req.session.user = user;
      res.send('Willkommen bei FM2 '+ req.body.username +'. du wurdest erfolgreich eingeloggt!');
      console.log('Willkommen bei FM2. Du wurdest erfolgreich eingeloggt!');
      //return res.json({ users: users });
    })
  }
  else
  {
    User.findOne({username: username, password: password}, function(err, user)
    {
      if(!user)
      {
        return res.status(404).send();
      }
        req.session.user = user;
        res.status(200).send();
        res.redirect('/dashboard');
    })
  }
});


/*
router.post('/login:format?', function(req, res, next)
{
  var username = req.body.username;
  var password = req.body.password;

  // req param object
  if (req.params.format == '.json')
  {
    console.log('1111111!:');
    User.findOne({username: username, password: password}, function(err, user)
    {
      if(!user)
      {
        return res.status(404).send();
      }
      req.session.user = user;
      res.status(200).res.send('Welcome!');
      console.log('Welcome!:');
    })
  }
  console.log('222222!:');
  // else redirect html
  User.findOne({username: username, password: password}, function(err, user)
  {
    if(!user)
    {
      return res.status(404).send();
    }
      req.session.user = user;
      res.status(200).send();
      console.log('Goodbye!:');
      res.redirect('/dashboard');
  })
});

/*router.get('/dashboard'), function(req, res){
  if(!req.session.user){
    return res.status(401).send();
  }
  return res.status(200).send("Welcome");
}
*/
router.get('/logout', function(req, res){
  if (req.header('Content-Type') == 'application/json')
  {
    if(!req.session.user)
    {
      return res.status(401).send('Kein eingeloggter Benutzer gefunden. Bitte melde dich an um dich abzumelden.');
    }
    else
    {
    req.session.destroy();
    return res.status(200).send('Bis zum nächsten mal. Du wurdest erfolgreich ausgeloggt!');
    console.log('Bis zum nächsten mal. Du wurdest erfolgreich ausgeloggt!');
    }
  }
  else
  {
    req.session.destroy();
    return res.redirect('/');
  }
});

/* Register. */
router.get('/register', function(req, res, next) {

  if (req.header('Content-Type') == 'application/json')
  {
    return res.status(200).send('Du kannst dich per post auf die Ressource /register registrieren');
    console.log('Du kannst dich per post auf die Ressource /register registrieren');
  }
  else
  {
    res.render('register');
  }
});

router.post('/register', function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;
  var newuser = new User();

  newuser.username = username;
  newuser.password = password;

  if (req.header('Content-Type') == 'application/json')
  {
    newuser.save(function(err, savedUser){
      if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
      res.send('Willkommen bei FM2. Der Benutzer mit dem Namen '+ newuser.username +'. wurde erfolgreich angelegt!');
      console.log('Willkommen bei FM2. Der Benutzer wurde erfolgreich angelegt!');
    })
  }
  else
  {
    newuser.save(function(err, savedUser){
      if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
        res.redirect('/');
    })

  }
});

module.exports = router;
