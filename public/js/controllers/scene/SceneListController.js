angular.module('realm')
    .controller('SceneListController', SceneListController);

SceneListController.$inject = ['$scope', '$state'];

function SceneListController($scope, $state) {

    $scope.currentPage = 1;
    $scope.scenesPerPage = 5;
    $scope.totalScenes = !!$scope.scenes ? $scope.scenes.length : 1;

    $scope.setPage = setPage;
    $scope.edit = edit;

    function setPage(pageNo){
        $scope.currentPage = pageNo;
        refreshList();
    };

    function filterScenesForList(){
        var startIndex = (($scope.currentPage - 1) * $scope.scenesPerPage);
        var endIndex = ($scope.scenesPerPage * $scope.currentPage);

        return $scope.scenes.slice(startIndex, endIndex);
    };

    function edit(scene_id){
        $state.go('editScene', { 
            scene_id: scene_id,
            story_id: $state.params.story_id
        });
    };

    function refreshList(){
        $scope.scenesForList = filterScenesForList();
    };

    refreshList();
};