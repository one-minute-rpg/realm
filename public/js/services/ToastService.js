angular.module('realm')
    .factory('ToastService', ToastService);

ToastService.$inject = ['$rootScope', 'ToastMessageType'];

function ToastService($rootScope, ToastMessageType){
    var service = {};

    service.success = success;
    service.error = error;

    function success(message){
        $rootScope.$broadcast(ToastMessageType.SUCCESS, message);
    }

    function error(message){
        $rootScope.$broadcast(ToastMessageType.ERROR, message);
    }

    return service;
};