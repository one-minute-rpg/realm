angular.module('realm')
    .controller('ItemListController', ItemListController);

ItemListController.$inject = ['$scope', '$state'];

function ItemListController($scope, $state) {
    
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.totalItems = !!$scope.items ? $scope.items.length : 1;
    
    $scope.edit = edit;
    $scope.setPage = setPage;

    function edit(item_id){
        $state.go('editQuestItem', { 
            item_id: item_id,
            story_id: $state.params.story_id
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

    refreshList();
};