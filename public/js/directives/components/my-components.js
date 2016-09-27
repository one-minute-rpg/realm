// public/js/directives/components
// componente de card para resumo de dados de historia

angular.module('myComponents', [])
    .directive('storyCard', function() {

        var directive = {};

        directive.restrict = "E";

        directive.scope = {
            titulo: '@'
        };

        directive.transclude = true;

        directive.templateUrl = 'js/directives/components/story-card.html';

        return directive;
    })