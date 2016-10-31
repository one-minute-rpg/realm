angular.module('realm')
    .factory('StoryMaintenanceService', ['$q', '$location', 'StorageService', 'ToastService', function($q, $location, StorageService, Toast) {
        var service = {};

        service.insert = insert;

        function insert(story) {
            if(validate(story)){
                $q.when(StorageService.insert(story))
                    .then(savedSuccessfully)
                    .then(redirectToEdit);
            }
                //Chamar método salvar da StorageService

            //return $http.post('/myStories/add', story);
        };

        function savedSuccessfully(response){
            Toast.success('História salva.');
            return response;
        }

        function redirectToEdit(response){
            debugger;
            $location.path('/myStories/' + response.data._id + '/edit');
        }

        function update(story){

        }

        function validate(story){
            return true;
        }

        return service;
    }]);