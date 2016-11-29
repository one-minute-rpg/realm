angular.module('realm')
    .factory('SceneForInsertService', SceneForInsertService);
    
SceneForInsertService.$inject = ['$q', 'StorageService', 'ToastService'];

function SceneForInsertService($q, StorageService, ToastService){
    var service = {};

    service.insert = insert;

    function insert(story, scene, type) {
        debugger;
        scene.scene_id = chance.guid();
        scene.type = type;

        if(validate(scene)){
            return $q.when(pushSceneToStory(story, scene))
                    .then(StorageService.update)
                    .then(savedSuccessfully);
        }
    };

    function savedSuccessfully(response){
        ToastService.success('História salva.');
        return response;
    }

    function validate(story){
        return true;
    }

    function pushSceneToStory(story, scene){
        debugger;
        story.scenes.push(scene);
        return story;
    }

    return service;
};