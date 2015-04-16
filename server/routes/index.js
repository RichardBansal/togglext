// NOTES ==================================
// var bluebird = require('bluebird');
// var http = bluebird.promisifyAll(require('http'));
//Note when you promisify, all functions of the library now require Async attached to it to be used as promises;
// NOTES ==================================

"use strict";

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = require("express").Router();
var Promise = require("bluebird");
var requestAPI = new XMLHttpRequest();
var api = require("../../config/api");
var api_token = api.token;

//load angular app
router.get("/",function(req,res,next){
	res.send('index.html');
});

//source: http://www.html5rocks.com/en/tutorials/es6/promises/#toc-promisifying-xmlhttprequest
function apiCall(url,api_token,type,data){
	// console.log('attempt to resumit','\''+JSON.stringify(data)+'\'');
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
		}
	});
}

// console.log('weekly data requested');
//CLNUP Figure out why it does not work when using http.get
//CLNUP Review specific Key information from being exposed
//CLNUP Improve Transitions, it seems too jaggeded
//TODO You have specify the week you want the summary for

router.get("/weekly",function(req,res,next){
	apiCall(api.weekly_url, api_token, "GET").then(function(response){
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
	apiCall(api.current_task_url, api_token, "GET").then(function(response){
		res.send(response);
	}, function(error){
		console.error("Failed!",error);
	});

});

router.put("/stopCurrentTask/:id",function(req,res,next){
	// console.log(req.params);
	//CLNUP: below line
	
	apiCall(api.stop_task_url(req.params.id),api_token,"PUT").then(function(response){
		// console.log('task stopped', response);
		res.end();
	}, function(error){
		console.error("Failed!", error);
	});

});


// DONE: Cannot get POST to work, did not work via CURL as well, test out CREATE THEN START
//CLNUP: Both posts are the same, so you can refactor them
router.post("/resumeCurrentTask",function(req,res,next){
	// console.log('here');
	// console.log(JSON.stringify(req.body));
	apiCall(api.start_task_url,api_token,"POST",req.body).then(function(response){
		// console.log('task resumed', response);
		res.send(response);
	}, function(error){
		console.error("Failed!",error);
	});
});

router.post("/createTask",function(req,res,next){
	// console.log('here');
	console.log(JSON.stringify(req.body));
	apiCall(api.start_task_url,api_token,"POST",req.body).then(function(response){
		// console.log('task resumed', response);
		res.send(response);
	}, function(error){
		console.error("Failed!",error);
	});
});

module.exports = router;