gesturesApp.controller('GesturesListCtrl', ['Gestures', '$scope', '$filter', '$modal', 'dwLoading',
	function(gestures, $scope, $filter, $modal, $loading){

		$scope.gestures = [];

		$scope.filteredGestures = [];

		$scope.schema = {};

		$scope.schemaList = [];

		$scope.criteria = {};

		$scope.displayMode = 'list';

		$loading.start('data');

		$scope.currentPage = 1;

		gestures.all(function(data, tabletop){
			$scope.$apply(function(){

				var schemasRow = data[0]; // Row with column configuration

				data = data.slice(1); // Rest of the data

				$scope.schema = parseSchemas(schemasRow, data);

				$scope.schemaList = toList($scope.schema);

				$scope.gestures = data;

				$scope.filteredGestures = $scope.gestures;

				$loading.finish('data');

			});
		})

		$scope.doFilter = function doFilter(){
			$scope.filteredGestures = $scope.gestures;
			for(var i in $scope.schema){
				var schema = $scope.schema[i];
				var filter = schema.filter;

				if(filter.input == 'text-field'){
					var pattern = {};
					pattern[schema.field] = $scope.criteria[schema.field];
					$scope.filteredGestures = $filter('filter')($scope.filteredGestures, pattern);
				}else if(filter.input == 'select' || filter.input == 'checkbox'){
					if($scope.criteria[schema.field] && $scope.criteria[schema.field].length > 0)
						$scope.filteredGestures = $filter('inArray')($scope.filteredGestures, $scope.criteria[schema.field], schema.field);
				}
			}

			$scope.currentPage = 1;

		}

		$scope.clearFilter = function clearFilter(){
			$scope.criteria = {};
			$scope.doFilter();
		}

		$scope.$watch("currentPage + filteredGestures.length", function(){
			var begin = (($scope.currentPage - 1) * 10);
		    var end = begin + 10;

		    $scope.pageGestures = $scope.filteredGestures.slice(begin, end);
		});


}]);