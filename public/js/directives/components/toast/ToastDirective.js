
angular.module('realm')
    .directive('toast', ['ToastMessageType', function(ToastMessageType){

        function link(scope, element, attrs){
            scope.close = close;
            scope.alerts = [];

            scope.$on(ToastMessageType.SUCCESS, function(event, data){
                var alert = { type: 'success', msg: data };
                scope.alerts.push(alert);
            });

            scope.$on(ToastMessageType.ERROR, function(event, data){
                var alert = { type: 'danger', msg: data };
                scope.alerts.push(alert);
            });

            function close(){
                scope.alerts = [];
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/toast/ToastTemplate.html',
            scope: {
                timeout: '='
            },
            link: link
        };
    }]);