'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('CampaignCtrl', ['$scope' ,'$state','CampaignService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,CampaignService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {




    var vm = this;

    CampaignService.get()
    .then(function successCallback(response) {
        $scope.campaigns = response.data;

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



    $scope.modifyCampaign = function(campaign,index) {
        $state.go('dashboard.addCampaign', {campaign : campaign});
    }


    $scope.removeCampaign = function(campaign,index) {
       
        CampaignService.delete(campaign._id).then(function successCallback(response) {
                
                $scope.campaigns.splice(index, 1);
    
        }, function errorCallback(response) {

        })
    }

}]);

myApp.controller('AddCampaignCtrl', ['$scope' ,'$state','CampaignService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder','QaProfileService','InteractionsService' ,function ($scope ,$state,CampaignService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder,QaProfileService,InteractionsService) {

 init();


     QaProfileService.get()
    .then(function successCallback(response) {
        $scope.qaProfile = response.data;

    }, function errorCallback(response) {

    })

    InteractionsService.get()
    .then(function successCallback(response) {
        $scope.interactionss = response.data;

    }, function errorCallback(response) {

    })

   
    $scope.addCampaign = function(campaign){
        if(!campaign.isEdit){
            console.log(campaign)
            CampaignService.create(campaign)
                .then(function successCallback(response) {
                    $state.go('dashboard.campaign')

            }, function errorCallback(response) {
            })
        }else{
            CampaignService.edit(campaign).then(function successCallback(response) {

                $state.go('dashboard.campaign')
            
            }, function errorCallback(response) {

            })
        }
    }


   function init(){
        if($stateParams && $stateParams.campaign){
             $scope.campaign = $stateParams.campaign;
             $scope.campaign.isEdit = true;            
        }
    }


}]);

