const express = require('express'),
  router = express.Router();

router.post('/currentLocation', (req, res) => {
  res.send('connected');
});

module.exports = router;
