var mongoose = require('mongoose');

var GroupsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date_created: {
    type: Date, default: Date.now
  },
    client_list : [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Client' 

  }],
    is_taxable: {
    type: Boolean
  },

});

module.exports = mongoose.model('Groups', GroupsSchema);