angular.module('realm')
    .factory('StoryForListService',['$http', function($http) {
        var service = {};

        service.findStoriesForList = findStoriesForList;

        function findStoriesForList(filters){
            return $http.get('/myStories')
                    .then(function(response) { 
                        return createStoryListProjection(response.data); 
                    });
        }

        function createStoryListProjection(stories){
            debugger;
            
            var projections = [];

            angular.forEach(stories, function(story, key) {

                var projection = {
                    _id: '',
                    title: {},
                    description: {},
                    cover: ''
                };

                projection._id = story._id;
                projection.cover = story.cover;
                projection.title = story.title;
                projection.description = story.description;

                projections.push(projection);
            });

            return projections;
        }

        return service;
    }]);