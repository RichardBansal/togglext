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
	$scope.active = true;
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
				ActivetaskFactory.active = false;
				$scope.active = ActivetaskFactory.active;
				// $scope.active.apply();
				console.log(ActivetaskFactory.active);
			}, function(error){
				console.log("error",error);
			});
	};

	$scope.pauseToggl = function(){
		$scope.active = true;
		console.log($scope.active);
	}

	$scope.resumeToggl = function(){
		$scope.active = true;
		console.log($scope.active);
	}

	$scope.playToggl = function(){
		$scope.active = true;
		console.log($scope.active);
	}

});