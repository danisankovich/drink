var app = angular.module('Drinks', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('/', { url: '/', templateUrl: 'views/home.ejs', controller: 'mainCtrl' })
  .state('saved', { url: '/saved', templateUrl: 'views/saved.ejs', controller: 'savedCtrl' })
}]);
