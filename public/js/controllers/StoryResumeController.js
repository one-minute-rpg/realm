angular.module('realm')
    .controller('StoryResumeController', ['$scope', '$q', '$uibModal', 'StoryResumeService', function($scope, $q, $uibModal, StoryResumeService) {

        var service = StoryResumeService;

        $scope.resumes = [];
        $scope.messages = [];

        $scope.init = search;
        $scope.detail = detail;

        function detail(story) {
            $uibModal.open({
                templateUrl: 'js/directives/components/modal/modal-historia.template.html',
                controller: 'StoryModalController',
                resolve: {
                    resumedStory: story
                }
            });
        };

        function search() {
            var promise = service.find();

            $q.when(promise)
                .then(loadResumes)
                .catch(function(error) { console.log(error) });
        };

        function loadResumes(resumes) {
            $scope.resumes = resumes;
        };

        $scope.init();
    }])
    .controller('StoryModalController', ['$scope', 'resumedStory', function($scope, resumedStory) {
        $scope.resume = resumedStory;
    }]);