
angular.module('realm')
    .factory('Story', function($resource){
        return $resource('/stories');
    });