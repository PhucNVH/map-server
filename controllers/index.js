const express = require('express'),
  router = express.Router();

const firebase = require('firebase-admin');

router.use('/users', require('./users.js'));

router.use('/auth', require('./auth.js'));

router.get('/', (req, res) => {
  console.log(firebase);
  res.render('index');
});

router.get('*', function (req, res) {
  res.render('404');
});

module.exports = router;
