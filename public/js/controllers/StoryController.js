// public/js/controllers/StoryController.js

angular.module('realm')
    .controller('StoryController', function($scope, StoryService, $uibModal) {

        $scope.storyResumes = [];
        $scope.story = {};

        $scope.init = search;
        $scope.detail = detail;
        $scope.save = save;

        function detail(story) {
            $uibModal.open({
                templateUrl: 'js/directives/components/modal/modal-historia.template.html',
                controller: 'StoryModalController',
                resolve: {
                    resumedStory: story
                }
            });
        };

        function save() {
            StoryService.saveStory($scope.story);
        };

        function search() {
            StoryService.query(function(stories) {
                    $scope.storyResumes = stories;
                },
                function(error) {
                    console.log("Não foi possível carregar as histórias") /
                        console.log(error);
                });
        };

        $scope.init();
    })
    .controller('StoryModalController', function($scope, resumedStory) {
        $scope.resume = resumedStory;
    });