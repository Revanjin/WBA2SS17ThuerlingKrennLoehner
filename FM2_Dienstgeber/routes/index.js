//  require definieren
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// DB Connection aufbauen
mongoose.connect('localhost:27017/test');
var Schema = mongoose.Schema;

// User Schema in collection myuser erstellen
var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},

}, {collection: 'myuser'});
// Model in Var speichern
var User = mongoose.model('myuser', UserSchema);


// -------------- GET / --------------
router.get('/', function(req, res, next) {
  // JSON response
  if (req.header('Content-Type') == 'application/json')
  {
    res.write('**********************************************************\n');
    res.write('*****  Willkommen bei Find Mates for Matches [ FM2 ] *****\n');
    res.write('*****  Dir stehen folgenden Funktionen zur Verfügung *****\n');
    res.write('*****  get | post                                    *****\n');
    res.write('*****  auf folgende Ressourcen                       *****\n');
    res.write('*****  / . /login . /register                        *****\n');
    res.write('**********************************************************\n');
    console.log('Willkommen bei Find Mates for Matches [ FM2 ]\n');
    res.end();
  }
  else
  {
  // HTML response
  // render login.hbs
  res.render('login');
  }
});

// -------------- POST /LOGIN --------------
router.post('/login', function(req, res)
{
// username und password definieren
var username = req.body.username;
var password = req.body.password;
  // JSON response
  if (req.header('Content-Type') == 'application/json') {
    // Mongoose funktion findOne
    User.findOne({username: username, password: password}, function(err, user)
    {
      // Wenn User nicht gefunden 404 Not Found
      if(!user)
      {
        return res.status(404).send();
      }
      // UserSession + response
      req.session.user = user;
      res.send('Willkommen bei FM2 '+ req.body.username +'. du wurdest erfolgreich eingeloggt!');
      console.log('Willkommen bei FM2. Du wurdest erfolgreich eingeloggt!');
    })
  }
  // HTML response
  else
  {
    User.findOne({username: username, password: password}, function(err, user)
    {
      // Wenn User nicht gefunden 404 Not Found
      if(!user)
      {
        return res.status(404).send();
      }
        // UserSession + response
        req.session.user = user;
        res.status(200).send();
        res.redirect('/dashboard');
    })
  }
});

// -------------- GET /LOGOUT --------------
router.get('/logout', function(req, res){
  // JSON response
  if (req.header('Content-Type') == 'application/json')
  {
    // Überprüft ob User eingeloggt wenn nicht 404 Not Found
    if(!req.session.user)
    {
      return res.status(404).send('Kein eingeloggter Benutzer gefunden. Bitte melde dich an um dich abzumelden.');
    }
    // Session terminieren und response Infotext
    else
    {
    req.session.destroy();
    return res.status(200).send('Bis zum nächsten mal. Du wurdest erfolgreich ausgeloggt!');
    console.log('Bis zum nächsten mal. Du wurdest erfolgreich ausgeloggt!');
    }
  }
  // HTML response
  // Session terminieren und redirect auf Loginpage
  else
  {
    req.session.destroy();
    return res.redirect('/');
  }
});

// -------------- GET /REGISTER --------------
router.get('/register', function(req, res, next) {
  // JSON response
  if (req.header('Content-Type') == 'application/json')
  {
    //response Infotext
    return res.status(200).send('Du kannst dich per post auf die Ressource /register registrieren');
    console.log('Du kannst dich per post auf die Ressource /register registrieren');
  }
  else
  {
    // render register.hbs
    res.render('register');
  }
});

// -------------- POST /REGISTER --------------
router.post('/register', function(req, res, next) {

  // username und password definieren
  var username = req.body.username;
  var password = req.body.password;
  // newuser Objekt erstellen
  var newuser = new User();
  // werte in newuser. speichern
  newuser.username = username;
  newuser.password = password;
  // JSON response
  if (req.header('Content-Type') == 'application/json')
  {
    // mongoose funktion save
    newuser.save(function(err, savedUser){
      if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
      // response Infotext
      res.send('Willkommen bei FM2. Der Benutzer mit dem Namen '+ newuser.username +'. wurde erfolgreich angelegt!');
      console.log('Willkommen bei FM2. Der Benutzer wurde erfolgreich angelegt!');
    })
  }
  // HTML response
  else
  {
    // mongoose funktion save
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
// exportiere router
module.exports = router;
