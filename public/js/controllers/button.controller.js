"use strict";

app.controller("ButtonController", function($rootScope, $scope, $http, ActivetaskFactory){

	$scope.$on('active:data',function(){
		$scope.active = ActivetaskFactory.active;
	});

	$scope.stopToggl = function(){
		ActivetaskFactory.stopToggl(ActivetaskFactory.data.id).then(function(response){
			$scope.active = ActivetaskFactory.active = false;
		});
	};

	$scope.pauseToggl = function(){
		if(ActivetaskFactory.paused){
			$scope.resumeToggl();
		} else {
			ActivetaskFactory.stopToggl(ActivetaskFactory.data.id).then(function(response){
				ActivetaskFactory.paused = true;
			});
		}
	};

	//CLNUP: You need to have descript as required to be saved by the API
	//CLNUP: Both resume and play are the same functionality, except one is from memory and the other is from user input
	$scope.resumeToggl = function(){
		var time_entry = {"time_entry":
							{
								"description":ActivetaskFactory.data.description,
								"pid":ActivetaskFactory.data.pid,
								"created_with":"togglExt"
							}
						};
						
		ActivetaskFactory.newOrResumeToggl(time_entry).then(function(response){
				ActivetaskFactory.data = response.data.data;
				ActivetaskFactory.paused = false;
				$rootScope.$broadcast('active:resume');
		});
	};

	$scope.playToggl = function(){
		$scope.active = true;
		// console.log($scope.active);
	};

});