"use strict";
//CLNUP: Store entire task data and boolean to state whether it is active or not
app.factory("ActivetaskFactory", function($http){
	return {
		data: undefined,
		active: false,
		paused: false,
		getCurrentTask : function(){
			return $http.get("/currentTask")
				.then(function(response){
					if(response.data.data !== null){
						response.data.data.duration = Math.round((response.data.data.duration+(new Date().getTime())/1000)/60);
						return response;
					}
				}, function(error){
					console.error("error", error);
				});
		},
		stopToggl : function(id){
			return $http.put("/stopCurrentTask/"+id)
			.then(function(response){
				return response;
			}, function(error){
				console.log("error",error);
			});
		},
		newOrResumeToggl: function(time_entry){
			return 	$http.post("/resumeCurrentTask",time_entry)
			.then(function(response){
				//CLNUP: Create a function that does the below, or a helper somewhere.
				response.data.data.duration = Math.round((response.data.data.duration+(new Date().getTime())/1000)/60);
				return response;
			}, function(error){
				console.error("error",error);
			});
		}
	};
});

//Post-Gym
// NEXT: Duration is a Running Timer instead of a fixed value (and in hours:minutes form)
// NEXT: Stop current task when you click new
// Place in Chrome Ext (before working with Justin)

//CLNUP: You could broadcast from the factory based on any changes, using a getting/setter

//NOTE: The format only exists for data defined, so if it is not defined, like description, you will not have access to it
//FORMAT:
// { data:
//    { id: 220237503,
//      guid: '07a7c5b6-7a90-4e9a-b3a0-3d31d0fe72c1',
//      wid: 732811,
//      pid: 9302237,
//      billable: false,
//      start: '2015-04-15T20:20:25+00:00',
//      stop: '2015-04-15T20:20:30+00:00',
//      duration: 5,
//      description: 'Toggl Chrome Ext.',
//      duronly: false,
//      at: '2015-04-15T20:20:30+00:00',
//      uid: 1433757 } }