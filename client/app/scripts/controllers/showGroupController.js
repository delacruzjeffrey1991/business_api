'use strict';

var myApp  = angular.module('sbAdminApp')
myApp.controller('ShowGroupCtrl', ['$scope' ,'$state','GroupsService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,GroupsService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {

	console.log($stateParams.groupId);
	var vm = this;

	GroupsService.getOne($stateParams.groupId)
	.then(function successCallback(response) {

		$scope.group = response.data;
        //$scope.clients = response.data.client_list;
        
        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];



    }, function errorCallback(response) {

    });






}]);

myApp.controller('addMemberCtrl', ['$scope' ,'$state','GroupsService','ClientService','$stateParams' , 'DTOptionsBuilder', 'DTColumnDefBuilder' ,function ($scope ,$state,GroupsService,ClientService,$stateParams, DTOptionsBuilder, DTColumnDefBuilder) {
	//$scope.group = $stateParams.groupId;

	$scope.addMember = function(selectedClients,group) {
		group.client_list.push.apply(group.client_list,selectedClients);

		GroupsService.edit(group).then(function successCallback(response) {
			$state.go('dashboard.show_group', {groupId : group._id});        
		}, function errorCallback(response) {

		})
	}

	GroupsService.getOne($stateParams.groupId)
	.then(function successCallback(response) {

		$scope.group = response.data;
		

		ClientService.get()
		.then(function successCallback(response) {
			var myArray = response.data;
			
			var toRemove = $scope.group.client_list;

			for( var i=myArray.length - 1; i>=0; i--){
				for( var j=0; j<toRemove.length; j++){
					if(myArray[i] && (myArray[i].name === toRemove[j].name)){
						myArray.splice(i, 1);
					}
				}
			}
			$scope.availableClients = myArray;

		}, function errorCallback(response) {

		})


	}, function errorCallback(response) {

	});






}]);




