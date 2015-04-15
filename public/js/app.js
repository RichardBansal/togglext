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
		.state('activetask',{ //TODO: Remove if not used
			url:'/activetask',
			templateUrl: 'js/templates/activetask.html',
			controller: "ActivetaskController"
		})
		.state('newtask',{
			
		})
});