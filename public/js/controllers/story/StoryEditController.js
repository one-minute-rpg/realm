angular
    .module('realm')
    .config(StoryEditRoute)
    .controller('StoryEditController', StoryEditController);

StoryEditController.$inject = ['$scope', '$q', '$state', 'StoryForEditService', 'story', 'ToastService', '$http'];

function StoryEditController($scope, $q, $state, StoryForEditService, story, Toast, $http){

    $scope.story = story;
    $scope.submit = submit;
    $scope.back = back;

    function save() {
        StoryForEditService.update($scope.story);
    };

    function back(){
        $state.go('storyList');
    };

    function submit(){
        if($scope.forms.register.$valid){
            save();
        }else{
            $scope.forms.register.$setDirty();
            Toast.error('Verifique as informações do formulário.');
        }
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