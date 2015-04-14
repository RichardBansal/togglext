// TODO: Clean up dependencies, multiple calls to bluebird
// TODO: Find a script to insert "Use Strict" everwhere on file creation
// TODO: Implement Promises
// var bluebird = require('bluebird');
// var http = bluebird.promisifyAll(require('http'));

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var requestAPI = new XMLHttpRequest();

//Note when you promisify, all functions of the library now require Async attached to it to be used as promises;

var router = require('express').Router();

router.get("/",function(req,res,next){
	res.send('index.html');
});

//TODO fix this implementation, global variable exposed
var result = []

function reqListener(){

	var self = JSON.parse(this.responseText);
	// console.log(self.data.length);

	result = self.data.map(function(entry){
		// console.log(entry.title.project,entry.totals[7]/3600000);

		return({
			project: entry.title.project,
			hours: Math.round(entry.totals[7]/3600000)
			});
	});

	console.log(result);
}

router.get("/weekly",function(req,res,next){
	console.log('weekly data requested');
	// res.send('Weekly Data');
	//TODO Should the backend request be XML or simple HTTP GET?
	//TODO FRONT END WILL BE AJAX
	//TODO below str should be stored in Mongoose with associated user name
	//TODO Figure out why it does not work when using http.get
	//TODO Review specific Key information from being exposed
		requestAPI.onload = reqListener;
	//TODO You have specify the week you want the summary for
		requestAPI.open("get","https://toggl.com/reports/api/v2/weekly?workspace_id=732811&since=2015-04-06&until=2015-04-12&user_agent=richard.bansal@gmail.com",true,"c042bbef2a5b8606674641543043d64b","api_token");
		requestAPI.send();
		
		//TODO Fix Async issue here (I think - you get 0 data back sometimes, not sure why)
		setTimeout(function () {
            res.send(result);			
        }, 500);

});

module.exports = router;