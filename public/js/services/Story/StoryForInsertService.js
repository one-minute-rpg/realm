
angular.module('realm')
    .factory('StoryForInsertService', StoryForInsertService);

StoryForInsertService.$inject = ['$q', 'StorageService', 'ToastService'];

function StoryForInsertService($q, StorageService, ToastService){
    var service = {};

    service.insert = insert;

    function insert(story) {
        story.story_id = chance.guid();
        story.language = 'pt_br';

        if(validate(story)){
            return $q.when(StorageService.insert(story))
                .then(savedSuccessfully)
                .catch(errorOnCreate);
        }
    };

    function savedSuccessfully(data){
        ToastService.success('História salva.');
        return data;
    };

    function errorOnCreate(data){
        ToastService.error('Ocorreu um erro ao criar a nova história.');
        return data;
    };

    function validate(story){
        return true;
    };

    return service;
};