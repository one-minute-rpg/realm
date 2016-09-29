// public/js/controllers/StoryController.js

angular.module('realm')
.controller('StoryController', function($scope, Story, $uibModal) {

    $scope.storyResumes = [];

    $scope.init = function(){
        search();
    };

    $scope.detail = function(story){
        
        $uibModal.open({
            templateUrl: 'js/directives/components/modal/modal-historia.template.html',
            controller: 'StoryModalController',
            resolve:{
                resumedStory: story
            }
        });
    }

    function search(){
        Story.query(function(stories){
            $scope.storyResumes = stories;
        },
        function(error){
            console.log("Não foi possível carregar as histórias")/
            console.log(error);
        });
    };
    $scope.init();
})
.controller('StoryModalController', function($scope, resumedStory){
    $scope.resume = resumedStory;
});