'use strict';

toDoApp.controller('completedController',
	function ToDoController($scope, $http, itemsData) {

		// get list of "To Do" (uncompleted) items on intial load -------
		itemsData.getCompletedItems(function(items) {
			console.log('getItems');
			$scope.completedItems = items;
		});

		// update "To Do" item ------------------------------------------
		$scope.toggleToDo = function(item) {
			console.log('updateToDo()');
			console.log(item);
			$http({
				method: 'POST',
				url: '/todolist/toggle_to_do',
				data: item
			}).
			success(function(data, status, headers, config) {
				console.log('success post');
			}).
			error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});	

			// refreshes the "To Do List Items" after posting ----------- Refactor
			// itemsData.getCompletedItems(function(items) {
			// 	console.log('getCompletedItems()');
			// 	$scope.completedItems = items;
			// });
		}

		// delete "To Do" item -------------------------------------------
		$scope.deleteToDo = function(item) {
			console.log('deleteToDo()');
			item.completed = false;
			$http({
				method: 'POST',
				url: '/todolist/delete',
				data: item
			});
		}
		
	}
);