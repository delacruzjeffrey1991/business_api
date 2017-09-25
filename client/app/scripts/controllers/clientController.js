'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ClientCtrl', ['$scope' ,'$state','ClientService' ,'RelationshipService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' , '$window', function ($scope ,$state,ClientService,RelationshipService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,$window) {




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

        var deleteUser = $window.confirm('Are you sure you want to delete ' +  client.name + '?');
        if(deleteUser){

        RelationshipService.get()
        .then(function successCallback(response) {


            $scope.relationships = [];
            console.log($scope.relationships);
            console.log(response.data);

            for(var i=0; i<response.data.length; i++){
                var curRel = response.data[i];
                console.log(curRel);
                console.log(curRel.client._id);
                console.log(curRel.relatedClient._id);
                console.log(client._id);
                if(curRel.client && curRel.client._id == client._id  ){
                    console.log(curRel);
                    RelationshipService.delete(curRel._id).then(function successCallback(response) {
                        console.log('yes');
                        console.log(response.data);

                    }, function errorCallback(response) {

                    })
                }

                if(curRel.relatedClient && curRel.relatedClient._id == client._id ){
                    RelationshipService.delete(curRel._id).then(function successCallback(response) {

                        console.log('yes');
                        console.log(response.data);

                    }, function errorCallback(response) {

                    })

                }
            }

            ClientService.delete(client._id).then(function successCallback(response) {

                $scope.clients.splice(index, 1);

            }, function errorCallback(response) {

            })


        }, function errorCallback(response) {

        });
      }  


    }

}]);

myApp.controller('AddClientCtrl', ['$scope' ,'$state','ClientService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','ProductService' ,function ($scope ,$state,ClientService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,ProductService) {

 init();



 $scope.addClient = function(client){
    if(!client.isEdit){

        if(!client.lastName){
            console.log('here');

            client.client_code = client.name + Math.floor((Math.random() * 1000) + 1);
        }else{
         client.title = client.title? client.title : '';   
         client.name = client.title + ' ' + client.firstName + ' ' + client.lastName;
         client.client_code = client.lastName + Math.floor((Math.random() * 1000) + 1);
     }
     console.log(client.client_code)
     client.client_code = client.client_code.trim();
     ClientService.create(client)
     .then(function successCallback(response) {
        console.log(response);
        $state.go('dashboard.show_client',{clientId : response.data._id })

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

