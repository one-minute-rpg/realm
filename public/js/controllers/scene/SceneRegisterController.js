angular.module('realm')
    .config(SceneRegisterRoute)
    .controller('SceneRegisterController', SceneRegisterController);
    
SceneRegisterController.$inject = ['$scope', '$q', '$state', 'story', 'SceneForInsertService', 'SceneType', 'ToastService'];

function SceneRegisterController($scope, $q, $state, story, SceneForInsertService, SceneType, Toast) {
    
    $scope.scene = {};
    $scope.scene.on_die_events = [];
    $scope.scene.actions = [];

    $scope.story = story;

    $scope.submit = submit;
    $scope.back = back;

    function save(){
        if(!$scope.scene.scene_id){
            $q.when(SceneForInsertService.insert(story, $scope.scene, SceneType.DECISION))
                .then(reload);
        }
    };

    function reload(){
        $state.go('editScene', { story_id: story._id, scene_id: $scope.scene.scene_id });
    };

    function back(){
        $state.go('editStory', { story_id: story._id });
    };

    function submit(){
        if($scope.forms.scene.$valid){
            save();
        }else{
            $scope.forms.scene.$setDirty();
            Toast.error('Verifique as informações do formulário.');
        }
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