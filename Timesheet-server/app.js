const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

//DB connection..
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Successfully connected with MongoDB');
})

const auth = require('./src/api/auth/auth.routes');
const entries = require('./src/api/entries/entries.routes');


app.use('/api/auth', auth);
app.use('/api/entries', entries);


app.listen(port, () => {
  console.log("Server has started!");
})