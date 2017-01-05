angular.module('realm')
    .config(ItemEditrRoute)
    .controller('ItemEditController', ItemEditController);
    
ItemEditController.$inject = ['$scope', '$q', '$state', '$stateParams', 'story', 'ItemType', 'ItemForEditService', 'ToastService'];

function ItemEditController($scope, $q, $state, $stateParams, story, ItemType, ItemForEditService, Toast) {

    $scope.story = story;
    $scope.item = {};

    $scope.submit = submit;
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
            return item.item_id == $stateParams.item_id;
        });

        $scope.item = story.items[index];
        $scope.showEvents = $scope.item.type == ItemType.INVENTORY;
    };

    function submit(){
        if($scope.forms.item.$valid){
            save();
        }else{
            $scope.forms.item.$setDirty();
            Toast.error('Verifique as informações do formulário.');
        }
    };

    init();
};

ItemEditrRoute.$inject = ['$stateProvider'];

function ItemEditrRoute($stateProvider){
    
    $stateProvider.state('editItem', {
        url: '/myStories/edit/:story_id/edit/item/:item_id',
        templateUrl: 'partials/item/item-maintenance.html',
        controller: 'ItemEditController',
        resolve: {
            story: ['$stateParams', 'StoryForEditService', function($stateParams, StoryForEditService){
                return StoryForEditService.findById($stateParams.story_id);
            }]
        }
    });
};