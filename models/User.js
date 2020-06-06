var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  pairDevices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}],
});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
module.exports = User;
