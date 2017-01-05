angular
    .module('realm')
    .config(StoryRegisterRoute)
    .controller('StoryRegisterController', StoryRegisterController);

StoryRegisterController.$inject = ['$scope', '$q', '$state', 'StoryForInsertService', 'ToastService'];

function StoryRegisterController($scope, $q, $state, StoryForInsertService, Toast){

    $scope.forms = {};
    
    $scope.submit = submit;

    function save() {
        $q.when(StoryForInsertService.insert($scope.story))
            .then(getStoryFromResponse)
            .then(edit);
    };

    function getStoryFromResponse(response){
        return response.data;
    };

    function edit(story){
        $state.go('editStory', { 'story_id': story._id });
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

StoryRegisterRoute.$inject = ['$stateProvider'];

function StoryRegisterRoute($stateProvider){

    $stateProvider
        .state('newStory', {
            url: '/myStories/new',
            templateUrl: 'partials/story-maintenance.html',
            controller: 'StoryRegisterController'
        });
};