"use strict";

app.controller("MainController", function($scope){
	// console.log("testing Angular is working");
	$scope.weekSummary = false;
	$scope.createTimer = false;

	$scope.showWeek = function(){
		$scope.weekSummary = !$scope.weekSummary;
		return $scope.weekSummary;
	};

	$scope.newTask = function(){
		$scope.createTimer = !$scope.createTimer;
		return $scope.createTimer;
	};

});