gesturesApp.controller('GesturesListCtrl', ['Gestures', '$scope', '$state', '$filter', 'dwLoading',
	function(gestures, $scope, $state, $filter, $loading){

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
			'type' : 'column',
			'qty' : false,
			'chart' : {},
			'useThreshold': true,
			'threshold': 10,
			'useMerge': true,
			'merge': 4
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

				$scope.updateChart();

				$scope.addChart();

				$loading.finish('data');

			});
		});

		function generateChart(x, y, type, qty, useThreshold, threshold, useMerge, merge){
			var config = {
				options: {
					chart: {
						'type': type
					},
				},
				title: {
				 	text: 'Sci-Fi Gestures - ' + x + " vs. " + y
				},
				subtitle: {
		            text: ''
		        },
				xAxis: {
					title: {text: x},
					categories: $scope.schema[x]['filter']['options'].sort()
				},
				yAxis: {
					title: {text: y}
				},
				tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
				series: [],
			};

			if(qty){
				config.yAxis.title.text = 'Number of items';
				config.series.push({
					name: 'Total',
					data: []
				});
				for(var i in config.xAxis.categories){
					var pattern = {};
					pattern[x] = config.xAxis.categories[i];
					config.series[0].data.push($filter('filter')($scope.filteredGestures, pattern).length)
				}
			}else{

				var series = $scope.schema[y]['filter']['options'];
				var labels = config.xAxis.categories;

				var offset = 0;

				if(useThreshold && threshold){
					config.subtitle.text = "Categories with less than " + threshold + " items are included in 'Other'";
					config.series.push({
						name: 'Other',
						data: []
					});
					offset = 1;
					for(var i=0; i < labels.length; i++) config.series[0].data.push(0);
				}

				var seriesToKeep = {
					'Other': true
				};
				

				for(var i=0; i < series.length;i++){
					
					seriesToKeep[series[i]] = false;

					config.series.push({
						name: series[i],
						data: []
					});

					for(var j=0; j < labels.length; j++){
						var pattern = {};
						pattern[x] = labels[j];
						pattern[y] = series[i];
						var count = $filter('filter')($scope.filteredGestures, pattern).length;
						config.series[i+offset].data.push(null);
						if(useThreshold && count < threshold){
							config.series[0].data[j] += count;
						}else{
							config.series[i+offset].data[j] = count;
							if(count > 0) seriesToKeep[series[i]] = true;
						}
					}
				}

				for(var i=0; i < config.series.length; i++){
					if(!seriesToKeep[config.series[i].name]){
						config.series.splice(i, 1);
						i--;
					}
				}

			}

			if(useMerge && merge && $scope.schema[$scope.chartBuilder.x].type == 'numeric'){

				var mg = mergeData(config, merge);

				config.xAxis.categories = mg[0];
				for(var i in config.series){
					config.series[i].data = mg[1][i];
				}

			}

			return config;
		}

		function mergeData(config, merge){
			var categories = config.xAxis.categories;

			var newCategories = [];
			var init = parseInt(categories[0]);

			var newSeries = [];
			for(var i=0; i < config.series.length; i++) newSeries.push([0]);

			var i=0;
			var j=0;
			while(i < categories.length){
			    
			    var end = parseInt(categories[i]);
			    
			    if(end <= init + merge - 1){
			        for(var k=0; k < newSeries.length; k++){
			        	newSeries[k][j] += config.series[k].data[i]; 
			        }
			        i++;
			    }else{
			        newCategories.push(init + " - " + (init+merge-1));
			        init = init+merge;
			        j++;
			        for(var l=0; l < config.series.length; l++) newSeries[l].push(0);
			    }
			 
			}

			newCategories.push(init + " - " + categories[categories.length-1]);

			return [newCategories, newSeries];
		}

		$scope.updateChart = function updateChart(){
			$scope.chartBuilder.chart = generateChart($scope.chartBuilder.x, 
				$scope.chartBuilder.y, $scope.chartBuilder.type, 
				$scope.chartBuilder.qty, $scope.chartBuilder.useThreshold, 
				$scope.chartBuilder.threshold, $scope.chartBuilder.useMerge,
				$scope.chartBuilder.merge);
			console.log($scope.chartBuilder);
		}

		$scope.updateAllCharts = function updateAllCharts(){
			for(var i in $scope.charts){
				var c = $scope.charts[i];
				$scope.charts[i].chart = generateChart( c.x, c.y, c.type, c.qty, 
					c.useThreshold, c.threshold, c.useMerge, c.merge);
			}
			$scope.updateChart();
		}

		$scope.addChart = function addChart(){
			$scope.charts.push($.extend({}, $scope.chartBuilder));
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
			$scope.updateAllCharts();

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