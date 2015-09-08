gesturesApp.directive("filterDrawer", function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $(elem).click(function(e) {
                $(elem).closest('.filter').toggleClass('visible');
      			e.preventDefault();
            });
        }
    }
});

gesturesApp.directive("getWidth", ['$window', function($window){
	return {
		restrict: "EA",
		scope: false,
		link: function(scope, elem, attrs){

			scope[attrs.ngModel] = elem[0].offsetWidth;

			var window = angular.element($window);

			scope.$watch(function(){
				return elem[0].offsetWidth; 
			}, function(newValue, oldValue){
				scope[attrs.ngModel] = newValue;
			});

            window.bind('resize', function(){
	         	scope[attrs.ngModel] = elem[0].offsetWidth;
	            scope.$digest();
	        });

		}
	}
}])

gesturesApp.directive("youtubeThumb", function($compile){
	return {
		restrict: "E",
		scope: {
			videoId: "=",
			playerWidth: "=",
			playerHeight: "="
		},
        template: '<div class="aspect-ratio" style="overflow: hidden; background-image: url(http://i.ytimg.com/vi/{{ videoId }}/hqdefault.jpg); background-size: 170%; background-position: 50%;">' 
                         +'<a href="" style="display:block; width: 50px; opacity: 0.7; height: 50px; background: url(img/play.png) no-repeat; background-size: cover; position: absolute; top: 50%; margin-top: -25px; left: 50%; margin-left: -25px"></a>' +
                    '</div>',
		link: function(scope, elem, attrs){
			$(elem).click(function(e){
  				var html = '<div class="aspect-ratio"><iframe id="ytplayer" type="text/html" style="position: absolute; height: 100%; width: 100%"' +
  				 			'src="http://www.youtube.com/embed/' + scope.videoId + '?autoplay=1&autohide=1&showinfo=0" ' +
  				 			'frameborder="0" allowfullscreen=""/></div>';
	            elem.replaceWith(html);
			});
		}
	}
});

gesturesApp.directive('bsBreakpoint', function($window, $rootScope, $timeout) {
    return {
        controller: function() {
            var getBreakpoint = function() {
                var windowWidth = $window.innerWidth;

                if(windowWidth < 768) {
                    return 'xs';
                } else if (windowWidth >= 768 && windowWidth < 992) {
                    return 'sm';
                } else if (windowWidth >= 992 && windowWidth < 1200) {
                    return 'md';
                } else if (windowWidth >= 1200) {
                    return 'lg';
                }   
            };  

            var currentBreakpoint = getBreakpoint();
            var previousBreakpoint = null;

            // Broadcast inital value, so other directives can get themselves setup
            $timeout(function() {
                $rootScope.$broadcast('windowResize', currentBreakpoint, previousBreakpoint);
            }); 

            angular.element($window).bind('resize', function() {
                var newBreakpoint = getBreakpoint();

                if (newBreakpoint != currentBreakpoint) {
                    previousBreakpoint = currentBreakpoint;
                    currentBreakpoint = newBreakpoint;
                }   

                $rootScope.$broadcast('windowResize', currentBreakpoint, previousBreakpoint);
            }); 
        }
    };
});

