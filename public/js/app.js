
angular.module('realm', ['ngRoute', 'ngResource', 'myComponents'])
    .config(function($routeProvider, $httpProvider) {

        $routeProvider
        .when('/stories', {
            templateUrl: 'partials/storiesList.html',
            controller: 'StoryController'
        });

        //$routeProvider.otherwise({redirectTo: '/contatos'});
    });