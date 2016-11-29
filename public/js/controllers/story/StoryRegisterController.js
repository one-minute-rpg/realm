angular
    .module('realm')
    .config(StoryRegisterRoute)
    .controller('StoryRegisterController', StoryRegisterController);

StoryRegisterController.$inject = ['$scope', '$q', '$state', 'StoryForInsertService'];

function StoryRegisterController($scope, $q, $state, StoryForInsertService){

    $scope.save = save;

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