angular.module('realm')
    .directive('sceneList', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/list/scene-list/scene-list.template.html',
            scope: {
                scenes: '='
            },
            controller: 'SceneListController'
        };
    });