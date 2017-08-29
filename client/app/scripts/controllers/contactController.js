'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ContactCtrl', ['$scope' ,'$state','ContactService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,ContactService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    ContactService.get()
    .then(function successCallback(response) {
        $scope.contacts = response.data;

        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];

    }, function errorCallback(response) {

    })






    $scope.removeContact = function(contact,index) {
       
        ContactService.delete(contact._id).then(function successCallback(response) {
                
                $scope.contacts.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

