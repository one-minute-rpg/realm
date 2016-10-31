angular.module('realm', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngSanitize'])
    .config(function($routeProvider, $httpProvider) {

        var StoryController = 'StoryController';

        $routeProvider
            .when('/myStories', {
                templateUrl: 'partials/story-list.html',
                controller: StoryController
            })
            .when('/myStories/add', {
                templateUrl: 'partials/story-maintenance.html',
                controller: StoryController
            })
            .when('/myStories/:id/edit', {
                templateUrl: 'partials/story-maintenance.html',
                controller: StoryController
            });

        //$routeProvider.otherwise({redirectTo: '/contatos'});
    });