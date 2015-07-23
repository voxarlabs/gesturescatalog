var gesturesApp = angular.module('gesturesApp', [
	'ngRoute', 
	'gesturesServices', 
	'angular.filter', 
	'ui.select', 
	'checklist-model', 
	'angular.vertilize',
	'toggle-switch',
	'ui.router'
]);

// gesturesApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/', {
//         templateUrl: 'partials/cards.html'
//       }).
//       when('/table', {
//         templateUrl: 'partials/table.html'
//       })
//   }]);


gesturesApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('cards', {
      url: "/",
      templateUrl: "partials/cards.html"
    })
    .state('table', {
      url: "/table",
      templateUrl: "partials/table.html"
    })
});