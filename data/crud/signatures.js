const Signature = require('../models/signatureModel')

const createSignature = async (recordVals) => {
  const record = new Signature(recordVals);
  await record.save(err => {
    if (err) {
      throw err;
    } else {
      return 'ok';
    }
  });
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
