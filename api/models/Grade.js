var mongoose = require('mongoose');

var GradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  objective: {
    type: String
  },
  max_score: {
    type: Number
  },
  auto_fail: {
    type: Boolean
  },
  applicable: {
    type: Boolean
  },
  date_created: {
     type: Date, default: Date.now
  }
});


module.exports = mongoose.model('Grade', GradeSchema);