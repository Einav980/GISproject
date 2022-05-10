const Line = require('../models/line.model');

const listLines = async (req, res) => {
  try {
    const lines = await Line.find({});
    res.send(lines);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { listLines };
