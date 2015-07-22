var gesturesApp = angular.module('gesturesApp', ['gesturesServices', 'angular.filter', 'ui.select', 'checklist-model', 'angular.vertilize']);

gesturesApp.controller('GesturesListCtrl', ['Gestures', '$scope', '$filter', 
	function(gestures, $scope, $filter){

		$scope.gestures = [];

		$scope.filteredGestures = [];

		$scope.availableTasks = [];

		$scope.criteria = {}

		$scope.filters = {}

		gestures.all(function(data, tabletop){
			$scope.$apply(function(){

				$scope.filters = parseFilters(data);

				$scope.gestures = data.slice(1);

				$scope.filteredGestures = $scope.gestures;

				for(f in $scope.filters){
					if($scope.filters[f].input == "checkbox"){
						$scope.criteria[$scope.filters[f].field] = [];
					}
				}

			});
		})

		$scope.doFilter = function doFilter(){
			$scope.filteredGestures = $scope.gestures;
			for(i in $scope.filters){
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

			console.log($scope.criteria['telekinesis'])

		}

	}
]);

