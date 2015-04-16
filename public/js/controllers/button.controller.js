"use strict";

app.controller("ButtonController", function($rootScope, $scope, $http, ActivetaskFactory){

	//CLNUP: below listener, maybe use an event emitter
	// while(ActivetaskFactory.set === false){
	// 	//wait until it is set, to set button
	// }

	// $scope.active = ActivetaskFactory.active;
	// console.log($scope.active);

	//initial scope.active variable is assumed true for testing
	// $scope.active = ActivetaskFactory.active;
	// $scope.active = true;
	$scope.$on('active:data',function(){
		$scope.active = ActivetaskFactory.active;
	});

	// $scope.stopToggl = function(){
	// 	$scope.active = false;
	// 	console.log($scope.active);
	// };

	$scope.stopToggl = function(){
		// console.log('clicked stop');
		// console.log(ActivetaskFactory.activetaskID);
		//CLNUP: below line
		$http.put("/stopCurrentTask/"+ActivetaskFactory.data.id)
			.then(function(response){
				// console.log('response received');
				$scope.active = ActivetaskFactory.active = false;
				// $scope.active.apply();
				console.log(ActivetaskFactory.active);
			}, function(error){
				console.log("error",error);
			});
	};

	$scope.pauseToggl = function(){
		// $scope.active = true;
		// console.log($scope.active);
		//CLNUP: replace pause with stop if you don't plan to use it for anything
		if(ActivetaskFactory.paused){
			$scope.resumeToggl();
		} else {
		$http.put("/stopCurrentTask/"+ActivetaskFactory.data.id)
			.then(function(response){
				console.log(ActivetaskFactory.active);
				ActivetaskFactory.paused = true;
				console.log(ActivetaskFactory)
			}, function(error){
				console.log("error",error);
			});
		}
	};

	//CLNUP: You need to have descript as required to be saved by the API
	//CLNUP: Both resume and play are the same functionality, except one is from memory and the other is from user input
	$scope.resumeToggl = function(){
		// $scope.active = true;
		// console.log($scope.active);
		console.log('resume',ActivetaskFactory);
		$http.post("/resumeCurrentTask",{
			"time_entry":{
				"description":ActivetaskFactory.data.description,
				"pid":ActivetaskFactory.data.pid,
				"created_with":"togglExt"
				}
			})
			.then(function(response){
				// console.log(response.data);
				response.data.data.duration = Math.round((response.data.data.duration+(new Date().getTime())/1000)/60);
				$scope.activetask = response.data;
				ActivetaskFactory.data = response.data.data;
				ActivetaskFactory.paused = false;
				$rootScope.$broadcast('active:data');
			}, function(error){
				console.error("error",error);
			});
	};

	$scope.playToggl = function(){
		$scope.active = true;
		console.log($scope.active);
	};

});