
angular.module('realm', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function($routeProvider, $httpProvider) {

        $routeProvider
        .when('/myStories', {
            templateUrl: 'partials/story-list.html',
            controller: 'StoryController'
        })
        .when('/myStories/add',{
            templateUrl: 'partials/story-register.html',
            controller: 'StoryController'
        });

        //$routeProvider.otherwise({redirectTo: '/contatos'});
    });