// Routers
const routers = require('./router');

const express = require('express');
const app = express();
const port = 3000;
const db = require('./config');

db.on('connected', () => {
  console.log('Connected to the database!');
}).on('error', () => {
  console.log('Error connecting to the database');
});

app.use('/api', routers.stationRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
