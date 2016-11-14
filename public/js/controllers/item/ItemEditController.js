angular.module('realm')
    .config(ItemEditrRoute)
    .controller('ItemEditController', ItemEditController);
    
ItemEditController.$inject = ['$scope', '$q', '$state', '$stateParams', 'story', 'ItemType', 'ItemForEditService'];

function ItemEditController($scope, $q, $state, $stateParams, story, ItemType, ItemForEditService) {

    $scope.item = {};

    $scope.save = save;
    $scope.back = back;

    function save(){
        $q.when(ItemForEditService.update(story))
            .then(back);
    };

    function back(){
        $state.go('editStory', { story_id: story._id });
    };

    function init(){
        var index = story.items.findIndex(function(item){
            return item._id == $stateParams.item_id;
        });

        $scope.item = story.items[index];
        $scope.showEvents = $scope.item.type == ItemType.INVENTORY;
    };

    init();
};

ItemEditrRoute.$inject = ['$stateProvider'];

function ItemEditrRoute($stateProvider){
    
    $stateProvider.state('editQuestItem', {
        url: '/myStories/edit/:story_id/edit/item/quest/:item_id',
        templateUrl: 'partials/item/item-maintenance.html',
        controller: 'ItemEditController',
        resolve: {
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};