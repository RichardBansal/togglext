"use strict";

app.controller("ActivetaskController", function($scope,$http){
	$scope.activetask;
	$http.get("/currentTask")
		.then(function(response){
			console.log("data", response);
			$scope.activetask = response.data;
		}, function(error){
			console.log("error", error);
		});
});