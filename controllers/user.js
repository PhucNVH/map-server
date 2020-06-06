const express = require('express'),
  router = express.Router();
const Device = require('./../models/Device');
const User = require('./../models/User');
const isAuthenticated = require('./../middlewares/isAuthenticate');
router.get('/history', isAuthenticated, (req, res) => {
  res.send('login');
});

router.get('/devices', isAuthenticated, (req, res) => {
  console.log(req.user.pairDevices);
  const promise = Device.find({_id: {$in: req.user.pairDevices}}).exec();
  promise
    .then((result) => {
      console.log('dsd');
      console.log(result);
      res.json({a: result});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/AddDevices', isAuthenticated, (req, res) => {
  const device = new Device({deviceId: 'dv03', name: 'band', isActive: true});
  device.save((err, obj) => {
    if (err) console.log(err);
    else {
      res.json(obj);
    }
  });
});
router.post('/connectDevice', isAuthenticated, (req, res) => {
  const deviceId = req.body.deviceId;
  Device.findById(deviceId, (error, result) => {
    if (error) console.log(error);
    else {
      req.user.pairDevices.push(result);
      req.user.save((err, obj) => {
        if (err) console.log(err);
        else res.json(obj);
      });
    }
  });
});

module.exports = router;
