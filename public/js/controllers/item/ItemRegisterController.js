angular.module('realm')
    .config(ItemRegisterRoute)
    .controller('ItemRegisterController', ItemRegisterController);
    
ItemRegisterController.$inject = ['$scope', '$q', '$state', 'ItemForInsertService', 'type', 'story', 'ItemType', 'ToastService'];

function ItemRegisterController($scope, $q, $state, ItemForInsertService, type, story, ItemType, Toast) {

    $scope.item = {};
    $scope.item.events = [];

    $scope.showEvents = type == ItemType.INVENTORY;

    $scope.submit = submit;
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

    function submit(){
        if($scope.forms.item.$valid){
            save();
        }else{
            $scope.forms.item.$setDirty();
            Toast.error('Verifique as informações do formulário.');
        }
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