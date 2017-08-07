var mongoose = require('mongoose');

var CallSchema = new mongoose.Schema({
  interaction: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Interactions' 
  },
  agent: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  timeStamp: {
    type: Date, default: Date.now
  },
   fileLocation: {
    type: String
  },
  agentName: {
    type: String
  },
  description: {
    type: String
  }

});

module.exports = mongoose.model('Call', CallSchema);