var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },  
  mobile: {
    type: String
  },
  position: {
    type: String
  },
   client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }
});

module.exports = mongoose.model('Contact', ContactSchema);