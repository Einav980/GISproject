const { default: mongoose } = require('mongoose');

const lineModel = mongoose.Schema({
  _id: { type: String, require: true },
  type: { type: String, require: true },
  properties: { type: Object, require: true },
  geometry: { type: Object, require: true },
});

module.exports = mongoose.model('LineModel', lineModel, 'lines');
