const Mongoose = require('../client');
const Schema = Mongoose.Schema;

const petitionSchema = new Schema({
  topic: { type: String, required: true },
  text: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

const Petition = Mongoose.model('Petition', petitionSchema);

module.exports = Petition;
