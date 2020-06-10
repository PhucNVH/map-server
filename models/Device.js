var mongoose = require('mongoose');
var deviceSchema = mongoose.Schema({
  deviceId: String,
  name: String,
  isActive: Boolean,
  isPaired: {
    type: Boolean,
    default: false,
  },
});
var Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
