var gesturesApp = angular.module('gesturesApp', ['ngRoute', 'gesturesServices', 'angular.filter', 'ui.select', 'checklist-model', 'angular.vertilize']);

gesturesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/cards.html',
        controller: 'GesturesListCtrl'
      })
  }]);