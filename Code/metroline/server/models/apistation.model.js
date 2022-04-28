const { default: mongoose } = require('mongoose');

const apiStationModel = mongoose.Schema({
  NAMEENG: { type: String, require: true },
  LINE: { type: String, require: true },
  MASA: { type: String, require: true },
  NAME: { type: String, require: true },
  YEARMONTH: { type: String, require: true },
});

module.exports = mongoose.model('ApiStation', apiStationModel);
