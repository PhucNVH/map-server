var mongoose = require('mongoose');
const Point = require('./Point');

const runSchema = new mongoose.Schema({
  startTime: Date,
  status: {
    type: String,
    enum: ['Inactive', 'Active', 'Pause', 'Stopped'],
    default: 'Inactive',
  },
  path: [Point],
  distance: {
    type: Number,
    default: 0,
  },
  pace: {
    type: Number,
    default: 0,
  },
});
var Run = mongoose.model('Run', runSchema);
module.exports = Run;
