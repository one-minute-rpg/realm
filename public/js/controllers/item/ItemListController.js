angular.module('realm')
    .controller('ItemListController', ItemListController);

ItemListController.$inject = ['$scope'];

function ItemListController($scope) {
    
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.totalItems = !!$scope.items ? $scope.items.length : 1;
    

    $scope.setPage = setPage;

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