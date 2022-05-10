// Routers
const routers = require('./router');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;
const db = require('./config');

db.on('connected', () => {
  console.log('Connected to the database!');
}).on('error', () => {
  console.log('Error connecting to the database');
});

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.use('/api', routers.stationRouter);
app.use('/api', routers.lineRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
