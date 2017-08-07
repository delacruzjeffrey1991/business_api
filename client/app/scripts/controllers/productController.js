'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ProductCtrl', ['$scope' ,'$state','ProductService','$stateParams',function ($scope ,$state,ProductService,$stateParams) {

    // //for edit
    // var checker = isProductEdit();


    $scope.addProduct = function(product){
            ProductService.create(product)
                .then(function successCallback(response) {
                    $state.go('dashboard.addClient')

            }, function errorCallback(response) {

            })
    }


    // function isProductEdit(){
    //     console.log($stateParams)
    //     if($stateParams && $stateParams.product){
    //         console.log('here')
    //          $scope.product = $stateParams.product;
    //          return true;
    //     }

    //     return false;
    // }

}]);

myApp.controller('ProductTableCtrl', ['$scope' ,'ProductService', 'DTOptionsBuilder', 'DTColumnDefBuilder','$state' ,function ($scope ,ProductService,DTOptionsBuilder, DTColumnDefBuilder, $state) {
    var vm = this;


    ProductService.get()
    .then(function successCallback(response) {
        vm.products = response.data;
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



    vm.modifyProduct = function(product,index) {
        $state.go('dashboard.addProduct', {product : product});
    }


    vm.removeProduct = function(product,index) {
        ProductService.delete(product._id).then(function successCallback(response) {
            vm.products.splice(index, 1);

        }, function errorCallback(response) {

        })
    }    

}]);

