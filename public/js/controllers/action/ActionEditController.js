angular.module('realm')
    .config(ActionEditRoute)
    .controller('ActionEditController', ActionEditController);
    
ActionEditController.$inject = ['$scope', '$q', '$state', '$stateParams', 'story', 'ActionForEditService'];

function ActionEditController($scope, $q, $state, $stateParams, story, ActionForEditService) {

    $scope.story = story;
    $scope.action = {};

    $scope.save = save;
    $scope.back = back;

    function save(){
        $q.when(ActionForEditService.update(story))
            .then(back);
    };

    function back(){
        $state.go('editScene', { story_id: story._id, scene_id: $stateParams.scene_id });
    };

    function init(){
        debugger;
        var index = story.scenes.findIndex(function(scene){
            return scene.scene_id == $stateParams.scene_id;
        });

        var scene = story.scenes[index];
        
        index = scene.actions.findIndex(function(action){
            return action.action_id == $stateParams.action_id;
        });

        $scope.action = scene.actions[index];
    };

    init();
};

ActionEditRoute.$inject = ['$stateProvider'];

function ActionEditRoute($stateProvider){
    
    $stateProvider.state('editAction', {
        url: '/myStories/edit/:story_id/:scene_id/edit/action/:action_id',
        templateUrl: 'partials/action/action-maintenance.html',
        controller: 'ActionEditController',
        resolve: {
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};