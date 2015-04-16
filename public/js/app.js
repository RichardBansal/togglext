"use strict"

var app = angular.module("TogglExt",['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){

	// $urlRouterProvider.otherwise("/state1");
	// $urlRouterProvider.when('/', '/activetask');
	$stateProvider
		.state('week', {
			url: '/week',
			templateUrl: 'js/templates/week.html',
			controller: "WeekController"
		})
		.state('activetask',{ //CLNUP: Remove if not used
			url:'/activetask',
			templateUrl: 'js/templates/activetask.html',
			controller: "ActivetaskController"
		})
		.state('newtask',{ //CLNUP: Remove if not used
			url: '/newtask',
			templateUrl: 'js/templates/newtask.html',
			controller: "TaskController"
		})
});