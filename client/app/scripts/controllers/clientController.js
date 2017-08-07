'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ClientCtrl', ['$scope' ,'$state','ClientService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,ClientService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    ClientService.get()
    .then(function successCallback(response) {
        $scope.clients = response.data;

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



    $scope.modifyClient = function(client,index) {
        $state.go('dashboard.addClient', {client : client});
    }


    $scope.removeClient = function(client,index) {
       
        ClientService.delete(client._id).then(function successCallback(response) {
                
                $scope.clients.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

myApp.controller('AddClientCtrl', ['$scope' ,'$state','ClientService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','ProductService' ,function ($scope ,$state,ClientService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,ProductService) {

 init();


     ProductService.get()
    .then(function successCallback(response) {
        $scope.products = response.data;

    }, function errorCallback(response) {

    })

   
    $scope.addClient = function(client){
        if(!client.isEdit){
            ClientService.create(client)
                .then(function successCallback(response) {
                    $state.go('dashboard.client')

            }, function errorCallback(response) {
            })
        }else{
            ClientService.edit(client).then(function successCallback(response) {

                $state.go('dashboard.client')
            
            }, function errorCallback(response) {

            })
        }
    }


   function init(){
        if($stateParams && $stateParams.client){
             $scope.client = $stateParams.client;
             $scope.client.isEdit = true;            
        }
    }


}]);

