angular.module('realm')
    .directive('pagination', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/pagination/pagination.template.html',
            scope: {
                totalItems: '='
            },
            link: function($scope, elem) {
                $scope.nextText = "Próxima";
                $scope.previousText = "Anterior";
                $scope.currentPage = 1;
                
                $scope.setPage = function(pageNo){
                    $scope.currentPage = pageNo;
                }
            }
        };
    });