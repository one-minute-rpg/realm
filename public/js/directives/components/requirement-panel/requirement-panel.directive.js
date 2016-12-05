angular.module('realm')
    .directive('requirementPanel', [function() {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/components/requirement-panel/requirement-panel.template.html',
            scope: {
                reqAttributes: '=',
                reqItems: '=',
                availableItems: '='
            },
            controller: 'RequirementPanelController'
        };


    }])
    .controller('RequirementPanelController', ['$scope', '$state', '$stateParams', '$uibModal', function($scope, $state, $stateParams, $uibModal){

        $scope.init = init;
        $scope.convertToRequirementList = convertToRequirementList;

        function convertToRequirementList(reqAttributes, reqItems){
            
            var list = [];

            list = list.concat(convertAttributeRequirements(reqAttributes));

            list = list.concat(convertItemRequirements(reqItems));

            return list;
        };

        function convertItemRequirements(reqItems){
            return reqItems.map(function(req){
                return {
                    _id: req._id,
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

        function convertAttributeRequirements(reqAttributes){
            var reqAttrs = [];

            for(propertie in reqAttributes){
                if(!!reqAttributes[propertie]){
                    var attr = {};

                    attr.id = propertie;
                    attr.text = 'Requer ' + reqAttributes[propertie] + ' de ' + translateAttr(propertie);
                    
                    reqAttrs.push(attr);
                };
            };

            return reqAttrs;
        };

        function translateAttr(attr){
            var result = '';
            switch(attr){
                case 'health': result = 'Vida';
                break;

                case 'strength': result = 'Força';
                break;

                case 'agility': result = 'Agilidade';
                break;

                case 'intelligence': result = 'Inteligência';
                break;

                default: result = null;
                break;
            };

            return result;
        };

        function init(){
            $scope.requirementList = $scope.convertToRequirementList($scope.reqAttributes, $scope.reqItems);
            debugger;
        };

        init();
    }]);