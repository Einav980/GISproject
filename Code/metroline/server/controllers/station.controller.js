const Station = require('../models/station.model');

const listStations = async (req, res) => {
  try {
    const stations = await Station.find({});
    res.send({ stations: stations });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { listStations };
