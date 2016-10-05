angular.module('realm', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function($routeProvider, $httpProvider) {

        $routeProvider
            .when('/myStories', {
                templateUrl: 'partials/story-list.html',
                controller: 'StoryResumeController'
            })
            .when('/myStories/add', {
                templateUrl: 'partials/story-register.html',
                controller: 'StoryController'
            })
            .when('/myStories/edit', {
                templateUrl: 'partials/story-edit.html',
                controller: 'StoryController'
            });

        //$routeProvider.otherwise({redirectTo: '/contatos'});
    });