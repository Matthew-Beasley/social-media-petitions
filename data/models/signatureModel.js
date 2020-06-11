const Mongoose = require('../client');
const Schema = Mongoose.Schema;

const signatureSchema = new Schema({
  topic: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String }
});

const Signature = Mongoose.model('Signature', signatureSchema);

module.exports = Signature;
