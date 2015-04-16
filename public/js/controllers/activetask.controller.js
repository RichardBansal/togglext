"use strict";

app.controller("ActivetaskController", function($rootScope, $scope,$http, ActivetaskFactory){
	$scope.activetask;

	$scope.$on('active:resume',function(){
		console.log("yabadabadoo!");
		// $scope.active = ActivetaskFactory.active;
		console.log(ActivetaskFactory.data);
		$scope.activetask = ActivetaskFactory.data;
	});

	$rootScope.$on('createtask:completed',function(){
		$scope.activetask = ActivetaskFactory.data;
	});

	$http.get("/currentTask")
		.then(function(response){
			// console.log("data", response);
			if(response.data.data !== null){
				//CLNUP: Place this in a helper or factor, not on the front end
				response.data.data.duration = Math.round((response.data.data.duration+(new Date().getTime())/1000)/60);
				// $scope.activetask = response.data;
				// console.log($scope.activetask);
				// console.log(response.data.data.id); //220215309
				//CLNUP: You should only have response.data, not .data.data
				$scope.activetask = ActivetaskFactory.data = response.data.data;
				$scope.active = ActivetaskFactory.active = true;
				// console.log(ActivetaskFactory);
			} else {
				$scope.active = ActivetaskFactory.active = false;
			}
			$rootScope.$broadcast('active:data');
		}, function(error){
			console.error("error", error);
		});
});