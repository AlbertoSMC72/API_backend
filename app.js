// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo cors
const { databaseService } = require('./databaseService');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Usa el middleware CORS

/* require('./routes')(app, databaseService());
 */

// Middleware de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Monta el middleware databaseService en la ruta base "/granja".
app.use("/granja", databaseService);

app.listen(3003, () => {
  console.log('App listening on port http://localhost:3003');
});
