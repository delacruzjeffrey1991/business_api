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
  messanger: {
    type: String
  },
  skype: {
    type: String
  }
});

module.exports = mongoose.model('Contact', ContactSchema);