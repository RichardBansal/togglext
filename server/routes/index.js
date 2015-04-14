// TODO: Clean up dependencies, multiple calls to bluebird
// TODO: Find a script to insert "Use Strict" everwhere on file creation

var bluebird = require('bluebird');
// var http = bluebird.promisifyAll(require('http'));

//Note when you promisify, all functions of the library now require Async attached to it to be used as promises;

var router = require('express').Router();

router.get("/",function(req,res,next){
	res.send('index.html');
});

router.get("/weekly",function(req,res,next){
	console.log('weekly data requested');
	// res.send('Weekly Data');
	// TODO Should the backend request be XML or simple HTTP GET?
	// FRONT END WILL BE AJAX

	//TODO below str should be stored in Mongoose with associated user name

	//TODO Figure out why it does not work when using http.get
	// var str = "https://toggl.com/reports/api/v2/weekly?workspace_id=732811&user_agent=richard.bansal@gmail.com&api_token=c042bbef2a5b8606674641543043d64b";
	
	// http.getAsync(str)
	// 	.then(	function(data){
			res.send("get completed successful");
	// 	}, function(error){
	// 		console.log("error",error);
	// 	});
	
});

module.exports = router;