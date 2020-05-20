const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./models/index.model');

const { PORT, DB_URI } = require('./config/env.config');

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database');
});

app.use(require('./routes/index.route'));

app.listen(PORT, () => {
    console.log('Server started.');
});