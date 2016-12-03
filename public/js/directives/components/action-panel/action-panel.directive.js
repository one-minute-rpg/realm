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
    .controller('ActionPanelController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){

        debugger;

        $scope.init = init;
        $scope.convertToActionList = convertToActionList;
        $scope.addAction = addAction;
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
            debugger;
            $state.go('newAction', { story_id: $state.params.story_id, scene_id: $state.params.scene_id });
        };

        function editAction(action){
            debugger;
            $state.go('editAction', { story_id: $stateParams.story_id, scene_id: $stateParams.scene_id, action_id: action.action_id });
        };

        function init(){
            $scope.actionList = $scope.convertToActionList($scope.actions);
        };

        init();
    }]);