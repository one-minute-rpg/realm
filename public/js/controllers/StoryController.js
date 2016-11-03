angular.module('realm')
    .controller('StoryController', ['$scope', '$q', '$routeParams', '$location', '$uibModal', 'StoryForInsertService', 'ToastService', 'StorageService', 'StoryForListService', 'StoryForEditService', function($scope, $q, $routeParams, $location, $uibModal, StoryForInsertService, ToastService, StorageService, StoryForListService, StoryForEditService) {

        $scope.story = {
            title: {},
            description: {},
            cover: '',
            itens: [],
            scenes: []
        };

        $scope.storyList = [];

        $scope.save = save;
        $scope.detail = detail;
        $scope.edit = edit;
        $scope.init = init;

        //TODO: Encontrar melhor lugar para fazer a "limpeza" da história corrente na storage

        function save() {
            if(!!$scope.story._id){
                StoryForEditService.update($scope.story);
            }else{
                StoryForInsertService.insert($scope.story);
                redirectToEdit($scope.story._id);
            }
        };

        function detail(story) {
            $uibModal.open({
                templateUrl: 'js/directives/components/modal/modal-historia.template.html',
                controller: function($scope, storyDetail) {
                                $scope.storyDetail = storyDetail;
                            },
                resolve: {
                    storyDetail: story
                }
            });
        };

        function edit(story){
            redirectToEdit(story._id);
        }

        function findStoryForEdit(id){
            var promise = StoryForEditService.edit(id);

            $q.when(promise)
                .then(function(story){
                    $scope.story = story;
            })
        }

        function findStoriesForList(){
            $q.when(StoryForListService.findStoriesForList())
                .then(setStoryList);
        }

        function redirectToEdit(id){
            $location.path('/myStories/' + id + '/edit');
        }

/*-----------------------UTILS----------------------------*/

        //TODO: Encontrar nome melhor para o método
        function fill(projection){
            $scope.projection = projection;
        }

        function setStoryList(data){
            $scope.storyList = data;
        }

        function clear() {
            $scope.story = {};
        }

        function init(){
            var id = $routeParams.id;

            if(!!id){
                findStoryForEdit(id);
            }else{
                findStoriesForList();
            }
        }

        $scope.init();
    }]);