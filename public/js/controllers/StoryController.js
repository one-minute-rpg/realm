angular.module('realm')
    .controller('StoryController', ['$scope', '$q', '$routeParams', '$location', 'StoryService', 'ToastService', function($scope, $q, $routeParams, $location, StoryService, ToastService) {

        var id = $routeParams.id;

        $scope.story = {};

        $scope.save = save;
        $scope.init = init;

        function save() {
            var promise = StoryService.save($scope.story);

            $q.when(promise)
                .then(function(){
                    ToastService.success({ type: 'success', msg: 'Salvo com sucesso!' });
                })
                .then(clear)
                .catch(function(error) {
                    console.log(error);
                });
        };

        function clear() {
            $scope.story = {};
        }

        function find(filters){
            var promise = StoryService.find(filters);
        
            $q.when(promise)
                .then(edit)
                .catch(function(error){
                    var message = { type: 'danger', msg: error.data.message };

                    ToastService.error(message);
                    console.log(error);

                    $location.path('/myStories');
                });    
        }

        function edit(id){
            $q.when(StoryService.edit(id))
                .then(fill)
                .catch(console.log);
        }

        function fill(projection){
            $scope.projection = projection;
        }

        function init(){
            if(!!id){
                //find({'id': id});
                edit(id);
            }
        }

        $scope.init();
    }]);