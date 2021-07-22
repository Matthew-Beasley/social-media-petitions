
require('dotenv').config();
const { Client } = require('pg');
let client = null;
if (process.env.ENV === 'test') {
  client = new Client(process.env.DATABASE_URL);
} else {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}
client.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('pg connected')
  }
});

/*
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
*/
module.exports = client;
