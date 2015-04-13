"use strict";

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/toggl");

mongoose.connection.on("error",console.log.bind(console, "database connection error"));
mongoose.connection.on("connected",console.log.bind(console, "database connection made"));

// don't forget to export any models that you plan to use
// for example, you can save api data for quick access as opposed to completing multiple get requests (future improvement)

//This may not be working, because you are not currently creating a schema to be used anywhere, to no connection is being made