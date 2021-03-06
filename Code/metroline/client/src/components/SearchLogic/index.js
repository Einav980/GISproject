const dijkstra = require('dijkstrajs');
const { stationsGraph } = require('./graph');

const searchRoute = (start, destination) => {
  const path = dijkstra.find_path(stationsGraph, start, destination);
  console.log('Path', path);
  return path;
};

module.exports = { searchRoute };
