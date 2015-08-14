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
		template: '<div style="position:relative; overflow: hidden;  width: {{ playerWidth }}px; height: {{ playerHeight }}px">' +
						'<img style="transform: scale(1.7); width: 100%; height: 100%;" src="http://i.ytimg.com/vi/{{ videoId }}/hqdefault.jpg" class="thumb">' +
						'<a href="" style="display:block; width: 50px; opacity: 0.7; height: 50px; background: url(img/play.png) no-repeat; background-size: cover; position: absolute; top: 50%; margin-top: -25px; left: 50%; margin-left: -25px"></a>' +
					'</div>',
		link: function(scope, elem, attrs){
			$(elem).click(function(e){
  				var html = '<iframe id="ytplayer" type="text/html"' +
  							'width="' + scope.playerWidth +'" ' +
  				 			'height="' + scope.playerHeight +'" ' +
  				 			'src="http://www.youtube.com/embed/' + scope.videoId + '?autoplay=1" ' +
  				 			'frameborder="0"/>';
	            elem.replaceWith(html);
			});
		}
	}
})
