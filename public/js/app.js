angular.module('realm', ['ui.router', 'ngRoute', 'ui.bootstrap', 'ngSanitize'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/myStories');

        /*
        var StoryController = 'StoryController';
        var ItemController = 'ItemController';

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
            })
            .when('/myStories/:id/edit/addQuestItem', {
                templateUrl: 'partials/item/item-maintenance.html',
                controller: ItemController
            });

        //$routeProvider.otherwise({redirectTo: '/contatos'});

        */
    });