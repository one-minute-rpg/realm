// public/js/controllers/StoryController.js

angular.module('realm')
    .controller('StoryController',['$scope', '$q', '$uibModal', 'StoryService', function($scope, $q, $uibModal, StoryService) {

        $scope.storyResumes = [];
        $scope.story = {};
        $scope.messages = [];

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
            var promise = StoryService.save($scope.story);

            $q.when(promise)
                .then(addAlert)
                .then(clear)
                .catch(function(error){
                    console.log(error);
                });
        };

        function search() {
            var promise = StoryService.find();

            $q.when(promise)
                .then(loadStories)
                .catch(function(error) { console.log(error) });
        };

        function loadStories(stories) {
            $scope.storyResumes = stories;
        };

        function clear(){
            $scope.story = {};
        }

        function addAlert(res){
            if(res.status == 201){
                $scope.messages.push({ type: 'success', msg: 'Salvo com sucesso!'});
            }
        }

        $scope.init();
    }])
    .controller('StoryModalController', ['$scope', 'resumedStory', function($scope, resumedStory) {
        $scope.resume = resumedStory;
    }]);