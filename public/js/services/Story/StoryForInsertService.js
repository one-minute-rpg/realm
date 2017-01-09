
angular.module('realm')
    .factory('StoryForInsertService', StoryForInsertService);

StoryForInsertService.$inject = ['$q', 'StorageService', 'ToastService'];

function StoryForInsertService($q, StorageService, ToastService){
    var service = {};

    service.insert = insert;

    function insert(story) {
        story.story_id = chance.guid();
        story.language = 'pt_br';
        story.hero = createHero();

        if(validate(story)){
            return $q.when(StorageService.insert(story))
                .then(savedSuccessfully)
                .catch(errorOnCreate);
        }
    };

    function createHero(){
        var hero = { attributes: {} };

        hero.attributes.health = chance.integer({ min: 4, max: 7 });
        hero.attributes.strength = chance.integer({ min: 4, max: 7 });
        hero.attributes.agility = chance.integer({ min: 4, max: 7 });
        hero.attributes.intelligence = chance.integer({ min: 4, max: 7 });

        hero.items = [];

        return hero;
    };

    function savedSuccessfully(data){
        ToastService.success('História salva.');
        return data;
    };

    function errorOnCreate(data){
        ToastService.error('Ocorreu um erro ao criar a nova história.');
        return data;
    };

    function validate(story){
        return true;
    };

    return service;
};