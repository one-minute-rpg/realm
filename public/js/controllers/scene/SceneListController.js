angular.module('realm')
    .controller('SceneListController', SceneListController);

SceneListController.$inject = ['$scope', '$state', '$uibModal'];

function SceneListController($scope, $state, $uibModal) {

    $scope.currentPage = 1;
    $scope.scenesPerPage = 5;
    $scope.totalScenes = !!$scope.scenes ? $scope.scenes.length : 1;

    $scope.setPage = setPage;
    $scope.edit = edit;
    $scope.remove = remove;

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

    function remove(scene){
        var modal = $uibModal.open({
                        templateUrl: 'js/directives/components/modal/modal-confirmacao.template.html',
                        controller: ['$scope', '$uibModalInstance', 'scene', function($scope, $uibModalInstance, scene){
                            $scope.obj = scene;
                            $scope.text = scene.title;
                            $scope.confirm = function(scene){
                                $uibModalInstance.close(scene);
                            };

                            $scope.cancel = function(){
                                $uibModalInstance.close();
                            };
                        }],
                        resolve: {
                            scene: function(){
                                return scene;
                            }
                        }
                    });

        modal.result.then(function(scene){
            if(!!scene){
                removeSceneFromStory(scene);
            };
        });
    };

    function removeSceneFromStory(scene){
        var index = $scope.scenes.indexOf(scene);

        $scope.scenes.splice(index, 1);

        refreshList();
    };

    refreshList();
};