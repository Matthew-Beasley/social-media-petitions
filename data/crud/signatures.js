const Signature = require('../models/signatureModel')

const createSignature = (recordVals) => {
  const record = new Signature(recordVals);
  record.save(function (err) {
    if (err) throw err;
  });
  return 'bogus return';
}

const getSignaturesByPetition = async (petitionName) => {
  const records = await Signature.find({ topic: petitionName });
  return records;
}

module.exports =
{
  createSignature,
  getSignaturesByPetition
};
