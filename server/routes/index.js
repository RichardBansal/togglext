// NOTES ==================================
// var bluebird = require('bluebird');
// var http = bluebird.promisifyAll(require('http'));
//Note when you promisify, all functions of the library now require Async attached to it to be used as promises;
// NOTES ==================================

"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = require('express').Router();
var Promise = require('bluebird');
var requestAPI = new XMLHttpRequest();

//load angular app
router.get("/",function(req,res,next){
	res.send('index.html');
});

//source: http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest
//CLNUP: Change function name from get, to all or something generic
//CLNUP: ensure functions call 'get' are updated and tested as well
function get(url,api_token,type,data){
	// console.log('attempt to resumit','\''+JSON.stringify(data)+'\'');
	// console.log("submit");
	return new Promise(function(resolve, reject){
		var req = new XMLHttpRequest();
		req.open(type,url,true,api_token,"api_token");
		req.onload = function(){
			if (req.status == 200){
				resolve(JSON.parse(req.responseText));	
			} else {
				reject(Error(JSON.stringify(req)));
			}
		};
		req.onerror = function(){
			reject(Error("Network Error"));
		};

		if(data===undefined){
			req.send();
		} else {
			console.log(JSON.stringify(data));
			req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			// req.send('\''+JSON.stringify(data)+'\'');
			req.send(JSON.stringify(data));
			//CLNUP: You don't have the latest item you are trying to stop stored

			// '{"time_entry":{"description":"Meeting with possible clients","tags":["billed"],"pid":123,"created_with":"curl"}}'
			// '{"time_entry":{"description":"Toggl Chrome Ext.","pid":9302237,"created_with":"togglExt"}}'
		}
	});
}

// console.log('weekly data requested');
//CLNUP Figure out why it does not work when using http.get
//CLNUP Review specific Key information from being exposed
//CLNUP Improve Transitions, it seems too jaggeded
//TODO You have specify the week you want the summary for

router.get("/weekly",function(req,res,next){
	var url = "https://toggl.com/reports/api/v2/weekly?workspace_id=732811&since=2015-04-13&until=2015-04-19&user_agent=richard.bansal@gmail.com";
	var api_token = "c042bbef2a5b8606674641543043d64b";
	get(url, api_token, "GET").then(function(response){
		res.send(response.data.map(function(entry){
				return({
					project: entry.title.project,
					hours: Math.round(entry.totals[7]/3600000)
				});
			})
		);
	}, function(error){
		console.error("Failed!",error);
	});
});

router.get("/currentTask",function(req,res,next){
	// console.log('current active task requested');
	var url = "https://www.toggl.com/api/v8/time_entries/current";
	var api_token = "c042bbef2a5b8606674641543043d64b";

	get(url, api_token, "GET").then(function(response){
		res.send(response);
	}, function(error){
		console.error("Failed!",error);
	});

});

router.put("/stopCurrentTask/:id",function(req,res,next){
	console.log(req.params);
	//CLNUP: below line
	var url = "https://www.toggl.com/api/v8/time_entries/"+req.params.id+"/stop";
	var api_token = "c042bbef2a5b8606674641543043d64b";
	
	get(url,api_token,"PUT").then(function(response){
		// console.log('task stopped', response);
		res.end();
	}, function(error){
		console.error("Failed!", error);
	});

});


// TODO: Cannot get POST to work, did not work via CURL as well, test out CREATE THEN START
router.post("/resumeCurrentTask",function(req,res,next){
	// console.log('here');
	console.log(JSON.stringify(req.body));
	var url = "https://www.toggl.com/api/v8/time_entries/start";
	//CLNUP place api_token in api/config and publish all commits afterwards (not before)
	var api_token = "c042bbef2a5b8606674641543043d64b"; 
	get(url,api_token,"POST",req.body).then(function(response){
		// console.log('task resumed', response);
		res.send(response);
	}, function(error){
		console.error("Failed!",error);
	});
});

module.exports = router;