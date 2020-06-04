const Petitions = require('../models/petitionModel');

const createPetitions = (petitionVals) => {
  const record = new Petitions(petitionVals);
  record.save(function (err) {
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

module.exports = {
  createPetitions,
  readPetitions
};
