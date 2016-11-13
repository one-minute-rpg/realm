angular.module('realm')
    .directive('eventPanel', ['EventType', function(EventType) {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/event-panel/event-panel.template.html',
            scope: {
                events: '='
            },
            link: function($scope, elem, attrs){ 
                $scope.eventList = convertToEventList($scope.events);
            }
        };

        function convertToEventList(events){
            var eventList = events.map(function(evt){
                return {
                    event_id: evt.id,
                    text: createText(evt)
                };
            });

            return eventList;
        };
        
        function createText(evt){
            var text = '';

            switch(evt.type){
                case EventType.GO_TO_SCENE: text = 'Ir à Cena';
                break;

                case EventType.CHANGE_ATTRIBUTE: text = 'Alterar Atributo (' + evt.attribute + ')';
                break;
                
                case EventType.ADD_ITEM: text = 'Adicionar Item';
                break;
                
                case EventType.REMOVE_ITEM: text = 'Remover Item';
                break;

                case EventType.USE_ITEM: text = 'Usar Item';
                break; 

                case EventType.GAME_OVER: text = 'Fim de Jogo';
                break;
            
                case EventType.VICTORY: text = 'Vitória';
                break;

                case EventType.SAVE_GAME: text = 'Salvar Jogo';
                break;
            };

            return text;
        };

    }]);