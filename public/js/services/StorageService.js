angular.module('realm')
    .factory('StorageService', StorageService);
    
StorageService.$inject = ['$http'];

function StorageService($http){
    var service = {};

    service.insert = insert;
    service.update = update;

    function insert(story){
        return $http.post('/myStories/add', story)
                .catch(function(error){
                    console.log(error);
                    alert('Oorreu um erro em StorageService.insert');
                });
    };

    function update(story){
        if(!story){
            story = currentStory;
        }

        return $http.put('/myStories/update', story)
                .catch(function(error){
                    console.log(error);
                    alert('Oorreu um erro em StorageService.update');
                });
    };

    return service;
};