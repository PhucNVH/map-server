var mongoose = require('mongoose');
const pointSchema = mongoose.Schema({
  time: Date,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
var Point = mongoose.model('Point', pointSchema);
module.exports = pointSchema;
