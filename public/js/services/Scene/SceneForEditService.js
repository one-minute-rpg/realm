angular.module('realm')
    .factory('SceneForEditService', SceneForEditService);
    
SceneForEditService.$inject = ['$q', 'StorageService', 'ToastService'];

function SceneForEditService($q, StorageService, ToastService){
    var service = {};

    service.update = update;

    function update(story) {
        return $q.when(StorageService.update(story))
                .then(savedSuccessfully);
    };

    function savedSuccessfully(response){
        ToastService.success('História salva.');
        return response;
    };

    return service;
};