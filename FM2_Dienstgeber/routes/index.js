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


// -------------- | INFOTEXT | GET / --------------
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
});

// -------------- | ANMELDEN | POST  --------------
router.post('/session', function userAnmelden(req, res)
{
// username und password definieren
var username = req.body.username;
var password = req.body.password;

var item = {
              username: req.body.username,
              password: req.body.password
};
var data = new User(item);
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
      res.json(data);//type('text').send('Der User mit der ID ' + req.body.username + ' wurde erfolgreich eingeloggt');
      console.log('Willkommen bei FM2. Du wurdest erfolgreich eingeloggt!');
    })
  }
});

// -------------- | USER ABMELDEN | GET /LOGOUT --------------
router.delete('/session', function userAbmelden(req, res){
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
});


// -------------- USER_ANMELDEN - INFOTEXT| GET |  /REGISTER --------------
router.get('/session', function userAnmeldenInfotext(req, res, next) {
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
router.post('/users', function(req, res, next) {

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
      res.status(200).res.json(newuser);
      console.log('Willkommen bei FM2. Der Benutzer wurde erfolgreich angelegt!');
    })
  }
});
// exportiere router
module.exports = router;
