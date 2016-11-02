angular.module('realm')
    .factory('StoryForEditService',['$q', '$http', 'ToastService', 'StorageService', function($q, $http, ToastService, StorageService) {
        var service = {};

        service.edit = edit;
        service.update = update;
        service.findById = findById;

        function edit(id){
            var currentStory = StorageService.getCurrentStory();

            if(!!currentStory && currentStory._id == id){
                return $q.when(createStoryProjection(currentStory));
            }else{
                return $q.when(findById(id))
                            .then(function(){
                                return createStoryProjection(StorageService.getCurrentStory());
                            });
            }
            
        }

        function findById(id){
            return $http.get('/myStories/' + id)
                    .then(function(response){
                        StorageService.setCurrentStory(response.data[0]);
                        return;
                    });
        }

        function update(story){
            $q.when(StorageService.update(story))
                .then(alertSuccessfullyUpdatedStory)
                .catch(alertErrorOnUpdateStory);
        }

        function alertSuccessfullyUpdatedStory(){
            ToastService.success('História salva com sucesso.');
        }

        function alertErrorOnUpdateStory(){
            ToastService.error('Houve um erro ao salvar a história.');
        }

        function createStoryProjection(story){
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

            return projection;
        }

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

        function fillLanguages(obj){
            var newObject = {};

            for(prop in obj){
                newObject[prop] = obj[prop];
            }
    
            return newObject;
        }

        return service;
    }]);