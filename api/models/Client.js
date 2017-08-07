var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
    business_structure: {
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
    type: Date

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
  //   type: Date, default: Date.now
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