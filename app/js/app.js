var gesturesApp = angular.module('gesturesApp', [
	'ngRoute', 
	'gesturesServices', 
	'angular.filter', 
	'ui.select', 
	'checklist-model', 
	'angular.vertilize',
	'toggle-switch',
	'ui.router',
	'ui.bootstrap',
	'ngResource',
	'angular-loading-bar',
	'darthwade.dwLoading',
	'angular-carousel',
	'youtube-embed',
	'rodrigoalves.microtext'
]);

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