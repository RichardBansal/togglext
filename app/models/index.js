"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/toggl');

mongoose.connection.on('error',console.log.bind(console, 'database connection error'));

// don't forget to export any models that you plan to use
// for example, you can save api data for quick access as opposed to completing multiple get requests (future improvement)