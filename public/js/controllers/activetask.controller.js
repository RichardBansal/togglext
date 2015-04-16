"use strict";

app.controller("ActivetaskController", function($rootScope, $scope,ActivetaskFactory){
	$scope.activetask;

	$scope.$on('active:resume',function(){
		console.log("yabadabadoo!");
		// $scope.active = ActivetaskFactory.active;
		console.log(ActivetaskFactory.data);
		$scope.activetask = ActivetaskFactory.data;
	});

	$rootScope.$on('createtask:completed',function(){
		$scope.activetask = ActivetaskFactory.data;
		$scope.active = ActivetaskFactory.active;
	});

	$rootScope.$on('task:stopped',function(){
		$scope.active = ActivetaskFactory.active;
	});

	ActivetaskFactory.getCurrentTask().then(function(response){
		if(response !== undefined){
			$scope.activetask = ActivetaskFactory.data = response.data.data;
			$scope.active = ActivetaskFactory.active = true;
		} else {
			$scope.active = ActivetaskFactory.active = false;
		}
		//REF: Move away from rootscope broadcasts, and use pass by reference
		// via factory instead
		$rootScope.$broadcast('active:data');
	});
});