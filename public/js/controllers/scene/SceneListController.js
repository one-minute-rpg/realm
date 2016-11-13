angular.module('realm')
    .controller('SceneListController', SceneListController);

SceneListController.$inject = ['$scope'];

function SceneListController($scope) {

    $scope.currentPage = 1;
    $scope.scenesPerPage = 5;
    $scope.totalScenes = !!$scope.scenes ? $scope.scenes.length : 1;

    $scope.setPage = setPage;

    function setPage(pageNo){
        $scope.currentPage = pageNo;
        refreshList();
    };

    function filterScenesForList(){
        var startIndex = (($scope.currentPage - 1) * $scope.scenesPerPage);
        var endIndex = ($scope.scenesPerPage * $scope.currentPage);

        return $scope.scenes.slice(startIndex, endIndex);
    };

    function refreshList(){
        $scope.scenesForList = filterScenesForList();
    };
};