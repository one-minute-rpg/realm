angular.module('realm')
    .factory('StoryForListService', StoryForListService);
    
StoryForListService.$inject = ['$http'];

function StoryForListService($http){
    var service = {};

    service.findStoriesForList = findStoriesForList;
    service.publish = publish;

    function findStoriesForList(filters){
        return $http.get('/myStories')
                .then(function(response) { 
                    return createStoryListProjection(response.data); 
                });
    };

    function createStoryListProjection(stories){
        var projections = [];

        angular.forEach(stories, function(story, key) {

            var projection = {
                _id: '',
                title: {},
                description: {},
                cover: '',
                sceneCount: null,
            };

            projection._id = story._id;
            projection.cover = story.cover;
            projection.title = story.title;
            projection.description = story.description;
            projection.sceneCount = story.scenes.length;

            projections.push(projection);
        });

        return projections;
    };

    function publish(story){
         
        return $http.post('/publish', story);
    };

    return service;
};