var mongoose = require('mongoose');

var QaProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date_created: {
    type: Date, default: Date.now
  },
    grade_list : [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Grade' 

  }]
});

module.exports = mongoose.model('QaProfile', QaProfileSchema);