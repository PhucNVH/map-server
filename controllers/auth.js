const express = require('express'),
  router = express.Router();
const User = require('../models/User');
const passport = require('passport');

const isNotAuthenticated = require('../middlewares/isNotAuthenticate');
router.get('/', (req, res) => {
  res.redirect('auth/login');
});

router.get('/login', (req, res) => {
  res.send('login');
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  const userData = (({username, email, pairDevices, _id}) => {
    return {username, email, pairDevices, _id};
  })(req.user.toJSON());
  res.json(userData);
});

router.post('/logout', passport.authenticate('local'), function (req, res) {
  req.logout();
  res.json({state: 'logged Out'});
});

router.get('/signup', (req, res) => {
  res.render('signupPage');
});

router.post('/signup', isNotAuthenticated, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.register({username, isActive: true}, password, function (err, data) {
    if (err) {
      res.json({error: err});
    } else {
      var authenticate = User.authenticate();
      authenticate(username, password, (err, result) => {
        if (err) console.log(err);
        res.json(result.toJSON());
      });
    }
  });
});
module.exports = router;
