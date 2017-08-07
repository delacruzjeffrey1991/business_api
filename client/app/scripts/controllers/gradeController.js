'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('GradeCtrl', ['$scope' ,'$state','GradeService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,GradeService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    GradeService.get()
    .then(function successCallback(response) {
        $scope.grades = response.data;

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



    $scope.modifyGrade = function(grade,index) {
        $state.go('dashboard.addGrade', {grade : grade});
    }


    $scope.removeGrade = function(grade,index) {
       
        GradeService.delete(grade._id).then(function successCallback(response) {
                
                $scope.grades.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

myApp.controller('AddGradeCtrl', ['$scope' ,'$state','GradeService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,GradeService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {

 init();

   
    $scope.addGrade = function(grade){
        if(!grade.isEdit){
            GradeService.create(grade)
                .then(function successCallback(response) {
                    $state.go('dashboard.grade')

            }, function errorCallback(response) {
            })
        }else{
            GradeService.edit(grade).then(function successCallback(response) {

                $state.go('dashboard.grade')
            
            }, function errorCallback(response) {

            })
        }
    }


   function init(){
        if($stateParams && $stateParams.grade){
             $scope.grade = $stateParams.grade;
             $scope.grade.isEdit = true;            
        }
    }


}]);

