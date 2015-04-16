"use strict";

app.controller("WeekController", function($scope, WeekFactory) {
	$scope.projects;

	WeekFactory.getCurrentWeekSummary().then(function(response){
		$scope.projects = response.data;
	});
});