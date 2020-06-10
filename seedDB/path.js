const Run = require('./../models/Run');
const Point = require('./../models/Point');

const samplePath = [
  {
    time: '2020-06-07T10:10:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.658088, 10.771828],
    },
  },
  {
    time: '2020-06-07T 10:11:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.657775, 10.771731],
    },
  },
  {
    time: '2020-06-07T10:12:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.657925, 10.771257],
    },
  },
  {
    time: '2020-06-07T10:13:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.658022, 10.77074],
    },
  },
  {
    time: '2020-06-07T10:14:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.658183, 10.770403],
    },
  },
  {
    time: '2020-06-07T10:15:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.65844, 10.770582],
    },
  },
  {
    time: '2020-06-07T10:16:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.65887, 10.770962],
    },
  },
  {
    time: '2020-06-07T10:17:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.659246, 10.771257],
    },
  },
  {
    time: '2020-06-07T10:18:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.6596, 10.771562],
    },
  },
  {
    time: '2020-06-07T10:19:08.834Z',
    location: {
      type: 'Point',
      coordinates: [106.660061, 10.771984],
    },
  },
  {
    time: '2020-06-07T10:20:08.835Z',
    location: {
      type: 'Point',
      coordinates: [106.660362, 10.772268],
    },
  },
  {
    time: '2020-06-07T10:21:08.835Z',
    location: {
      type: 'Point',
      coordinates: [106.660663, 10.772511],
    },
  },
];
function seedPath(id) {
  let listPoint = samplePath.map((e) => {
    return {time: new Date(e.time), location: e.location};
  });
  console.log(listPoint);
  Run.findById(id, (err, obj) => {
    if (err) console.log(err);
    obj.path = listPoint;
    obj.save((error, result) => {
      if (error) console.log(error);
      console.log(result);
    });
  });
}

module.exports = seedPath;
