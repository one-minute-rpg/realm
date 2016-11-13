angular
    .module('realm')
    .config(StoryEditRoute)
    .controller('StoryEditController', StoryEditController);

StoryEditController.$inject = ['$scope', '$q', '$stateParams', 'StoryForEditService', 'story'];

function StoryEditController($scope, $q, $stateParams, StoryForEditService, story){

    $scope.story = story;
    $scope.save = save;

    function save() {
        StoryForEditService.update($scope.story);
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