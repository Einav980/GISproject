const stat = require('../SearchLogic/nigborsStations.json') 

const adjacencyList = new Map();


stat.StationsList.forEach((stat) => {
    adjacencyList.set(stat.stations , stat.nighdors)
});


module.exports = {adjacencyList}