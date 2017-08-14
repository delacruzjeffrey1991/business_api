'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('GroupsCtrl', ['$scope' ,'$state','GroupsService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,GroupsService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    GroupsService.get()
    .then(function successCallback(response) {
        $scope.groupss = response.data;
        console.log($scope.groupss)

        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
        ];

    }, function errorCallback(response) {

    })



    $scope.modifyGroups = function(groups,index) {
        $state.go('dashboard.addGroups', {groups : groups});
    }


    $scope.removeGroups = function(groups,index) {
       
        GroupsService.delete(groups._id).then(function successCallback(response) {
                
                $scope.groups.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

myApp.controller('AddGroupsCtrl', ['$scope' ,'$state','QaProfileService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','GroupsService' ,function ($scope ,$state,QaProfileService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,GroupsService) {

 init();

 var vm = this;

    GroupsService.get()
    .then(function successCallback(response) {
        $scope.groupss = response.data;

        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
        ];

    }, function errorCallback(response) {

    })



   
    $scope.addGroups = function(groups){
        if(!groups.isEdit){
            GroupsService.create(groups)
                .then(function successCallback(response) {
                    $state.go('dashboard.groups')

            }, function errorCallback(response) {
            })
        }else{
            GroupsService.edit(groups).then(function successCallback(response) {

                $state.go('dashboard.groups')
            
            }, function errorCallback(response) {

            })
        }
    }


   function init(){
        if($stateParams && $stateParams.groups){
             $scope.groups = $stateParams.groups;
             $scope.groups.isEdit = true;            
        }
    }


}]);

