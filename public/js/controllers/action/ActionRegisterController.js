angular.module('realm')
    .config(ActionRegisterRoute)
    .controller('ActionRegisterController', ActionRegisterController);
    
ActionRegisterController.$inject = ['$scope', '$q', '$state', 'story', 'ActionForInsertService'];

function ActionRegisterController($scope, $q, $state, story, ActionForInsertService) {
    
    $scope.action = {};

    $scope.save = save;
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