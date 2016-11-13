angular.module('realm')
    .directive('pagination', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/pagination/pagination.template.html',
            scope: {
                itemCount: '=',
                currentPage: '=',
                itemsPerPage: '=',
                onPageChange: '&'
            },
            link: function($scope, elem, attrs) {
                $scope.onChange = function(){
                    $scope.onPageChange()($scope.currentPage);
                };
            }
        };
    });