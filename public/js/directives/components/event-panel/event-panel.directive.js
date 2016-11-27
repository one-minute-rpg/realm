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
        $scope.editEvent = editEvent;
        $scope.remove = remove;
        $scope.convertToEventList = convertToEventList;

        function findEvent(event_id){
            return $scope.events.find(function(elem){
                return elem.event_id == event_id;
            });
        };

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
                debugger;
                if(!!event)
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

        function editEvent(event_id){
            debugger;
            var event = findEvent(event_id);

            $scope.eventTypeOptions = convertEventTypeToOption();
            $scope.attributes = convertAttributesToOption();

            var modal = $uibModal.open({
                templateUrl: 'js/directives/components/event-panel/modal-event-add.template.html',
                controller: 'ModalEventPanelController',
                resolve:{
                    originalEvent: function(){ return event; },
                    options: function(){ return $scope.eventTypeOptions; },
                    attributes: function(){ return $scope.attributes; },
                    availableScenes: function(){ return $scope.availableScenes; },
                    availableItems: function(){ return $scope.availableItems.slice(); }
                },
                link: function($scope, originalEvent){
                    $scope.originalEvent = originalEvent;
                },
                size: 'sm'
            });

            modal.result.then(function(e){ 
                debugger;
                //substituir evento / encontrar forma de distinguir novo de edit
                var old = findEvent(e.event_id);
                var index = $scope.events.indexOf(old);

                $scope.events[index] = e;
                

                $scope.eventList = $scope.convertToEventList($scope.events);
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
            debugger;
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

        debugger;
        $scope.tempEvent = copy($scope.$resolve.originalEvent);
        refresh();

        $scope.refresh = refresh;
        $scope.confirm = confirm;
        $scope.cancel = cancel;
        $scope.createEvent = createEvent;
        $scope.updateEvent = updateEvent;
        $scope.changeItem = changeItem;
        $scope.changeScene = changeScene;



        console.log($scope.availableItems);

        function refresh(){ 
            $scope.isChangeAttribute = $scope.tempEvent.type == EventType.CHANGE_ATTRIBUTE;
            $scope.isGoToScene = $scope.tempEvent.type == EventType.GO_TO_SCENE;
            $scope.isAddItem = $scope.tempEvent.type == EventType.ADD_ITEM;
            $scope.isGameOver = $scope.tempEvent.type == EventType.GAME_OVER;
        };

        function createEvent(){
            var event = {};

            switch($scope.tempEvent.type){
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

        function updateEvent(){
            debugger;
            var event = {};

            switch($scope.tempEvent.type){
                case EventType.CHANGE_ATTRIBUTE: event = updateChangeAttributeEvent();
                break;

                case EventType.GO_TO_SCENE: event = updateGoToSceneEvent();
                break;

                case EventType.ADD_ITEM: event = updateAddItemEvent();
                break;

                case EventType.GAME_OVER: event = updateGameOverEvent();
                break;
            };

            $uibModalInstance.close(event);
        };

        function confirm(){
            if(!!$scope.tempEvent.event_id){
                debugger;
                updateEvent();
            }else{
                createEvent();
            };
        };

        function cancel(){
            $uibModalInstance.close();
        };

        function createChangeAttributeEvent(){
            var event = {};

            event.type = $scope.tempEvent.type;
            event.attribute = $scope.tempEvent.attribute;
            event.value = $scope.tempEvent.value;
            event.text = $scope.tempEvent.text;;

            return event;
        };

        function createGameOverEvent(){
            return { 
                type: $scope.tempEvent.type, 
                text: $scope.tempEvent.text 
            };
        };

        function createGoToSceneEvent(){
            return { 
                type: $scope.tempEvent.type, 
                scene_id: $scope.selectedScene.scene_id 
            };
        };

        function createAddItemEvent(){
            debugger;
            return { 
                type: $scope.tempEvent.type, 
                item_id: $scope.selectedItem.item_id, 
                quantity: $scope.tempEvent.quantity 
            };
        };

        function changeItem(selectedItem){
            $scope.selectedItem = selectedItem;
        };

        function changeScene(selectedScene){
            $scope.selectedScene = selectedScene;
        };

        function copy(originalEvent){
            debugger;
            var tmp = {};

            if(!!originalEvent){
                tmp.event_id = originalEvent.event_id;
                tmp.type = originalEvent.type;
                tmp.attribute = originalEvent.attribute;
                tmp.value = originalEvent.value;
                tmp.quantity = originalEvent.quantity;
                tmp.text = originalEvent.text;

                debugger;
                $scope.selectedItem = findItem(originalEvent.item_id);
                $scope.selectedScene.scene_id = findScene(originalEvent.scene_id);
            }else{
                tmp.type = '';
                tmp.attribute = '';
                tmp.value = null;
                tmp.quantity = null;
                tmp.text = { pt_br: '' };
            };

            return tmp;
        };

        function updateChangeAttributeEvent(){
            var tempEvent = $scope.tempEvent;
            
            return {
                event_id: tempEvent.event_id,
                type: tempEvent.type,
                attribute: tempEvent.attribute,
                value: tempEvent.value,
                text: tempEvent.text
            };
        };

        function updateGameOverEvent(){
            var tempEvent = $scope.tempEvent;

            return {
                event_id: tempEvent.event_id,
                type: tempEvent.type,
                text: tempEvent.text
            };
        };

        function updateGoToSceneEvent(){
            var tempEvent = $scope.tempEvent;

            return{
                event_id: tempEvent.event_id,
                type: tempEvent.type,
                scene_id: tempEvent.scene_id
            };
        };

        function updateAddItemEvent(){
            var tempEvent = $scope.tempEvent;

            return{
                event_id: tempEvent.event_id,
                type: tempEvent.type,
                item_id: $scope.selectedItem.item_id,
                quantity: tempEvent.quantity
            };
        };

        function findItem(item_id){
            var item = $scope.availableItems.find(function(elem){
                return elem.item_id = item_id;
            });

            var index = $scope.availableItems.indexOf(item);

            return $scope.availableItems[index];
        };

        function findScene(scene_id){
            return $scope.availableScenes.find(function(elem){
                return elem.scene_id = scene_id;
            });
        };
    }]);