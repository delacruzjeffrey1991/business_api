'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('uploadCallCtrl', ['$scope' ,'$state','UploadCallService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','ProductService' ,function ($scope ,$state,UploadCallService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,ProductService) {

   
    $scope.uploadCall = function(call){
            UploadCallService.create(call)
                .then(function successCallback(response) {

            }, function errorCallback(response) {
            })
    }

}]);

