"use strict";

app.controller("ActivetaskController", function($rootScope, $scope,$http, ActivetaskFactory){
	$scope.activetask;
	$http.get("/currentTask")
		.then(function(response){
			// console.log("data", response);
			if(response.data.data !== null){
				//CLNUP: Place this in a helper or factor, not on the front end
				response.data.data.duration = Math.round((response.data.data.duration+(new Date().getTime())/1000)/60);
				$scope.activetask = response.data;
				// console.log(response.data.data.id); //220215309
				ActivetaskFactory.data = response.data.data;
				ActivetaskFactory.active = true;
				// console.log(ActivetaskFactory.active);
			} else {
				$scope.activetask = null;
				ActivetaskFactory.active = false;
			}
			$rootScope.$broadcast('active:data',true);
			console.log('fired');
		}, function(error){
			console.log("error", error);
		});
});