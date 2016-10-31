angular.module('realm')
    .controller('StoryController', ['$scope', '$q', '$routeParams', '$location', '$uibModal', 'StoryMaintenanceService', 'ToastService', 'StorageService', 'StoryForListService', function($scope, $q, $routeParams, $location, $uibModal, StoryMaintenanceService, ToastService, StorageService, StoryForListService) {

        var id = $routeParams.id;

        $scope.story = {
            title: {},
            description: {},
            cover: '',
            itens: [],
            scenes: []
        };

        $scope.storyList = [];

        $scope.save = save;
        $scope.init = init;
        $scope.findStoriesForList = findStoriesForList;

        //TODO: Utilizar StorageService através da StoryService ("encapsular")?

        //TODO: Encontrar melhor lugar para fazer a "limpeza" da história corrente na storage

        //TODO: Trocar $scope.story por StorageService.getCurrentStory()??
        function save() {
            var story = $scope.story;

            if(!!story._id){

            }else{
                StoryMaintenanceService.insert(story);
            }
        /*
            var promise = StoryService.save($scope.story);

            $q.when(promise)
                .then(function(){
                    ToastService.success({ type: 'success', msg: 'Salvo com sucesso!' });
                })
                .then(clear)
                .catch(function(error) {
                    console.log(error);
                });
        */
        };

        function clear() {
            $scope.story = {};
        }

        function find(filters){
            var promise = StoryService.find(filters);
        
            $q.when(promise)
                .then(setCurrentStoryOnStorage)
                .then(edit)
                .catch(function(error){
                    var message = { type: 'danger', msg: error.data.message };

                    ToastService.error(message);
                    console.log(error);

                    $location.path('/myStories');
                });    
        }

        function findStoriesForList(){
            $q.when(StoryForListService.findStoriesForList())
                .then(setStoryList);
        }

        function edit(id){
            $q.when(StoryService.edit(id))
                .then(fill)
                .catch(console.log);
        }

/*-----------------------UTILS----------------------------*/

        //TODO: Encontrar nome melhor para o método
        function fill(projection){
            $scope.projection = projection;
        }

        function setStoryList(data){
            $scope.storyList = data;
        }

        //TODO: Colocar a definição de história corrente para dentro da StoryService?
        function setCurrentStoryOnStorage(story){
            StorageService.setCurrentStory(story);
        }

        function init(){
            if(!!id){
                find({'id': id});
            }else{
                findStoriesForList();
            }
        }

        $scope.init();
    }]);