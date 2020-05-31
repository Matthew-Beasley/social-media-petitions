const Signature = require('../models/signatureModel')

const createSignature = (recordVals) => {
  const record = new Signature(recordVals);
  console.log('record in createSignature', record)
  record.save(function (err) {
    if (err) throw err;
    console.log('User saved successfully!');
  });
  return 'bogus return';
}

module.exports = createSignature;
