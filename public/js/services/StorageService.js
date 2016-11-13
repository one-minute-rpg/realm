angular.module('realm')
    .factory('StorageService', StorageService);
    
StorageService.$inject = ['$http'];

function StorageService($http){
    var service = {};

    var currentStory = {};

    service.insert = insert;
    service.update = update;

    service.setCurrentStory = setCurrentStory;

    service.getCurrentStory = getCurrentStory;

    service.getCurrentStoryScenes = getCurrentStoryScenes;

    service.getCurrentStoryItems = getCurrentStoryItems;

    function insert(story){
        return $http.post('/myStories/add', story)
            .then(function(response){
                setCurrentStory(response.data);
                return response.data;
            });
    }

    function update(story){
        if(!story){
            story = currentStory;
        }

        return $http.put('/myStories/update', story)
                .then(function(response){
                    setCurrentStory(story);
                })
                .catch(function(error){
                    console.log(error);
                    alert('Oorreu um erro em StorageService.update');
                });
    }

    function setCurrentStory(story){
        currentStory = story;
        alertUpdatedCurrentStory();
    }

    function getCurrentStory(){
        return currentStory;
    }

    function getCurrentStoryScenes(){
        return currentStory.scenes;
    }

    function getCurrentStoryItems(){
        debugger;
        return currentStory.items;
    }

    };

    return service;
};