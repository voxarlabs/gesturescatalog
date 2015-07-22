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