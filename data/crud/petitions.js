const Petitions = require('../models/petitionModel');

const createPetitions = async (petitionVals) => {
  const record = new Petitions(petitionVals);
  await record.save(err => {
    if (err) {
      throw err;
    } else {
      return 'ok';
    }
  });
}

const readPetitions = async (name) => {
  const record = await Petitions.find({ topic: name });
  return record;
}

const readAllPetitions = async () => {
  const records = await Petitions.find();
  return records;
}

module.exports = {
  createPetitions,
  readPetitions,
  readAllPetitions
};
