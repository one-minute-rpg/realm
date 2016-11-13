angular
    .module('realm')
    .config(StorySearchRoute)
    .controller('StoryListController', StoryListController);

StoryListController.$inject = ['$scope', '$uibModal', '$state', 'storyList'];

function StoryListController($scope, $uibModal, $state, storyList){

    $scope.storyList = storyList;

    $scope.detail = detail;
    $scope.edit = edit;

    function detail(story) {
        $uibModal.open({
            templateUrl: 'js/directives/components/modal/modal-historia.template.html',
            controller: function($scope, storyDetail) {
                            $scope.storyDetail = storyDetail;
                        },
            resolve: {
                storyDetail: story
            }
        });
    };

    function edit(story){
        $state.go('editStory', { 'story_id': story._id });
    };

};

StorySearchRoute.$inject = ['$stateProvider'];

function StorySearchRoute($stateProvider){

    $stateProvider
        .state('storyList', {
            url: '/myStories/list',
            templateUrl: 'partials/story-list.html',
            controller: 'StoryListController',
            resolve: {
                storyList: ['StoryForListService', function(StoryForListService){
                    return StoryForListService.findStoriesForList();
                }]
            }
        });
};