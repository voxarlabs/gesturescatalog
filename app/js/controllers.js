gesturesApp.controller('GesturesListCtrl', ['Gestures', '$scope', '$state', '$filter', '$modal', 'dwLoading',
	function(gestures, $scope, $state, $filter, $modal, $loading){

		$scope.$state = $state;

		$scope.gestures = [];

		$scope.filteredGestures = [];

		$scope.schema = {};

		$scope.schemaList = [];

		$scope.columns = [];

		$scope.criteria = {};

		$scope.sorting = '';

		$scope.sortingReverse = false;

		$scope.displayMode = 'list';

		$scope.currentPage = 1;

		$scope.itemsPerPage = 10;

		$scope.showSidebar = true;

		$scope.currentBreakpoint = 'lg';

		$loading.start('data');

		$scope.charts = [];

		$scope.chartBuilder = {
			'x' : 'production',
			'y' : 'input',
			'type' : 'bar',
			'qty' : false
		};

		gestures.all(function(data, tabletop){
			$scope.$apply(function(){

				var schemasRow = data[0]; // Row with column configuration

				data = data.slice(1); // Rest of the data

				$scope.schema = parseSchemas(schemasRow, data);

				$scope.schemaList = toList($scope.schema);

				console.log($scope.schema);

				for(var i in $scope.schema){
					if($scope.schema[i]['sortable']){
						$scope.sorting = $scope.schema[i];
						break;
					}
				}

				$scope.gestures = parseData(data, $scope.schema);

				$scope.filteredGestures = $scope.gestures;

				$scope.updateColumns();

				$scope.charts[0] = generateChart('production', 'input', 'bar', false);

				$scope.updateChart();

				$loading.finish('data');

			});
		})

		function generateChart(x, y, type, qty){
			var chart = {
				type: type,
				data: [],
				labels: $scope.schema[x]['filter']['options'].sort(),
				series: $scope.schema[y]['filter']['options']
			};

			if(qty){
				chart.series = ['Total']
			}

			for(var i in chart.series){
				chart.data.push([]);
				for(var j in chart.labels){
					chart.data[i].push(0);
					var pattern = {};
					pattern[x] = chart.labels[j];
					if(!qty)
						pattern[y] = chart.series[i];
					chart.data[i][j] = $filter('filter')($scope.filteredGestures, pattern).length
				}
			}

			return chart;
		}

		$scope.updateChart = function updateChart(){
			$scope.chartBuilder.chart = generateChart($scope.chartBuilder.x, $scope.chartBuilder.y, $scope.chartBuilder.type, $scope.chartBuilder.qty);
			console.log($scope.chartBuilder);
		}

		$scope.addChart = function addChart(){
			$scope.charts.push($.extend({}, $scope.chartBuilder.chart));
		}

		$scope.removeChart = function removeChart(i){
			$scope.charts.splice(i, i+1);
		}

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
				}else if(filter.input == 'tag'){
					if($scope.criteria[schema.field] && $scope.criteria[schema.field].length > 0)
						$scope.filteredGestures = $filter('inArrayTag')($scope.filteredGestures, $scope.criteria[schema.field], schema.field);
				}
			}

			$scope.currentPage = 1;

		}


		$scope.doSort = function doSort(field){
			$scope.sorting = $scope.schema[field];
			$scope.filteredGestures = $filter('orderBy')($scope.filteredGestures, field, $scope.sortingReverse);

			$scope.currentPage = 1;
			$scope.updatePaging();
		}

		$scope.setSortReverse = function setSortReverse(reverse){
			$scope.sortingReverse = reverse;
			$scope.doSort($scope.sorting.field);
		}

		$scope.clearFilter = function clearFilter(){
			$scope.criteria = {};
			$scope.doFilter();
		}

		$scope.updatePaging = function updatePaging(){
			var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
		    var end = begin + $scope.itemsPerPage;

		    $scope.pageGestures = $scope.filteredGestures.slice(begin, end);
		}

		$scope.$watch("currentPage + filteredGestures.length", $scope.updatePaging);

		$scope.updateColumns = function updateColumns(){
			$scope.columns = [];
			for(var key in $scope.schema){
				if($scope.schema[key].visibility)
					$scope.columns.push(key);
			}
		}

		$scope.showDetails = function showDetails(id){
			var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'partials/details.html',
		      controller: 'GesturesDetailsCtrl',
		      size: 'lg',
		      scope: $scope,
		      resolve: {
		        item: function () {
		          return $scope.gestures[id-2];
		        }
		      }
		    });
		}

		$scope.updateCardDisplay = function updateCardDisplay(){
			if($scope.currentBreakpoint == 'lg'){
				if($scope.showSidebar){
					$scope.singleResultWidth = $scope.resultsWidth*0.235;
				}else{
					$scope.singleResultWidth = $scope.resultsWidth*0.19;
				}
			}else if($scope.currentBreakpoint == 'md'){
				$scope.singleResultWidth = $scope.resultsWidth*0.24;
			}else if($scope.currentBreakpoint == 'sm'){
				$scope.singleResultWidth = $scope.resultsWidth*0.47;
			}else if($scope.currentBreakpoint == 'xs'){
				$scope.singleResultWidth = $scope.resultsWidth;
			}
			$scope.itemsPerPage = Math.floor($scope.resultsWidth/$scope.singleResultWidth)*3;
			console.log('Organizing  (' + $scope.showSidebar + ')' + $scope.resultsWidth + '/' + $scope.singleResultWidth +' with ' + $scope.itemsPerPage + " items per page");
		}

		$scope.$watch("resultsWidth", $scope.updateCardDisplay);

		$scope.$on("windowResize", function(event, current, previous){
			$scope.currentBreakpoint = current;
			$scope.updateCardDisplay();
		});


}]);


gesturesApp.controller('GesturesDetailsCtrl', ['Gestures', '$scope', '$state', 'dwLoading', 'item',
	function(gestures, $scope, $state, $loading, item){
		
		$scope.item = item;

	}
]);