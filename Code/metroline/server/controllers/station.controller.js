const Station = require('../models/station.model');
const ApiStation = require('../models/apistation.model');
const { default: axios } = require('axios');
const listStations = async (req, res) => {
  try {
    const stations = await Station.find({});
    res.send(stations);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const listApiStations = async (req, res) => {
  const response = await axios.get(
    'https://data.gov.il/api/3/action/datastore_search?resource_id=aaea25c0-1478-4ae6-9c61-1cce3cff5ae7'
  );
  const stations = response.data.result.records;
  res.send(stations);
};

module.exports = { listStations, listApiStations };
