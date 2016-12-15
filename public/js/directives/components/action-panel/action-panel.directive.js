angular.module('realm')
    .directive('actionPanel', [function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/action-panel/action-panel.template.html',
            scope: {
                actions: '='
            },
            controller: 'ActionPanelController'
        };


    }])
    .controller('ActionPanelController', ['$scope', '$state', '$stateParams', '$uibModal', function($scope, $state, $stateParams, $uibModal){

         

        $scope.init = init;
        $scope.convertToActionList = convertToActionList;
        $scope.addAction = addAction;
        $scope.remove = remove;
        $scope.editAction = editAction;

        function convertToActionList(actions){
            
            var actionList = actions.map(function(act){
                return {
                    action_id: act.action_id,
                    text: act.text
                };
            });

            return actionList;
        };

        function addAction(){
             
            $state.go('newAction', { story_id: $state.params.story_id, scene_id: $state.params.scene_id });
        };

        function editAction(action){
             
            $state.go('editAction', { story_id: $stateParams.story_id, scene_id: $stateParams.scene_id, action_id: action.action_id });
        };

        function remove(action){
             
            var modal = $uibModal.open({
                            templateUrl: 'js/directives/components/modal/modal-confirmacao.template.html',
                            controller: ['$scope', '$uibModalInstance', 'action', function($scope, $uibModalInstance, action){
                                $scope.obj = action.action_id;
                                $scope.text = 'a ação';
                                $scope.confirm = function(action_id){
                                    $uibModalInstance.close(action_id);
                                };

                                $scope.cancel = function(){
                                    $uibModalInstance.close();
                                };
                            }],
                            resolve: {
                                action: function(){
                                    return action;
                                }
                            }
                        });

            modal.result.then(function(action_id){
                if(!!action_id){
                    removeAction(action_id);
                };
            });
        };

        function removeAction(action_id){
            var action = $scope.actions.find(function(elem){
                return elem.action_id == action_id;
            });

            var index = $scope.actions.indexOf(action);

            if(index > -1)
                $scope.actions.splice(index, 1);

            init();
        };

        function init(){
            $scope.actionList = $scope.convertToActionList($scope.actions);
        };

        init();
    }]);