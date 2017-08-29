var mongoose = require('mongoose');

var RelationshipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
   client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
     relatedClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }

});

module.exports = mongoose.model('Relationship', RelationshipSchema);