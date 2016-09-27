// public/js/controllers/StoryController.js

angular.module('realm')
.controller('StoryController', function($scope, Story) {

    $scope.storyResumes = [];
    
    $scope.init = function(){
        search();
    };

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
});