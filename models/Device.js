var mongoose = require('mongoose');
var deviceSchema = mongoose.Schema({
  deviceId: String,
  name: String,
  isActive: Boolean,
});
var Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
