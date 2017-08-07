var mongoose = require('mongoose');

var InteractionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  classification :{
    type : String
  },
   product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
});

module.exports = mongoose.model('Interactions', InteractionsSchema);