var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var unirest = require('unirest');
var logout = require('express-passport-logout');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
  User.findById(req.user.id, function(err, user) {
    if (err) { res.send(err);}
    else {
      user.isLoggedIn = true;
      user.save()
      res.json(req.user);
    }
  });
});
router.post('/save', function(req, res) {
  console.log(req.body)
  User.findById(req.user.id, function(err, user) {
    user.savedDrinks.push(req.body)
    user.save()
    res.json(user)
  })
})
router.post('/editsaved', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    user.savedDrinks = req.body.savedDrinks
    user.save()
    res.json(user)
  })
})
router.post('/drink', function(req, res) {
  unirest.get('http://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + req.body.drinkName)
  .header("Accept", "application/json")
  .end(function (result) {
    res.send(result.body.drinks)
  });
});
var logout = function(req, res){
  if (req.isAuthenticated()){
      req.logout();
      res.redirect('/');
  }
};
router.get('/logout', logout);

module.exports = router;
