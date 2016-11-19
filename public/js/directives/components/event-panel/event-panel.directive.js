angular.module('realm')
    .directive('eventPanel', ['EventType', function(EventType) {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/event-panel/event-panel.template.html',
            scope: {
                events: '=',
                context: '=',
                availableScenes: '=',
                availableItems: '='
            },
            controller: 'EventPanelController'
        };


    }])
    .controller('EventPanelController', ['$scope', '$uibModal', 'EventType', 'Attributes', function($scope, $uibModal, EventType, Attributes){

        $scope.addEvent = addEvent;
        $scope.remove = remove;
        $scope.convertToEventList = convertToEventList;

        function addEvent(){
            $scope.eventTypeOptions = convertEventTypeToOption();
            $scope.attributes = convertAttributesToOption();

            var modal = $uibModal.open({
                templateUrl: 'js/directives/components/event-panel/modal-event-add.template.html',
                controller: 'ModalEventPanelController',
                resolve:{
                    options: function(){ return $scope.eventTypeOptions; },
                    attributes: function(){ return $scope.attributes; },
                    availableScenes: function(){ return $scope.availableScenes; },
                    availableItems: function(){ return $scope.availableItems; }
                },
                size: 'sm'
            });

            modal.result.then(function(event){
                $scope.events.push(event);
                $scope.eventList = $scope.convertToEventList($scope.events);
            });
        };

        function remove(event){
            var modal = $uibModal.open({
                            templateUrl: 'js/directives/components/modal/modal-confirmacao.template.html',
                            controller: ['$scope', '$uibModalInstance', 'event', function($scope, $uibModalInstance, event){
                                $scope.obj = event;
                                $scope.text = 'o evento';
                                $scope.confirm = function(event_id){
                                    $uibModalInstance.close(event_id);
                                };

                                $scope.cancel = function(){
                                    $uibModalInstance.close();
                                };
                            }],
                            resolve: {
                                event: function(){
                                    return event;
                                }
                            }
                        });

            modal.result.then(function(event_id){
                if(!!event_id){
                    removeEvent(event_id);
                };
            });
        };

        function removeEvent(event_id){
            var event = $scope.events.find(function(elem){
                return elem.event_id == event_id;
            });

            var index = $scope.events.indexOf(event);

            if(index > -1)
                $scope.events.splice(index, 1);

            init();
        };

        function convertToEventList(events){
            var eventList = events.map(function(evt){
                return {
                    event_id: evt.event_id,
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

        function init(){
            $scope.eventList = $scope.convertToEventList($scope.events);
        };

        init();
    }])
    .controller('ModalEventPanelController', ['$scope', 'EventType', '$uibModal', '$uibModalInstance', 'options', 'attributes', 'availableScenes', 'availableItems', function($scope, EventType, $uibModal, $uibModalInstance, options, attributes, availableScenes, availableItems){
        $scope.options = options;
        $scope.attributes = attributes;
        $scope.eventType = null;

        $scope.availableScenes = availableScenes;
        $scope.selectedScene = {};

        $scope.availableItems = availableItems;
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

            event.event_id = chance.guid();

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