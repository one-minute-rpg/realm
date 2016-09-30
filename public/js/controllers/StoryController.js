// public/js/controllers/StoryController.js

angular.module('realm')
    .controller('StoryController', function($scope, $q, $uibModal, StoryService) {

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
            StoryService.save($scope.story);
        };

        function search() {

            var promise = StoryService.find();

            $q.when(promise)
                .then(loadStories)
                .catch(function(error) { console.log(error) });

            /*
            StoryService.query(function(stories) {
                    $scope.storyResumes = stories;
                },
                function(error) {
                    console.log("Não foi possível carregar as histórias") /
                        console.log(error);
                });
            */
        };

        function loadStories(stories) {
            console.log(stories);
            $scope.storyResumes = stories;
        };

        $scope.init();
    })
    .controller('StoryModalController', function($scope, resumedStory) {
        $scope.resume = resumedStory;
        console.log(resumedStory);
    });