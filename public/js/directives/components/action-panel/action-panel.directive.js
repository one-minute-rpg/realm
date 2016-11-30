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
    .controller('ActionPanelController', ['$scope', function($scope){

        debugger;
        $scope.init = init;
        $scope.convertToActionList = convertToActionList;

        function convertToActionList(actions){
            
            var actionList = actions.map(function(act){
                return {
                    action_id: act.event_id,
                    text: act.text.pt_br
                };
            });

            return actionList;
        };

        function init(){
            $scope.actionList = $scope.convertToActionList($scope.actions);
        };

        init();
    }]);