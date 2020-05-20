const express = require('express'),
  router = express.Router();
const firebase = require('firebase-admin');
const fbAuth = firebase.auth();
const crypto = require('crypto');

router.get('/', (req, res) => {
  res.render('userPage');
});
router.post('/createUser', (req, res) => {
  email = req.body.email;
  console.log(email);
  password = req.body.password;
  const hashEmail = crypto.createHash('md5').update(email).digest('hex');
  fbAuth
    .createUser({
      email: email,
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: password,
      displayName: 'John Doe',
      photoURL: `https://www.gravatar.com/avatar/${hashEmail}?d=identicon`,
      disabled: false,
    })
    .then((userRecord) => res.json(userRecord.toJSON()))
    .catch((e) => res.json(e));
});
router.get('/userInfo', (req, res) => {
  email = req.query.email;
  fbAuth
    .getUserByEmail(email)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully fetched user data:', userRecord.toJSON());
      res.json(userRecord.toJSON());
    })
    .catch(function (error) {
      console.log('Error fetching user data:', error);
      res.json(error);
    });
});

module.exports = router;
