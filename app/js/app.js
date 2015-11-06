var gesturesApp = angular.module('gesturesApp', [
	'ngRoute', 
	'gesturesServices', 
	'angular.filter', 
	'ui.select', 
	'checklist-model', 
	'toggle-switch',
	'ui.router',
	'ui.bootstrap',
	'ngResource',
	'angular-loading-bar',
	'darthwade.dwLoading',
	'angular-carousel',
	'youtube-embed',
	'rodrigoalves.microtext',
	'ngAnimate',
	'wu.masonry',
	'gesturesApp.templates',
	'chart.js'
]);

gesturesApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('cards', {
      url: "/",
      views: {
        "results": { templateUrl: "partials/cards.html" }
      }
    })
    .state('table', {
      url: "/table",
      views: {
        "results": { templateUrl: "partials/table.html" }
      }
    })
    .state('charts', {
      url: "/charts",
      views: {
        "results": { templateUrl: "partials/charts.html" }
      }
    })
});