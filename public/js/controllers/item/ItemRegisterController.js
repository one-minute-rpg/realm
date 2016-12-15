angular.module('realm')
    .config(ItemRegisterRoute)
    .controller('ItemRegisterController', ItemRegisterController);
    
ItemRegisterController.$inject = ['$scope', '$q', '$state', 'ItemForInsertService', 'type', 'story', 'ItemType'];

function ItemRegisterController($scope, $q, $state, ItemForInsertService, type, story, ItemType) {

    $scope.item = {};
    $scope.item.events = [];

    $scope.showEvents = type == ItemType.INVENTORY;

    $scope.save = save;
    $scope.back = back;

    function save(){
        if(!$scope.item.id){
            $q.when(ItemForInsertService.insert(story, $scope.item, type))
                .then(back);
        }
    };

    function back(){
        $state.go('editStory', { story_id: story._id });
    };
};

ItemRegisterRoute.$inject = ['$stateProvider'];

function ItemRegisterRoute($stateProvider){
    
    $stateProvider.state('newQuestItem', {
        url: '/myStories/edit/:story_id/new/item/quest',
        templateUrl: 'partials/item/item-maintenance.html',
        controller: 'ItemRegisterController',
        resolve: {
            type: function(ItemType){
                return ItemType.QUEST;
            },
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });

    $stateProvider.state('newInventoryItem', {
        url: '/myStories/edit/:story_id/new/item/inventory',
        templateUrl: 'partials/item/item-maintenance.html',
        controller: 'ItemRegisterController',
        resolve: {
            type: function(ItemType){
                return ItemType.INVENTORY;
            },
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};