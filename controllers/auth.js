const express = require('express'),
  router = express.Router();
const Admin = require('../models/Admin');
const crypto = require('crypto');

router.get('/', (req, res) => {
  res.redirect('auth/login');
});

router.get('/login', (req, res) => {
  res.render('loginPage');
});

router.post('/login', (req, res) => {
  username = req.body.username;
  password = req.body.password;
  hashPassword = crypto.createHash('md5').update(password).digest('hex');
  userdata = {
    username: username,
    password: password,
  };
  Admin.findOne(userdata, function (err, response) {
    if (response) {
      res.json(response);
    } else {
      res.json({error: 'user not found'});
    }
  });
});

router.get('/signup', (req, res) => {
  res.render('signupPage');
});

router.post('/signup', (req, res) => {
  username = req.body.username;
  password = req.body.password;
  hashPassword = crypto.createHash('md5').update(password).digest('hex');
  var newAdmin = new Admin({
    username: username,
    password: hashPassword,
    isActive: false,
  });
  newAdmin.save(function (err, Person) {
    if (err) res.send('error');
    else {
      res.send('true');
    }
  });
});

module.exports = router;
