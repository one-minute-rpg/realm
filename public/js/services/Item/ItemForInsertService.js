angular.module('realm')
    .factory('ItemForInsertService', ItemForInsertService);
    
ItemForInsertService.$inject = ['$q', 'StorageService', 'ToastService'];

function ItemForInsertService($q, StorageService, ToastService){
    var service = {};

    service.insert = insert;

    function insert(story, item, type) {
        item.item_id = chance.guid();
        item.type = type;

        if(validate(item)){
            return $q.when(pushItemToStory(story, item))
                    .then(StorageService.update)
                    .then(savedSuccessfully);
        }
    };

    function savedSuccessfully(response){
        ToastService.success('História salva.');
        return response;
    };

    function validate(story){
        return true;
    };

    function pushItemToStory(story, item){
        story.items.push(item);
        return story;
    };

    return service;
};