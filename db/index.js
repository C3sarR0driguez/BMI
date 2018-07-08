'use strict';
const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.dbURI);

//Log an error if connection fails
mongoose.connection.on('error', err => {
    console.log('MongoDB Error:', err);
});

module.exports = {
    mongoose
}