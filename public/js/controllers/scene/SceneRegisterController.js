angular.module('realm')
    .config(SceneRegisterRoute)
    .controller('SceneRegisterController', SceneRegisterController);
    
SceneRegisterController.$inject = ['$scope', '$q', '$state', 'story', 'SceneForInsertService', 'SceneType'];

function SceneRegisterController($scope, $q, $state, story, SceneForInsertService, SceneType) {
    
    $scope.scene = {};

    $scope.save = save;
    $scope.back = back;

    function save(){
        if(!$scope.scene.scene_id){
            $q.when(SceneForInsertService.insert(story, $scope.scene, SceneType.DECISION))
                .then(back);
        }
    };

    function back(){
        $state.go('editStory', { story_id: story._id });
    };
};

SceneRegisterRoute.$inject = ['$stateProvider'];

function SceneRegisterRoute($stateProvider){
    
    $stateProvider.state('newScene', {
        url: '/myStories/edit/:story_id/new/scene/',
        templateUrl: 'partials/scene/scene-maintenance.html',
        controller: 'SceneRegisterController',
        resolve: {
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};