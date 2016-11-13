
angular.module('realm')
    .factory('StoryForEditService', StoryForEditService);

StoryForEditService.$inject = ['$q', '$http', 'ToastService', 'StorageService'];

function StoryForEditService($q, $http, ToastService, StorageService){
    var service = {};

    service.update = update;
    service.findById = findById;

    function loadStory(response){
        return response.data[0];
    }

    function findById(id){
        return $http.get('/myStories/' + id)
            .then(loadStory);
    };

    function update(story){
        $q.when(StorageService.update(story))
            .then(alertSuccessfullyUpdatedStory)
            .catch(alertErrorOnUpdateStory);
    };

    function alertSuccessfullyUpdatedStory(){
        ToastService.success('História salva com sucesso.');
    };

    function alertErrorOnUpdateStory(){
        ToastService.error('Houve um erro ao salvar a história.');
    };

    return service;
};