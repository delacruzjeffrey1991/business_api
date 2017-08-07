var mongoose = require('mongoose');

var CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date_created: {
    type: Date, default: Date.now
  },
   documents: {
    type: String
  },
  status:{
    type: String
  },
  interaction_list : [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Interactions' 

  }],
  qaProfile : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QaProfile'
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);