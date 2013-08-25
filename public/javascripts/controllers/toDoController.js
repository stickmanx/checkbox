'use strict';

toDoApp.controller('ToDoController',
	function ToDoController($scope, $http, itemsData) {

		// get list of "To Do" (uncompleted) items on intial load -------
		itemsData.getItems(function(items) {
			console.log('getItems');
			$scope.items = items;
		});

		$scope.todo = {};
		// post new "To Do" item to database ----------------------------
		$scope.createToDo = function() {
			
			// client side, determine whether the to do item has been defined and is not blank
			if($scope.todo != '') {
				console.log("error");
			} else {
				console.log($scope.todo);
				$http({
					method: 'POST',
					url: '/todolist/create',
					data: $scope.todo
				}).
				success(function(data, status, headers, config) {
					console.log(data);
					// add to the current list without requerying the db
					$scope.items.push(data);

					// empty out the object after it has been posted
					$scope.todo = {};				
				}).
				error(function(data, status, headers, config) {
					console.log("Error");
				});
			}

		}

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
		}

		// delete "To Do" item -------------------------------------------
		$scope.deleteToDo = function(item) {
			// for debug
			console.log('deleteToDo()');
			console.log(item);
			// remove/hide from viewer without requerying the db
			item.completed = true;

			$http({
				method: 'POST',
				url: '/todolist/delete',
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
		}
		
	}
);