angular.module('realm')
    .factory('StoryForInsertService', ['$q', '$location', 'StorageService', 'ToastService', function($q, $location, StorageService, Toast) {
        var service = {};

        service.insert = insert;

        function insert(story) {
            if(validate(story)){
                $q.when(StorageService.insert(story))
                    .then(savedSuccessfully);
            }
        };

        function savedSuccessfully(response){
            Toast.success('História salva.');
            return response;
        }

        function validate(story){
            return true;
        }

        return service;
    }]);