angular.module('realm')
    .factory('ActionForInsertService', ActionForInsertService);
    
ActionForInsertService.$inject = ['$q', 'StorageService', 'ToastService'];

function ActionForInsertService($q, StorageService, ToastService){
    var service = {};

    service.insert = insert;

    function insert(story, scene_id, action) {
        debugger;
        action.action_id = chance.guid();

        if(validate(action)){
            return $q.when(pushActionToScene(story, scene_id, action))
                    .then(StorageService.update)
                    .then(savedSuccessfully);
        }
    };

    function savedSuccessfully(response){
        ToastService.success('História salva.');
        return response;
    };

    function validate(story){
        return true;
    };

    function pushActionToScene(story, scene_id, action){
        debugger;
        var scene = findScene(story, scene_id);

        scene.actions.push(action);

        return story;
    };

    function findScene(story, scene_id){
        debugger;
        var index = story.scenes.findIndex(function(scene){
            return scene.scene_id == scene_id;
        });

        return story.scenes[index];
    };

    return service;
};