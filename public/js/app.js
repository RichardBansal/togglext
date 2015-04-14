"use strict"

var app = angular.module("TogglExt",['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('week', {
			url: '/week',
			templateUrl: 'js/templates/week.html',
			controller: function($scope, $http) {
				//TODO: getWeeklyData should be in a factory
				function getWeeklyData(){
					$scope.projects = "";
					$http.get("/weekly")
						.then(function(response){
							console.log("data",response);
							$scope.projects = response.data;
						}, function(error){
							console.log("error",error);
						});
				};

				getWeeklyData();
			}
		})
});