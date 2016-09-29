
angular.module('realm', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function($routeProvider, $httpProvider) {

        $routeProvider
        .when('/stories', {
            templateUrl: 'partials/story-list.html',
            controller: 'StoryController'
        })
        .when('/story/add',{
            templateUrl: 'partials/story-register.html',
            controller: 'StoryController'
        });

        //$routeProvider.otherwise({redirectTo: '/contatos'});
    });