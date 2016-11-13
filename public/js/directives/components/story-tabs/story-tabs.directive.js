angular.module('realm')
    .directive('storyTabs',['$q', function($q) {
        debugger;
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/story-tabs/story-tabs.template.html',
            scope: {
                scenes: '=',
                items: '='
            }
        };
    }]);