angular.module('realm')
    .factory('ActionForEditService', ActionForEditService);
    
ActionForEditService.$inject = ['$q', 'StorageService', 'ToastService'];

function ActionForEditService($q, StorageService, ToastService){
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