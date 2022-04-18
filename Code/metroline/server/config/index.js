const mongoose = require('mongoose');
const username = 'metroline';
const password = 'gHUl3ZM0MR5gNie9';
const uri = `mongodb+srv://${username}:${password}@tomsmongo.jsldc.mongodb.net/metroline?retryWrites=true&w=majority`;
mongoose.connect(uri).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;
