angular.module('realm')
    .factory('StoryResumeService', ['$http', function($http) {
        var service = {};

        service.find = find;

        function find(filters) {
            if (filters) {
                return {};
            } else {
                return $http.get('/myStories')
                    .then(function(response) { return response.data; });
            }
        };

        return service;
    }]);