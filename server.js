require('dotenv').config();
const express = require('express');

const app = express();
const routes = require('./routes')
const cors = require('cors');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const Login = require('./Models/LoginReact');

mongoose.set('strictQuery', true);

//const connectionString = process.env.DB;
//mongoose.connect(connectionString)
//  .then(() => {
//    app.emit('pronto');
//  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(cors());


//app.on('pronto', () => {
  app.listen(3001, () => {
    console.log('Servidor iniciado http://localhost:3001/');
  });
//});
