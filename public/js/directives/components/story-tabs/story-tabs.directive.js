angular.module('realm')
    .directive('storyTabs', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/story-tabs/story-tabs.template.html',
            scope: {
                scenes: '=',
                itens: '='
            }
        };
    });