angular.module('realm')
    .directive('popoverMenu',['$stateParams', '$state', function($stateParams, $state) {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/popover-menu/popover-menu.template.html',
            scope: {
                options: '=',
            },
            link: function($scope, elem, attrs) {
                $scope.optionsTemplate = 'js/directives/components/popover-menu/popover-menu-options.template.html';

                $scope.newQuestItem = function(){
                    $state.go('newQuestItem', { story_id: $stateParams.story_id });
                };

                $scope.newInventoryItem = function(){
                    $state.go('newInventoryItem', { story_id: $stateParams.story_id });
                };

                $scope.newScene = function(){
                    $state.go('newScene', { story_id: $stateParams.story_id });
                };
            }
        };
    }]);