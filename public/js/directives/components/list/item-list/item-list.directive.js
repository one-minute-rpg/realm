angular.module('realm')
    .directive('itemList', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/list/item-list/item-list.template.html',
            scope: {
                items: '='
            },
            controller: 'ItemListController'
        };
    });