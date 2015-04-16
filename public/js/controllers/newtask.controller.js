"use strict";

app.controller("TaskController", function($rootScope, $scope, $http, ActivetaskFactory) {
	$scope.newEntry = {};
	$scope.newEntry.project = "";
	$scope.newEntry.desc = "";

	$scope.submit = function(){
		var time_entry = {"time_entry":
							{
								"description":$scope.newEntry.desc,
								// CLNUP: ADD PROJECT, GRAB THIS INFOR BEFORE HAND
								// "pid":ActivetaskFactory.data.pid, 
								"created_with":"togglExt"
							}
						};
						
		ActivetaskFactory.newOrResumeToggl(time_entry).then(function(response){
				ActivetaskFactory.data = response.data.data;
				ActivetaskFactory.paused = false;
				$rootScope.$broadcast('createtask:completed');
		});
	};

});