// require libraries, reference node-modules folder
// set up middleware
// module.exports app for use

"use strict";

var express = require("express"),
	morgan = require("morgan"),
	bluebird = require("bluebird"),
	path = require("path"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"), //left for now
	nodeSass = require("node-sass-middleware"), //left for now
	app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static(path.join(__dirname,"/bower_components")));

app.get("/*",function(req,res,next){
	res.send('index.html');
});

// set up routes error handling

app.listen(3000);

module.exports = app;