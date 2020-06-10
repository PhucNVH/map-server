const express = require('express'),
  router = express.Router();
const Device = require('./../models/Device');
const User = require('./../models/User');
const Run = require('../models/Run');
const isAuthenticated = require('./../middlewares/isAuthenticate');
const seedPath = require('./../seedDB/path');

router.post('/create', isAuthenticated, (req, res) => {
  if (!req.user.currentRun) {
    const run = new Run({startTime: new Date(), status: 'Inactive', path: []});
    req.user.currentRun = run;
    req.user.history.push(run);
    let promises = [req.user.save(), run.save()];
    Promise.all(promises)
      .then((obj) => {
        res.json({status: 'Success', message: 'Create run', obj});
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.json({error: 'currently in a run'});
  }
});

router.post('/start', isAuthenticated, (req, res) => {
  if (req.user.currentRun) {
    req.user.currentRun.status = 'Pause';

    req.user.currentRun.save((err, obj) => {
      if (err) console.log(err);
      else {
        res.json({status: 'Success', message: 'Start running', obj});
      }
    });
  } else {
    res.json({error: 'Not in a run'});
  }
});

router.post('/position', isAuthenticated, (req, res) => {
  if (req.user.currentRun) {
    const deviceId = req.body.device_id;
    const status = req.body.value[1];
    const long = req.body.value[2];
    const lat = req.body.value[1];

    req.user.currentRun.path.push({
      time: Date.now(),
      location: {
        type: 'Point',
        coordinates: [long, lat],
      },
    });

    req.user.currentRun.save((err, obj) => {
      if (err) console.log(err);
      else {
        res.json({status: 'Success', message: 'Point added', obj});
      }
    });
  } else {
    res.json({error: 'Not in a run'});
  }
});

router.post('/pause', isAuthenticated, (req, res) => {
  if (!req.user.currentRun) {
    const run = new Run({startTime: new Date(), status: 'Inactive', path: []});
    req.user.currentRun = run;
    req.user.history.push(run);
    let promises = [req.user.save(), run.save()];
    Promise.all(promises)
      .then((obj) => {
        res.json({status: 'Success', message: 'pause', obj});
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.json({error: 'Not in a run'});
  }
});

router.post('/stop', isAuthenticated, (req, res) => {
  if (req.user.currentRun) {
    let promises = [
      Run.updateOne({_id: req.user.currentRun}, {status: 'Stopped'}),
      req.user.updateOne({currentRun: null}),
    ];
    Promise.all(promises)
      .then((obj) => {
        res.json({status: 'Success', message: 'Stop running'});
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.json({error: 'No run to stop'});
  }
});
// seed Database
// router.post('/seed', isAuthenticated, (req, res) => {
//   if (req.user.currentRun) {
//     seedPath(req.user.currentRun);
//   } else {
//     res.json({error: 'currently in a run'});
//   }
// });

// test get data
// router.get('/get', isAuthenticated, async (req, res) => {
//   if (req.user.currentRun) {
//     const obj = await Run.findById(req.user.currentRun);
//     res.json(obj);
//   } else {
//     res.json({error: 'No run to stop'});
//   }
// });

module.exports = router;
