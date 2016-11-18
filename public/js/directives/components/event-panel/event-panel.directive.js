angular.module('realm')
    .directive('eventPanel', ['EventType', function(EventType) {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/event-panel/event-panel.template.html',
            scope: {
                events: '=',
                context: '='
            },
            controller: 'EventPanelController',
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

    }])
    .controller('EventPanelController', ['$scope', '$uibModal', 'EventType', 'Attributes', function($scope, $uibModal, EventType, Attributes){

        $scope.addEvent = addEvent;

        function addEvent(){
            $scope.eventTypeOptions = convertEventTypeToOption();
            $scope.attributes = convertAttributesToOption();

            var modal = $uibModal.open({
                templateUrl: 'js/directives/components/event-panel/modal-event-add.template.html',
                controller: 'ModalEventPanelController',
                resolve:{
                    options: function(){ return $scope.eventTypeOptions; },
                    attributes: function(){ return $scope.attributes }
                },
                size: 'sm'
            });

            modal.result.then(function(event){
                debugger;
                event;
            });
        };

        function convertEventTypeToOption(){
            var options = [];

            switch($scope.context){
                case 'Item': options = eventsAvailableForInventoryItem();
                break;
            };

            return options;
        };

        function convertAttributesToOption(){
            var options = [];

            options.push({ type: Attributes.HEALTH, text: 'Vida' });
            options.push({ type: Attributes.STRENGTH, text: 'Força' });
            options.push({ type: Attributes.AGILITY, text: 'Agilidade' });
            options.push({ type: Attributes.INTELLIGENCE, text: 'Inteligência' });

            return options;
        };

        function eventsAvailableForInventoryItem(){
            var types = [];

            types.push({ type_id: null, text: 'Selecione um' });
            types.push({ type_id: EventType.GO_TO_SCENE, text: 'Ir para Cena' });
            types.push({ type_id: EventType.CHANGE_ATTRIBUTE, text: 'Alterar Atributo' });
            types.push({ type_id: EventType.ADD_ITEM, text: 'Adicionar Item' });
            types.push({ type_id: EventType.GAME_OVER, text: 'Game Over' });
        
            return types;
        };
    }])
    .controller('ModalEventPanelController', ['$scope', 'EventType', '$uibModal', '$uibModalInstance', 'options', 'attributes', function($scope, EventType, $uibModal, $uibModalInstance, options, attributes){
        $scope.options = options;
        $scope.attributes = attributes;
        $scope.eventType = null;

        $scope.scenesAvailable = [];
        $scope.selectedScene = {};

        $scope.itemsAvailable = [];
        $scope.selectedItem = {};

        $scope.refresh = refresh;
        $scope.cancel = cancel;
        $scope.createEvent = createEvent;

        function refresh(){ 
            $scope.isChangeAttribute = $scope.eventType == EventType.CHANGE_ATTRIBUTE;
            $scope.isGoToScene = $scope.eventType == EventType.GO_TO_SCENE;
            $scope.isAddItem = $scope.eventType == EventType.ADD_ITEM;
            $scope.isGameOver = $scope.eventType == EventType.GAME_OVER;
        };

        function createEvent(){
            var event = {};

            switch($scope.eventType){
                case EventType.CHANGE_ATTRIBUTE: event = createChangeAttributeEvent();
                break;

                case EventType.GO_TO_SCENE: event = createGoToSceneEvent();
                break;

                case EventType.ADD_ITEM: event = createAddItemEvent();
                break;

                case EventType.GAME_OVER: event = createGameOverEvent();
                break;
            };

             $uibModalInstance.close(event);
        };

        function cancel(){
            $uibModalInstance.close();
        };

        function createChangeAttributeEvent(){
            var event = {};

            event.type = $scope.eventType;
            event.attribute = $scope.attribute;
            event.value = $scope.value;
            event.text = { pt_br: $scope.attrChangeText };

            return event;
        };

        function createGameOverEvent(){
            return { 
                type: EventType.GAME_OVER, 
                text: { pt_br: $scope.gameover } 
            };
        };

        function createGoToSceneEvent(){
            debugger;
            return { 
                type: $scope.eventType, 
                scene_id: $scope.selectedScene.scene_id 
            };
        };

        function createAddItemEvent(){
            debugger;
            return { 
                type: $scope.eventType, 
                item_id: $scope.selectedItem.item_id, 
                quantity: $scope.quantity 
            };
        };
    }]);