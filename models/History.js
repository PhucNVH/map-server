var mongoose = require('mongoose');
var historySchema = mongoose.Schema({
  time: Date,
  gpsLocation: {
    Lat: Number,
    Long: Number,
  },
});
var History = mongoose.model('History', historySchema);
module.exports = History;
