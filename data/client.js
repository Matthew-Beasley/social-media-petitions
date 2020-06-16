const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/social');
client.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('pg connected')
  }
});
module.exports = client;
