angular.module('realm')
    .controller('ItemListController', ItemListController);

ItemListController.$inject = ['$scope', '$state', '$uibModal'];

function ItemListController($scope, $state, $uibModal) {
    
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.totalItems = !!$scope.items ? $scope.items.length : 1;
    
    $scope.edit = edit;
    $scope.remove = remove;
    $scope.setPage = setPage;

    function edit(item_id){
        $state.go('editQuestItem', { 
            item_id: item_id,
            story_id: $state.params.story_id
        });
    };

    function remove(item){
        var modal = $uibModal.open({
                        templateUrl: 'js/directives/components/modal/modal-confirmacao.template.html',
                        controller: ['$scope', '$uibModalInstance', 'item', function($scope, $uibModalInstance, item){
                            $scope.obj = item;
                            $scope.text = item.name.pt_br;
                            $scope.confirm = function(item){
                                $uibModalInstance.close(item);
                            };

                            $scope.cancel = function(){
                                $uibModalInstance.close();
                            };
                        }],
                        resolve: {
                            item: function(){
                                return item;
                            }
                        }
                    });

        modal.result.then(function(item){
            if(!!item){
                removeItemFromStory(item);
            };
        });
    };

    function setPage(pageNo){
        $scope.currentPage = pageNo;
        refreshList();
    };

    function filterItemsForList(){
        var startIndex = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var endIndex = ($scope.itemsPerPage * $scope.currentPage);

        return $scope.items.slice(startIndex, endIndex);
    };

    function refreshList(){
        $scope.itemsForList = filterItemsForList();
    };

    function removeItemFromStory(item){
        var index = $scope.items.indexOf(item);

        $scope.items.splice(index, 1);

        refreshList();
    };

    refreshList();
};