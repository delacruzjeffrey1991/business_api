'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('InteractionsCtrl', ['$scope' ,'$state','InteractionsService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,InteractionsService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    InteractionsService.get()
    .then(function successCallback(response) {
        $scope.interactionss = response.data;
        console.log($scope.interactionss)
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



    $scope.modifyInteractions = function(interactions,index) {
        $state.go('dashboard.addInteractions', {interactions : interactions});
    }


    $scope.removeInteractions = function(interactions,index) {
       
        InteractionsService.delete(interactions._id).then(function successCallback(response) {
                
                $scope.interactionss.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

myApp.controller('AddInteractionsCtrl', ['$scope' ,'$state','InteractionsService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','ProductService' ,function ($scope ,$state,InteractionsService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,ProductService) {

 init();


     ProductService.get()
    .then(function successCallback(response) {
        $scope.products = response.data;

    }, function errorCallback(response) {

    })

   
    $scope.addInteractions = function(interactions){
        if(!interactions.isEdit){
            InteractionsService.create(interactions)
                .then(function successCallback(response) {
                    $state.go('dashboard.interactions')

            }, function errorCallback(response) {
            })
        }else{
            InteractionsService.edit(interactions).then(function successCallback(response) {

                $state.go('dashboard.interactions')
            
            }, function errorCallback(response) {

            })
        }
    }


   function init(){
        if($stateParams && $stateParams.interactions){
             $scope.interactions = $stateParams.interactions;
             $scope.interactions.isEdit = true;            
        }
    }


}]);

