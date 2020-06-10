const express = require('express'),
  router = express.Router();
const Device = require('./../models/Device');

const Run = require('./../models/Run');
const User = require('./../models/User');
const isAuthenticated = require('./../middlewares/isAuthenticate');

router.get('/devices', isAuthenticated, (req, res) => {
  console.log(req.user.pairDevices);
  const promise = Device.find({_id: {$in: req.user.pairDevices}}).exec();
  promise
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/addDevices', isAuthenticated, (req, res) => {
  const deviceId = req.body.deviceId;
  const name = req.body.name;
  const device = new Device({deviceId, name, isActive: true});
  device.save((err, obj) => {
    if (err) console.log(err);
    else {
      res.json(obj);
    }
  });
});
router.post('/registerDevice', isAuthenticated, (req, res) => {
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

router.get('/history', isAuthenticated, (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let sortBy = req.query.sortBy;
  let isDesc = req.query.isDesc === 'true' ? '-' : '';
  switch (sortBy) {
    case 'startTime':
    case 'pace':
    case 'distance':
    case 'length':
      break;
    default:
      sortBy = '';
      break;
  }
  if (from === undefined) {
    from = new Date(0);
  }
  if (to === undefined) {
    to = new Date();
  }
  const promise = Run.find({
    _id: {$in: req.user.history},
    startTime: {$gt: from, $lt: to},
  })
    .sort(isDesc + sortBy)
    .exec();
  promise
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/history/:id', isAuthenticated, (req, res) => {
  Run.findById(req.params.id, (err, obj) => {
    if (err) {
      res.json({error: err});
    } else {
      res.json(obj);
    }
  });
});

module.exports = router;
