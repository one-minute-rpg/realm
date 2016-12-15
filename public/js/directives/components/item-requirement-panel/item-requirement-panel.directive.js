angular.module('realm')
    .directive('itemRequirementPanel', [function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/item-requirement-panel/item-requirement-panel.template.html',
            scope: {
                reqItems: '=',
                availableItems: '='
            },
            controller: 'ItemRequirementPanelController'
        };


    }])
    .controller('ItemRequirementPanelController', ['$scope', '$state', '$stateParams', '$uibModal', function($scope, $state, $stateParams, $uibModal){

        $scope.init = init;
        $scope.convertToItemRequirementList = convertToItemRequirementList;

        $scope.add = add;
        $scope.edit = edit;
        $scope.remove = remove;

        function convertToItemRequirementList(reqItems){
            return reqItems.map(function(req){
                return {
                    requirement_id: req.requirement_id,
                    text: 'Requer ' + req.quantity + ' ' + getItemName(req.item_id)
                };
            });
        };

        function getItemName(item_id){
            var item = $scope.availableItems.find(function(item){
                return item.item_id == item_id ? item : '';
            });

            return item.name;
        };

        function add(){
            var modal = $uibModal.open({
                templateUrl: 'js/directives/components/item-requirement-panel/item-requirement-modal.template.html',
                controller: 'ItemRequirementModalController',
                resolve:{
                    availableItems: function(){ return $scope.availableItems; },
                    reqItem: function(){ return null; }
                },
                size: 'sm'
            });

            modal.result.then(function(requirement){
                $scope.reqItems.push(requirement);
                init();
            });
        };

        function findRequirement(req){
            return $scope.reqItems.find(function(r){
                 
                return r.requirement_id == req.requirement_id;
            });
        };

        function edit(pReq){
            var req = findRequirement(pReq);

            var modal = $uibModal.open({
                templateUrl: 'js/directives/components/item-requirement-panel/item-requirement-modal.template.html',
                controller: 'ItemRequirementModalController',
                resolve:{
                    availableItems: function(){ return $scope.availableItems; },
                    reqItem: function(){ return req; }
                },
                size: 'sm'
            });

            modal.result.then(function(requirement){
                 
                var oldReq = $scope.reqItems.find(function(ri){
                    return ri.requirement_id == requirement.requirement_id;
                });

                var index = $scope.reqItems.indexOf(oldReq);

                $scope.reqItems[index] = requirement;

                init();
            });
        };

        function remove(requirement){
            var modal = $uibModal.open({
                            templateUrl: 'js/directives/components/modal/modal-confirmacao.template.html',
                            controller: ['$scope', '$uibModalInstance', 'requirement', function($scope, $uibModalInstance, requirement){
                                $scope.obj = requirement;
                                $scope.text = 'o requisito de item';
                                $scope.confirm = function(req_id){
                                    $uibModalInstance.close(req_id);
                                };

                                $scope.cancel = function(){
                                    $uibModalInstance.close();
                                };
                            }],
                            resolve: {
                                requirement: function(){
                                    return requirement;
                                }
                            }
                        });

            modal.result.then(function(req_id){
                removeRequirement(req_id);
            });
        };

        function removeRequirement(requirement_id){
             
            var req = $scope.reqItems.find(function(r){
                return r.requirement_id == requirement_id;
            });

            var index = $scope.reqItems.indexOf(req);

            if(index > -1)
                $scope.reqItems.splice(index, 1);

            init();
        };

        function init(){
            $scope.requirementList = $scope.convertToItemRequirementList($scope.reqItems);
        };

        init();
    }])
    .controller('ItemRequirementModalController', ['$scope', '$uibModalInstance', 'availableItems', 'Attributes', 'reqItem', function($scope, $uibModalInstance, availableItems, Attributes, reqItem){

         
        $scope.tempReq = !!reqItem ? reqItem : {};
        $scope.quantity = $scope.tempReq.quantity;

        $scope.availableItems = angular.copy(availableItems);
        $scope.selectedItem = (!!reqItem && !!reqItem.item_id) ? findItem(reqItem.item_id) : {};

        $scope.confirm = confirm;
        $scope.cancel = cancel;
        $scope.changeItem = changeItem;

        function confirm(){
             
            if(!!$scope.tempReq.requirement_id){
                updateRequirement();
            }else{
                createRequirement();
            };
        };

        function cancel(){
            $scope.quantity = $scope.tempReq.quantity;
            $uibModalInstance.close();
        };

        function changeItem(item){
            $scope.selectedItem = item;
        };

        function findItem(item_id){
            return $scope.availableItems.find(function(item){
                return item.item_id == item_id;
            });
        };

        function createRequirement(){
            var req = {};

            req.requirement_id = chance.guid();
            req.item_id = $scope.selectedItem.item_id;
            req.quantity = $scope.quantity;

            $uibModalInstance.close(req);          
        };

        function updateRequirement(){

            var newReq = {};
            
            newReq.requirement_id = $scope.tempReq.requirement_id;
            newReq.item_id = $scope.selectedItem.item_id;
            newReq.quantity = $scope.quantity;

            $uibModalInstance.close(newReq);
        };
    }]);
        