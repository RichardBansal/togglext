"use strict";

app.controller("TaskController", function($rootScope, $scope, $http, ActivetaskFactory) {
	$scope.newEntry = {};
	$scope.newEntry.project = "";
	$scope.newEntry.desc = "";

	$scope.submit = function(){
		//TODO:You need to stop the current task at some point before submit
		console.log("form submitted");
		console.log($scope.newEntry);
		$http.post("/createTask",{
		"time_entry":{
			"description":$scope.newEntry.desc,
			// CLNUP: ADD PROJECT, GRAB THIS INFOR BEFORE HAND
			// "pid":ActivetaskFactory.data.pid, 
			"created_with":"togglExt"
			}
		})
		.then(function(response){
			// console.log(response.data);
			response.data.data.duration = Math.round((response.data.data.duration+(new Date().getTime())/1000)/60);
			ActivetaskFactory.data = response.data.data;
			// $scope.active = ActivetaskFactory.active = true;
			// console.log(ActivetaskFactory.data);
			ActivetaskFactory.paused = false;
			$rootScope.$broadcast('createtask:completed');
		}, function(error){
			console.error("error",error);
		});
	};

});