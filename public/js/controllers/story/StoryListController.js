angular
    .module('realm')
    .config(StorySearchRoute)
    .controller('StoryListController', StoryListController);

StoryListController.$inject = ['$scope', '$q', '$uibModal', '$state', 'storyList', 'StoryForEditService', 'StoryForListService'];

function StoryListController($scope, $q, $uibModal, $state, storyList, StoryForEditService, StoryForListService){

    $scope.storyList = storyList;

    $scope.detail = detail;
    $scope.edit = edit;
    $scope.remove = remove;
    $scope.publish = publish;

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

    function remove(id){
        var modal = $uibModal.open({
                        templateUrl: 'js/directives/components/modal/modal-confirmacao.template.html',
                        controller: ['$scope', '$uibModalInstance', 'story_id', function($scope, $uibModalInstance, story_id){
                            $scope.obj = { id: story_id };
                            $scope.text = 'a aventura';
                            $scope.confirm = function(obj){
                                $uibModalInstance.close(obj);
                            };

                            $scope.cancel = function(){
                                $uibModalInstance.close();
                            };
                        }],
                        resolve: {
                            story_id: function(){
                                return id;
                            }
                        }
                    });

        modal.result.then(function(obj){
            if(!!obj){
                $q.when(StoryForEditService.remove(id))
                    .then(back);
            };
        });
    };

    function publish(story_id){
        $q.when(StoryForEditService.findById(story_id))
            .then(StoryForListService.publish);
    };

    function back(){
        $state.reload('storyList');
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