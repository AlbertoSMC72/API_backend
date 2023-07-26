// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { databaseService } = require('./databaseService');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Usa el middleware CORS

require('./routes')(app, databaseService());


app.use("/granja", databaseService);

app.listen(3003, () => {
  console.log('App listening on port http://localhost:3003');
});
