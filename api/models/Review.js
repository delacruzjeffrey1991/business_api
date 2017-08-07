var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  grade: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Grade' 
  },
  reviewer: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
   call: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Call' 
  },
  timeStamp: {
    type: Date, default: Date.now
  },
   length: {
    type: Number
  },
  tag : {
    type : String
  }
});


module.exports = mongoose.model('Review', ReviewSchema);