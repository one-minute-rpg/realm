angular.module('realm')
    .config(ActionRegisterRoute)
    .controller('ActionRegisterController', ActionRegisterController);
    
ActionRegisterController.$inject = ['$scope', '$q', '$state', 'story', 'ActionForInsertService', 'ToastService'];

function ActionRegisterController($scope, $q, $state, story, ActionForInsertService, Toast) {
    
    $scope.action = {};
    $scope.action.events = [];
    $scope.action.require_items = [];

    $scope.requiredAttributes = {
        health: null,
        strength: null,
        agility: null,
        intelligence: null
    };

    $scope.action.require_attribute_value = $scope.requiredAttributes;

    $scope.submit = submit;
    $scope.back = back;

    function save(){
        if(!$scope.action.action_id){
            $q.when(ActionForInsertService.insert(story, $state.params.scene_id, $scope.action))
                .then(back);
        }
    };

    function back(){
        $state.go('editScene', { story_id: story._id, scene_id: $state.params.scene_id });
    };

    function submit(){
        if($scope.forms.action.$valid){
            save();
        }else{
            $scope.forms.action.$setDirty();
            Toast.error('Verifique as informações do formulário.');
        }
    };
};

ActionRegisterRoute.$inject = ['$stateProvider'];

function ActionRegisterRoute($stateProvider){
    
    $stateProvider.state('newAction', {
        url: '/myStories/edit/:story_id/:scene_id/new/action/',
        templateUrl: 'partials/action/action-maintenance.html',
        controller: 'ActionRegisterController',
        resolve: {
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};