"use strict";

app.controller("TaskController", function($rootScope, $scope, $http, ActivetaskFactory) {
	$scope.newEntry = {};
	$scope.newEntry.project = "Select Project";
	$scope.newEntry.desc = "Enter Description";

	$rootScope.$on('task:stopped',function(){
		$scope.active = ActivetaskFactory.active;
	});

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
				$scope.active = ActivetaskFactory.active = true;
				$rootScope.$broadcast('createtask:completed');
		});
	};

});