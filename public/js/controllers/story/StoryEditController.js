angular
    .module('realm')
    .config(StoryEditRoute)
    .controller('StoryEditController', StoryEditController);

StoryEditController.$inject = ['$scope', '$q', '$state', 'StoryForEditService', 'story'];

function StoryEditController($scope, $q, $state, StoryForEditService, story){

    $scope.story = story;
    $scope.save = save;
    $scope.back = back;

    function save() {
        StoryForEditService.update($scope.story);
    };

    function back(){
        $state.go('storyList');
    };
};

StoryEditRoute.$inject = ['$stateProvider'];

function StoryEditRoute($stateProvider){
    
    $stateProvider
        .state('editStory', {
            url: '/myStories/edit/:story_id',
            templateUrl: 'partials/story-maintenance.html',
            controller: 'StoryEditController',
            resolve: {
                story: function($stateParams, StoryForEditService){
                    return StoryForEditService.findById($stateParams.story_id);
                }
            }
        });
};