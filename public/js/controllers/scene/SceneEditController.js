angular.module('realm')
    .config(SceneEditRoute)
    .controller('SceneEditController', SceneEditController);
    
SceneEditController.$inject = ['$scope', '$q', '$state', '$stateParams', 'story', 'SceneForEditService'];

function SceneEditController($scope, $q, $state, $stateParams, story, SceneForEditService) {

    $scope.story = story;
    $scope.scene = {};

    $scope.save = save;
    $scope.back = back;

    function save(){
        $q.when(SceneForEditService.update(story))
            .then(back);
    };

    function back(){
        $state.go('editStory', { story_id: story._id });
    };

    function init(){
        var index = story.scenes.findIndex(function(scene){
            return scene.scene_id == $stateParams.scene_id;
        });

        $scope.scene = story.scenes[index];
    };

    init();
};

SceneEditRoute.$inject = ['$stateProvider'];

function SceneEditRoute($stateProvider){
    
    $stateProvider.state('editScene', {
        url: '/myStories/edit/:story_id/edit/scene/:scene_id',
        templateUrl: 'partials/scene/scene-maintenance.html',
        controller: 'SceneEditController',
        resolve: {
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};