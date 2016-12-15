angular.module('realm')
    .factory('SceneForInsertService', SceneForInsertService);
    
SceneForInsertService.$inject = ['$q', 'StorageService', 'ToastService', 'EventType'];

function SceneForInsertService($q, StorageService, ToastService, EventType){
    var service = {};

    service.insert = insert;

    function insert(story, scene, type) {
         
        scene.scene_id = chance.guid();
        scene.type = type;

        scene.on_die_events = [];
        scene.on_die_events.push(
            {   
                event_id: chance.guid(),
                type: EventType.GAME_OVER,
                text: 'Fim de Jogo'
            }
        );

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
         
        story.scenes.push(scene);
        return story;
    }

    return service;
};