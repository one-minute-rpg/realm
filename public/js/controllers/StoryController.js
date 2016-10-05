angular.module('realm')
    .controller('StoryController', ['$scope', '$q', 'StoryService', function($scope, $q, StoryService) {

        $scope.story = {};
        $scope.messages = [];

        $scope.save = save;

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
    }]);