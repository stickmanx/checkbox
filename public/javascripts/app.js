'use strict';

var toDoApp = angular.module('toDoApp', ['ngRoute', 'ngAnimate']).
	config(function($routeProvider) {
		$routeProvider
			.when('/todo/',
				{
					controller: 'ToDoController',
					templateUrl: '../partials/todo.html'
				})
			.when('/completed/',
				{
					controller: 'ToDoController',
					templateUrl: '../partials/completed.html'
				})
			.when('/about/',
				{
					controller: 'ToDoController',
					templateUrl: '../partials/about.html'
				})
			.otherwise({ redirectTo: '/todo/' });
	});