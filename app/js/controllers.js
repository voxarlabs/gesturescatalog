gesturesApp.controller('GesturesListCtrl', ['Gestures', '$scope', '$filter', 
	function(gestures, $scope, $filter){

		$scope.gestures = [];

		$scope.filteredGestures = [];

		$scope.availableTasks = [];

		$scope.criteria = {};

		$scope.filters = {};

		$scope.visibility = {};

		$scope.filtersList = [];

		$scope.displayMode = 'list';

		gestures.all(function(data, tabletop){
			$scope.$apply(function(){

				var filterRow = data[0]; // Row with column configuration

				data = data.slice(1); // Rest of the data

				data = data.slice(200); // TODO: REMOVE THIS

				$scope.filters = parseFilters(filterRow, data);

				$scope.filtersList = toList($scope.filters);

				$scope.gestures = data;

				$scope.filteredGestures = $scope.gestures;

				for(var i in $scope.filters){
					var filter = $scope.filters[i];
					$scope.visibility[filter.field] = filter.visibility;
				}

			});
		})

		$scope.doFilter = function doFilter(){
			$scope.filteredGestures = $scope.gestures;
			for(var i in $scope.filters){
				var filter = $scope.filters[i];
				var pattern = {};

				if(filter.type == 'text' && filter.input == 'text-field'){
					pattern[filter.field] = $scope.criteria[filter.field];
					$scope.filteredGestures = $filter('filter')($scope.filteredGestures, pattern);
				}else if(filter.type == 'text' && (filter.input == 'select' || filter.input == 'checkbox')){
					if($scope.criteria[filter.field] && $scope.criteria[filter.field].length > 0)
						$scope.filteredGestures = $filter('inArray')($scope.filteredGestures, $scope.criteria[filter.field], filter.field);
				}
			}
		}

		$scope.clearFilter = function clearFilter(){
			$scope.criteria = {};
			$scope.doFilter();
		}

	}
]);

