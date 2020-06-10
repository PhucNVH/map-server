var mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: 'https://www.gravatar.com/avatar/0?d=identicon',
  },
  personalRecord: {
    weight: Number,
    height: Number,
    age: Number,
    nationality: String,
    averagePage: Number,
    totalDistance: Number,
  },
  currentRun: {type: mongoose.Schema.Types.ObjectId, ref: 'Run', default: null},
  history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Run'}],
  pairDevices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device'}],
});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
module.exports = User;
