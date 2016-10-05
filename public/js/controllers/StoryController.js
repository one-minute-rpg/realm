angular.module('realm')
    .controller('StoryController', ['$scope', '$q', '$routeParams', 'StoryService', function($scope, $q, $routeParams, StoryService) {

        var id = $routeParams.id;

        $scope.story = {};
        $scope.messages = [];

        $scope.save = save;
        $scope.init = init;

        function save() {
            var promise = StoryService.save($scope.story);

            $q.when(promise)
                .then(addAlert)
                .then(clear)
                .catch(function(error) {
                    console.log(error);
                });
        };

        function clear() {
            $scope.story = {};
        }

        function addAlert(res) {
            if (res.status == 201) {
                $scope.messages.push({ type: 'success', msg: 'Salvo com sucesso!' });
            }
        }

        function find(filters){
            var promise = StoryService.find(filters);
        
            $q.when(promise)
                .then(edit)
                .catch(function(error){
                    console.log(error);
                });    
        }

        function edit(story){
            $scope.story = story;
        }

        function init(){
            if(id){
                find({'id': id});
            }
        }

        $scope.init();
    }]);