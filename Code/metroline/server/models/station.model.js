const { default: mongoose } = require('mongoose');

const stationModel = mongoose.Schema({
  name: { type: String, require: true },
  city: { type: String, require: true },
  color: { type: String, require: true },
  area: { type: String, require: true },
  status: { type: String, require: true },
});

module.exports = mongoose.model('Stations', stationModel);
