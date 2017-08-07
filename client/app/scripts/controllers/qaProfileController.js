'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('QaProfileCtrl', ['$scope' ,'$state','QaProfileService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,QaProfileService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    QaProfileService.get()
    .then(function successCallback(response) {
        $scope.qaProfiles = response.data;

        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
        ];

    }, function errorCallback(response) {

    })



    $scope.modifyQaProfile = function(qaProfile,index) {
        $state.go('dashboard.addQaProfile', {qaProfile : qaProfile});
    }


    $scope.removeQaProfile = function(qaProfile,index) {
       
        QaProfileService.delete(qaProfile._id).then(function successCallback(response) {
                
                $scope.qaProfiles.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

myApp.controller('AddQaProfileCtrl', ['$scope' ,'$state','QaProfileService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','GradeService' ,function ($scope ,$state,QaProfileService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,GradeService) {

 init();

 var vm = this;

    GradeService.get()
    .then(function successCallback(response) {
        $scope.grades = response.data;

        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2)
        ];

    }, function errorCallback(response) {

    })



   
    $scope.addQaProfile = function(qaProfile){
        if(!qaProfile.isEdit){
            QaProfileService.create(qaProfile)
                .then(function successCallback(response) {
                    $state.go('dashboard.qaProfile')

            }, function errorCallback(response) {
            })
        }else{
            QaProfileService.edit(qaProfile).then(function successCallback(response) {

                $state.go('dashboard.qaProfile')
            
            }, function errorCallback(response) {

            })
        }
    }


   function init(){
        if($stateParams && $stateParams.qaProfile){
             $scope.qaProfile = $stateParams.qaProfile;
             $scope.qaProfile.isEdit = true;            
        }
    }


}]);

