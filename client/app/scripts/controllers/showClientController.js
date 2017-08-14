'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ShowClientCtrl', ['$scope' ,'$state','ClientService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,ClientService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {

    console.log($stateParams.clientId);

    ClientService.getOne($stateParams.clientId)
    .then(function successCallback(response) {
        
        $scope.client = response.data;
        console.log($scope.client);



    }, function errorCallback(response) {

    });






}]);



