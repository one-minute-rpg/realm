
angular.module('realm')
    .directive('alert', function(){
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/alert/alert.template.html',
            scope: {
                alerts: '=',
                timeout: '='
            },
            controller: ['$scope', function($scope){
                $scope.close = close;

                function close(){
                    $scope.alerts = [];
                }
            }]
        };
    });