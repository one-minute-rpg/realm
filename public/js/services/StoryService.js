angular.module('realm')
    .factory('StoryService', ['$http', function($http) {
        var service = {};

        service.save = save;
        service.find = find;

        function find(filters) {
            if (filters) {
                $http.get('/myStories/' + filters.id)
            } else {
                //return $http.get('/myStories').then(function(response) { return response.data; });
            }
        };

        function save(story) {
            return $http.post('/myStories/add', story);
        };

        return service;
    }]);