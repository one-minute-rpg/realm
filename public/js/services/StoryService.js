angular.module('realm')
    .factory('StoryService', ['$http', 'StoryForEditService', '$q', function($http, StoryForEditService, $q) {
        var service = {};

        service.save = save;
        service.find = find;
        service.edit = edit;

        function find(filters) {

            //TODO: Método de busca com N filtros ou somente por id?

            if (!filters) {

                return 
            } else {
                return $http.get('/myStories/' + filters.id)
                    .then(function(response) { 
                        
                        //TODO: Definir a história corrente na Storage a partir daqui?
                        
                        return response.data[0]; 
                    });
            }
        };

        function edit(id){
            return $q.when(StoryForEditService.edit(id));
        }

        function save(story) {
            return $http.post('/myStories/add', story);
        };

        return service;
    }]);