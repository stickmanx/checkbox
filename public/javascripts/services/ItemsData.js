'use strict';

toDoApp.factory('itemsData', function($http) {
	return {
		getItems: function (successcb) {
			console.log("get 'To Do' list");
			$http({ method: 'GET', url: '/todolist/items'
			}).
			success(function (data, status, headers, config) {
				console.log(data);
				successcb(data);
			}).
			error(function (data, status, headers, config) {
				console.log('get to do list ERROR');
			});
		},
		getCompletedItems: function(successcb) {
			console.log("get completed items");
			$http({ method: 'GET', url: '/todolist/completed_items'
			}).
			success(function (data, status, headers, config) {
				console.log(data);
				successcb(data);
			}).
			error(function (data, status, headers, config) {
				console.log('get to do list ERROR');
			});			
		}
	};
});