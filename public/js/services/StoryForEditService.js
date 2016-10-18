angular.module('realm')
    .factory('StoryForEditService',['$q', 'StorageService', function($q, StorageService) {
        var service = {};

        service.edit = edit;

        function edit(id){
            var currentStory = StorageService.getCurrentStory();
            return $q.when(createStoryProjection(currentStory));
        }

        function createStoryProjection(story){
            debugger;

            var projection = {
                _id: '',
                title: {},
                description: {},
                cover: '',
                creatures: [],
                itens: [],
                scenes: []
            };

            projection._id = story._id;
            projection.cover = story.cover;
            projection.title = fillLanguages(story.title);
            projection.description = fillLanguages(story.description);

            projection.scenes = createScenesProjection(story.scenes);
            projection.itens = createItensProjection(story.itens);
            projection.creatures = createCreaturesProjection(story.creatures);

            return projection;
        }

        //TODO: Separar a criação da projeção de cenas em uma service diferente
        function createScenesProjection(scenes){
            var projections = [];

            angular.forEach(scenes, function(scene, key) {
                debugger;
                var projection = {
                    scene_id: '',
                    type: '',
                    title: {},
                    text: {}
                };
                projection.scene_id = scene.scene_id;
                projection.type = scene.type;
                projection.title = fillLanguages(scene.title);
                projection.text = fillLanguages(scene.text);

                projections.push(projection);
            });

            return projections;
        }

        //TODO: Separar a criação da projeção de itens em uma service diferente
        function createItensProjection(itens){
            var projections = [];

            angular.forEach(itens, function(item, key){
                var projection = {
                    item_id: '',
                    type: '',
                    name: {},
                    text: {}
                };

                projection.item_id = item.item_id;
                projection.type = item.type;
                projection.name = fillLanguages(item.name);
                projection.text = fillLanguages(item.text);

                projections.push(projection);
            });

            return projections;
        }

        //TODO: Separar a criação da projeção de criaturas em uma service diferente
        function createCreaturesProjection(creatures){
            var projections = [];

            angular.forEach(creatures, function(creature, key){
                var projection = {
                    creature_id: '',
                    name: {},
                    level: ''
                };

                projection.creature_id = creature.creature_id;
                projection.name = fillLanguages(creature.name);
                projection.level = creature.level;

                projections.push(projection);
            });

            return projections;
        }

        function fillLanguages(obj){
            var newObject = {};

            for(prop in obj){
                newObject[prop] = obj[prop];
            }
    
            return newObject;
        }

        return service;
    }]);