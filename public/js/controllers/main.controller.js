"use strict"

app.controller("MainController", function($scope, $http){

	//note - this is only development testing to inject $http
	//and make a request to an external server
	//you are using your api key, this shouldn't be done for production


	console.log("testing Angular is working");

	//you may have to move this to the backend, and make a request from angular to your backend
	//maybe an issue of having CORs (calling an api from your front end)
	// $http.get("https://toggl.com/reports/api/v2/weekly?workspace_id=732811&user_agent=richard.bansal@gmail.com")
	// 	.then(
	// 		function(data){
	// 			console.log('data',data);
	// 		},
	// 		function(err){
	// 			console.log('error',err);
	// 		});
	// TODO Set a default weekly summary for current week
	// TODO Allow users to select week as well
	$scope.getWeeklyData = function(){
		$scope.projects = "";
		$http.get("/weekly")
			.then(function(response){
				console.log("data",response);
				$scope.projects = response.data;
			}, function(error){
				console.log("error",error);
			});
	};
	// $http.get("/weekly")
	// 	.then(function(data){
	// 		console.log('data',data);
	// 	},function(error){
	// 		console.log('error',error);
	// 	});
});