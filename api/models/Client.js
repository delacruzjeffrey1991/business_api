var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  group_list : [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Groups' 

  }],
  relationship_list : [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Relationship' 

  }],
  name: {
    type: String,
    required: true
  },
    firstName: {
    type: String,
  },
    lastName: {
    type: String,
  },
      otherName: {
    type: String,
  },
    business_structure: {
    type: String
  },
  partner: {
    type: String
  },
  manager: {
    type: String
  },
      title: {
    type: String
  },
      gender: {
    type: String
  },
      dob: {
    type: String
  },
    phone: {
    type: String
  },
    fax: {
    type: String
  },
    email: {
    type: String
  },
    website: {
    type: String
  },
    referral: {
    type: String
  },
    street_address: {
    type: String
  },
    city: {
    type: String
  },
    region: {
    type: String
  },
    postal: {
    type: String
  },
    country: {
    type: String
  },
  tfn: {
    type: String
  },
   abn: {
    type: String
  },
   branch: {
    type: String
  },
   acn: {
    type: String
  },
   balance_date: {
    type: String

  },
   agent: {
    type: String
  },
   activity_statements_boolean: {
    type: Boolean
  },
   activity_statements: {
    type: String
  },
     tax_form: {
    type: String
  },
     tax_form_boolean: {
    type: Boolean
  },
     client_code: {
    type: String
  },
  prepare_activity_statements: {
    type: String

  },
     prepare_tax_form: {
    type: String

  },
     bsb: {
    type: String
  },
     account_number: {
    type: String
  },
     account_name: {
    type: String
  },
     financial_institution_name: {
    type: String
  },
  free_from_refund: {
    type: Boolean
  },
  active_ato_client: {
    type: Boolean
  },
  // date_created: {
  //   type: String, default: String.now
  // },
  //  product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product'
  // },
  //    op_contact: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Contact'
  // },
  //      tech_contact: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Contact'
  // },
  //      acc_contact: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Contact'
  // },
  //      status: {
  //   type: mongoose.Schema.Types.String
  // }

});

module.exports = mongoose.model('Client', ClientSchema);