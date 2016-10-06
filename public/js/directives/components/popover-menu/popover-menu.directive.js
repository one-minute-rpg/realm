angular.module('realm')
    .directive('popoverMenu', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/popover-menu/popover-menu.template.html',
            scope: {
                options: '=',
            },
            link: function($scope, elem) {
                $scope.optionsTemplate = 'js/directives/components/popover-menu/popover-menu-options.template.html'
            }
        };
    });