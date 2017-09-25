'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ContactCtrl', ['$scope' ,'$state','ContactService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,'$window' ,function ($scope ,$state,ContactService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder , $window) {




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


    $scope.modifyContact = function(contact,index) {
        $state.go('dashboard.addContact', {contact : contact});
    }



    $scope.removeContact = function(contact,index) {

        var deleteContact = $window.confirm('Are you sure you want to delete ' +  contact.name + '?');
        if(deleteContact){
       
            ContactService.delete(contact._id).then(function successCallback(response) {
                    
                    $scope.contacts.splice(index, 1);
        
            }, function errorCallback(response) {

            })
        }
    }

}]);

myApp.controller('AddContactCtrl', ['$scope' ,'$state','ContactService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','ProductService' ,function ($scope ,$state,ContactService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,ProductService) {

 init();



 $scope.addContact = function(contact){
    if(!contact.isEdit){
     ContactService.create(contact)
     .then(function successCallback(response) {
        console.log(response);
        $state.go('dashboard.show_contact',{contactId : response.data._id })

    }, function errorCallback(response) {
    })
 }else{
    ContactService.edit(contact).then(function successCallback(response) {

        $state.go('dashboard.contact')

    }, function errorCallback(response) {

    })
}
}


function init(){
    if($stateParams && $stateParams.contact){
     $scope.contact = $stateParams.contact;
     $scope.contact.isEdit = true;            
 }
}


}]);

