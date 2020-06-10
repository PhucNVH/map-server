const express = require('express'),
  router = express.Router();

router.use('/user', require('./user.js'));
router.use('/run', require('./run.js'));

router.use('/device', require('./device.js'));

router.use('/auth', require('./auth.js'));

router.get('/', (req, res) => {
  res.render('index');
});

router.get('*', function (req, res) {
  res.render('404');
});

module.exports = router;
