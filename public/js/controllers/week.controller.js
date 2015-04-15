"use strict";

app.controller("WeekController", function($scope, $http) {
//CLNUP: getWeeklyData should be in a factory, not controlle
	$scope.projects;
	$http.get("/weekly")
		.then(function(response){
			$scope.projects = response.data;
		}, function(error){
			console.log("error", error);
		});
});