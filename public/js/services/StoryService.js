angular.module('realm')
    .factory('StoryService', ['$http', 'StoryForEditService', '$q', function($http, StoryForEditService, $q) {
        var service = {};

        service.save = save;
        service.find = find;
        service.edit = edit;

        function find(filters) {
            if (!!filters) {
                return 
            } else {
                //return $http.get('/myStories').then(function(response) { return response.data; });
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