"use strict";

app.factory("WeekFactory", function($http){
	return {
		getCurrentWeekSummary: function(){
			return $http.get("/weekly")
				.then(function(response){
					return response;
				}, function(error){
					console.log("error",error);
				});
		}
	};
});