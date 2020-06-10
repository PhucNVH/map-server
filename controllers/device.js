const express = require('express'),
  router = express.Router();
const Device = require('./../models/Device');

router.post('/addDevice', (req, res) => {
  const deviceId = req.body.deviceId;
  const name = req.body.name;
  const device = new Device({deviceId, name, isPaired: false, isActive: true});
  device.save((err, obj) => {
    if (err) console.log(err);
    else {
      res.json(obj);
    }
  });
});
router.post('/currentLocation', (req, res) => {
  res.send('connected');
});
router.get('/availableDevices', (req, res) => {
  const promise = Device.find({isPaired: false}).exec();
  promise
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
